import React, { useState, useEffect, useRef } from 'react';
import {
  Settings, Target, Camera, Loader2, Upload, Shuffle, Check, Save, Mail, Lock, LogOut,
} from 'lucide-react';
import {
  UserProfile, stripServerOwnedFields, avatarOptions, AVATAR_STYLES, DEFAULT_AVATAR_STYLE,
} from '../profiles';
import { updateProfileFields, sendResetEmail } from '../auth';
import { isFirebaseConfigured, getStorageInstance, getAuthInstance } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getTheme, setTheme, Theme } from '../lib/theme';

interface SettingsTabProps {
  currentUser: UserProfile | null;
  currentUserRef: { current: UserProfile | null };
  setCurrentUser: (profile: UserProfile) => void;
  readTranslateEnabled: boolean;
  setReadTranslateEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  audioSpeed: '0.8' | '1.0';
  setAudioSpeed: React.Dispatch<React.SetStateAction<'0.8' | '1.0'>>;
  streak: number;
  logoutUser: () => void;
}

// Special view Module: Settings (Тохиргоо) view panel
export function SettingsTab({
  currentUser,
  currentUserRef,
  setCurrentUser,
  readTranslateEnabled,
  setReadTranslateEnabled,
  audioSpeed,
  setAudioSpeed,
  streak,
  logoutUser,
}: SettingsTabProps) {
  // --- Profile editor -----------------------------------------------------
  // A local draft holds in-progress edits so background progress saves (study
  // time) can keep updating `currentUser` without clobbering what the learner
  // is typing. Seeded once from the signed-in profile; reset on sign-out.
  type ProfileDraft = { name: string; avatar: string; targetLevel: string; dailyGoalMinutes: number; learningGoal: string };
  const [profileDraft, setProfileDraft] = useState<ProfileDraft | null>(null);
  const profileDraftKeyRef = useRef<string | null>(null);
  const [avatarPage, setAvatarPage] = useState(0);
  const [avatarStyle, setAvatarStyle] = useState<string>(DEFAULT_AVATAR_STYLE);
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileSaved, setProfileSaved] = useState(false);
  const [profileSaveError, setProfileSaveError] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [theme, setThemeState] = useState<Theme>(getTheme);

  // Seed the draft when the signed-in *identity* changes (login / account
  // switch / logout) — keyed by email, NOT on every currentUser update, so a
  // background study-time save can't reset what the learner is typing.
  useEffect(() => {
    if (!currentUser) { setProfileDraft(null); profileDraftKeyRef.current = null; return; }
    if (profileDraftKeyRef.current !== currentUser.email) {
      profileDraftKeyRef.current = currentUser.email;
      setProfileDraft({
        name: currentUser.name,
        avatar: currentUser.avatar,
        targetLevel: currentUser.targetLevel,
        dailyGoalMinutes: currentUser.dailyGoalMinutes ?? 15,
        learningGoal: currentUser.learningGoal ?? '',
      });
    }
  }, [currentUser]);

  const saveProfileEdits = async () => {
    if (!currentUser || !profileDraft) return;
    const name = profileDraft.name.trim().slice(0, 30);
    if (!name) return;
    setProfileSaving(true);
    setProfileSaved(false);
    setProfileSaveError(false);
    const learningGoal = profileDraft.learningGoal.trim().slice(0, 280);
    // Keep `role` consistent with the goal (mirrors createCustomProfile).
    const goalClean = learningGoal.toLowerCase();
    const role = goalClean.includes('сургууль') ? 'Оюутан' : goalClean.includes('ажил') ? 'Мэргэжилтэн' : 'Суралцагч';
    // Spread from the ref so a background study-time save that landed since
    // this render isn't clobbered (the Firestore write below only patches the
    // edited fields anyway).
    const base = currentUserRef.current ?? currentUser;
    const next = stripServerOwnedFields({
      ...base,
      name,
      avatar: profileDraft.avatar,
      targetLevel: profileDraft.targetLevel,
      dailyGoalMinutes: profileDraft.dailyGoalMinutes,
      learningGoal,
      role,
    });
    currentUserRef.current = next;
    setCurrentUser(next);
    try {
      await updateProfileFields({
        name,
        avatar: profileDraft.avatar,
        targetLevel: profileDraft.targetLevel,
        dailyGoalMinutes: profileDraft.dailyGoalMinutes,
        learningGoal,
        role,
      });
      setProfileSaved(true);
      setTimeout(() => setProfileSaved(false), 2500);
    } catch (err) {
      console.warn('Could not save profile edits:', err);
      setProfileSaveError(true);
      setTimeout(() => setProfileSaveError(false), 4000);
    } finally {
      setProfileSaving(false);
    }
  };

  const handleResetPassword = async () => {
    if (!currentUser?.email) return;
    try {
      await sendResetEmail(currentUser.email);
      setResetSent(true);
      setTimeout(() => setResetSent(false), 4000);
    } catch (err) {
      console.warn('Password reset email failed:', err);
    }
  };

  // Upload a custom profile picture to Firebase Storage and point the draft
  // avatar at its public download URL. Owner-only path; images ≤5MB.
  const avatarFileInputRef = useRef<HTMLInputElement | null>(null);
  const [avatarUploading, setAvatarUploading] = useState(false);
  const [avatarError, setAvatarError] = useState<string | null>(null);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = ''; // let the user re-pick the same file later
    if (!file) return;
    // Raster only — exclude SVG (stored on a public-read bucket, an SVG could
    // carry script and become a stored-XSS vector if ever opened directly).
    const ALLOWED_AVATAR_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'image/gif'];
    if (!ALLOWED_AVATAR_TYPES.includes(file.type)) { setAvatarError('PNG, JPG, WEBP, GIF зураг оруулна уу.'); return; }
    if (file.size > 5 * 1024 * 1024) { setAvatarError('Зураг 5MB-аас бага байх ёстой.'); return; }
    if (!isFirebaseConfigured) { setAvatarError('Зураг оруулах боломжгүй байна.'); return; }
    setAvatarError(null);
    setAvatarUploading(true);
    try {
      const storage = getStorageInstance();
      const userId = getAuthInstance().currentUser?.uid;
      if (!userId) throw new Error('Not signed in');
      const ext = (file.name.split('.').pop() || 'jpg').toLowerCase().replace(/[^a-z0-9]/g, '') || 'jpg';
      const fileRef = ref(storage, `avatars/${userId}/${Date.now()}-${Math.random().toString(36).substring(2)}.${ext}`);
      await uploadBytes(fileRef, file);
      const url = await getDownloadURL(fileRef);
      setProfileDraft((d) => d && { ...d, avatar: url });
    } catch (err) {
      console.warn('Avatar upload failed:', err);
      setAvatarError('Зураг оруулж чадсангүй. Дахин оролдоно уу.');
    } finally {
      setAvatarUploading(false);
    }
  };

  return (
            <div className="max-w-xl mx-auto w-full border-2 border-ink-line rounded-xl p-8 block-shadow animate-fade-in pb-24">
              <div className="flex items-center gap-3 pb-4 border-b border-ink-line mb-6 text-paper">
                <Settings className="w-6 h-6 outline" />
                <h2 className="text-2xl font-extrabold font-serif">Тохиргоо ба Хувийн Төлөв</h2>
              </div>

              <div className="space-y-6 font-sans">
                {/* 1. Profile editor — avatar, name, level, daily goal, learning goal */}
                {profileDraft && currentUser && (
                  <div className="space-y-5 bg-ink-raise p-4 md:p-5 rounded-xl border-2 border-ink-line block-shadow">
                    <div className="flex items-center gap-2 text-paper">
                      <Target className="w-5 h-5" />
                      <h4 className="text-sm font-serif font-bold uppercase tracking-wide">Профайл</h4>
                    </div>

                    {/* Avatar + name */}
                    <div className="flex items-center gap-4">
                      <div className="relative shrink-0">
                        <div className="w-20 h-20 rounded-full overflow-hidden bg-ink-raise border-2 border-ink-line block-shadow">
                          <img src={profileDraft.avatar} alt={profileDraft.name} className="w-full h-full object-cover" />
                        </div>
                        <button
                          type="button"
                          onClick={() => setShowAvatarPicker((v) => !v)}
                          className="absolute -bottom-1 -right-1 p-1.5 bg-paper text-ink rounded-full border-2 border-ink-line block-shadow cursor-pointer hover:opacity-90"
                          aria-label="Зураг солих"
                        >
                          <Camera className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="flex-1 min-w-0">
                        <label className="text-[11px] font-bold uppercase text-paper-3 font-serif">Нэр</label>
                        <input
                          type="text"
                          value={profileDraft.name}
                          maxLength={30}
                          onChange={(e) => setProfileDraft((d) => d && { ...d, name: e.target.value })}
                          className="w-full mt-1 px-3 py-2 bg-ink-raise border-2 border-ink-line rounded-xl text-paper font-bold outline-none focus:border-ink-line"
                          placeholder="Таны нэр"
                        />
                      </div>
                    </div>

                    {/* Avatar picker grid */}
                    {showAvatarPicker && (
                      <div className="space-y-3 p-3 bg-ink-raise rounded-xl border border-ink-line">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="text-[11px] font-bold uppercase text-paper-3 font-serif">Зургаа сонгох эсвэл оруулах</span>
                          <div className="flex items-center gap-2">
                            <input
                              ref={avatarFileInputRef}
                              type="file"
                              accept="image/png,image/jpeg,image/webp,image/gif"
                              onChange={handleAvatarUpload}
                              className="hidden"
                            />
                            <button
                              type="button"
                              onClick={() => avatarFileInputRef.current?.click()}
                              disabled={avatarUploading}
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-paper text-ink border-2 border-ink-line rounded-lg text-xs font-bold cursor-pointer hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {avatarUploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
                              Зураг оруулах
                            </button>
                            <button
                              type="button"
                              onClick={() => setAvatarPage((p) => p + 1)}
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-ink-raise border-2 border-ink-line rounded-lg text-xs font-bold cursor-pointer hover:bg-ink-raise"
                            >
                              <Shuffle className="w-3.5 h-3.5" /> Шинэчлэх
                            </button>
                          </div>
                        </div>
                        {avatarError && <p className="text-[11px] text-paper-2 font-semibold">{avatarError}</p>}
                        <div className="flex flex-wrap gap-1.5">
                          {AVATAR_STYLES.map((s) => (
                            <button
                              key={s.id}
                              type="button"
                              onClick={() => { setAvatarStyle(s.id); setAvatarPage(0); }}
                              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border-2 cursor-pointer transition-all ${avatarStyle === s.id ? 'bg-paper text-ink border-ink-line' : 'bg-ink-raise border-ink-line text-paper hover:bg-ink-raise'}`}
                            >
                              {s.label}
                            </button>
                          ))}
                        </div>
                        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                          {avatarOptions(currentUser.email, avatarPage, avatarStyle).map((url) => {
                            const selected = profileDraft.avatar === url;
                            return (
                              <button
                                key={url}
                                type="button"
                                onClick={() => setProfileDraft((d) => d && { ...d, avatar: url })}
                                className={`relative aspect-square rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${selected ? 'border-ink-line ring-2 ring-paper/30' : 'border-ink-line hover:border-ink-line/60'}`}
                              >
                                <img src={url} alt="avatar" className="w-full h-full object-cover bg-ink-raise" />
                                {selected && (
                                  <span className="absolute top-0.5 right-0.5 bg-paper text-ink rounded-full p-0.5">
                                    <Check className="w-3 h-3" />
                                  </span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Target level */}
                    <div>
                      <label className="text-[11px] font-bold uppercase text-paper-3 font-serif">Зорилтот түвшин</label>
                      <div className="grid grid-cols-6 gap-1.5 mt-1.5">
                        {(['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const).map((lvl) => (
                          <button
                            key={lvl}
                            type="button"
                            onClick={() => setProfileDraft((d) => d && { ...d, targetLevel: lvl })}
                            className={`py-2 rounded-lg text-sm font-black border-2 cursor-pointer transition-all ${profileDraft.targetLevel === lvl ? 'bg-paper text-ink border-ink-line' : 'bg-ink-raise border-ink-line text-paper hover:bg-ink-raise'}`}
                          >
                            {lvl}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Daily goal */}
                    <div>
                      <label className="text-[11px] font-bold uppercase text-paper-3 font-serif">Өдрийн зорилго</label>
                      <div className="grid grid-cols-5 gap-1.5 mt-1.5">
                        {[5, 10, 15, 30, 60].map((m) => (
                          <button
                            key={m}
                            type="button"
                            onClick={() => setProfileDraft((d) => d && { ...d, dailyGoalMinutes: m })}
                            className={`py-2 rounded-lg text-xs font-bold border-2 cursor-pointer transition-all ${profileDraft.dailyGoalMinutes === m ? 'bg-paper text-ink border-ink-line' : 'bg-ink-raise border-ink-line text-paper hover:bg-ink-raise'}`}
                          >
                            {m}<span className="text-[9px]">мин</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Learning goal */}
                    <div>
                      <label className="text-[11px] font-bold uppercase text-paper-3 font-serif">Суралцах зорилго</label>
                      <textarea
                        value={profileDraft.learningGoal}
                        maxLength={280}
                        rows={3}
                        onChange={(e) => setProfileDraft((d) => d && { ...d, learningGoal: e.target.value })}
                        className="w-full mt-1 px-3 py-2 bg-ink-raise border-2 border-ink-line rounded-xl text-paper text-sm outline-none focus:border-ink-line resize-none"
                        placeholder="Жишээ: Goethe B1 шалгалт өгөх"
                      />
                      <p className="text-right text-[10px] text-paper-3 mt-0.5">{profileDraft.learningGoal.length}/280</p>
                    </div>

                    {/* Save */}
                    <div className="space-y-1.5">
                      <button
                        type="button"
                        onClick={saveProfileEdits}
                        disabled={profileSaving || !profileDraft.name.trim()}
                        className="w-full flex items-center justify-center gap-2 py-3 bg-paper text-ink font-black rounded-xl border-2 border-ink-line block-shadow cursor-pointer hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                      >
                        {profileSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : profileSaved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                        {profileSaved ? 'Хадгалагдлаа' : 'Хадгалах'}
                      </button>
                      {profileSaveError && <p className="text-center text-[11px] text-paper-2 font-semibold">Хадгалж чадсангүй. Дахин оролдоно уу.</p>}
                    </div>
                  </div>
                )}

                {/* 2. Interactive toggles state */}
                <div className="space-y-4">
                  <h4 className="text-xs font-serif font-bold uppercase text-paper-3">Хичээлийн тохируулга:</h4>

                  <div className="flex justify-between items-center p-3 border-2 border-ink-line rounded-xl select-none block-shadow">
                    <div>
                      <h5 className="text-sm font-bold">Орчуулга автоматаар харуулах</h5>
                      <p className="text-[11px] text-paper-3">Унших, сонсох зохиолд орчуулгыг шууд харуулна. Унтраалттай үед эхлээд өөрөө уншиж, гацсан үедээ "Орчуулга" товчоор нээнэ.</p>
                    </div>
                    <button
                      onClick={() => setReadTranslateEnabled(prev => !prev)}
                      className={`w-12 h-6 rounded-full transition-colors relative border border-ink-line block-shadow cursor-pointer ${
                        readTranslateEnabled ? 'bg-paper' : 'bg-ink-2'
                      }`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full absolute top-[3px] transition-all ${
                        readTranslateEnabled ? 'left-6' : 'left-1'
                      }`}></div>
                    </button>
                  </div>

                  <div className="flex justify-between items-center p-3 border-2 border-ink-line rounded-xl select-none block-shadow">
                    <div>
                      <h5 className="text-sm font-bold">Цайвар горим</h5>
                      <p className="text-[11px] text-paper-3">Цайвар болон бараан дэлгэцийн горим солих.</p>
                    </div>
                    <button
                      onClick={() => {
                        const next: Theme = theme === 'light' ? 'dark' : 'light';
                        setTheme(next);
                        setThemeState(next);
                      }}
                      className={`w-12 h-6 rounded-full transition-colors relative border border-ink-line block-shadow cursor-pointer ${
                        theme === 'light' ? 'bg-paper' : 'bg-ink-2'
                      }`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full absolute top-[3px] transition-all ${
                        theme === 'light' ? 'left-6' : 'left-1'
                      }`}></div>
                    </button>
                  </div>

                  <div className="flex justify-between items-center p-3 border-2 border-ink-line rounded-xl select-none block-shadow">
                    <div>
                      <h5 className="text-sm font-bold">Удаан хэмнэлтийн сонсох зам</h5>
                      <p className="text-[11px] text-paper-3">Сонсох СД зам дээр Германы хурдыг 0.8х дээр удирдах тохиргоо.</p>
                    </div>
                    <button
                      onClick={() => setAudioSpeed(prev => prev === '1.0' ? '0.8' : '1.0')}
                      className={`w-12 h-6 rounded-full transition-colors relative border border-ink-line block-shadow cursor-pointer ${
                        audioSpeed === '0.8' ? 'bg-paper' : 'bg-ink-2'
                      }`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full absolute top-[3px] transition-all ${
                        audioSpeed === '0.8' ? 'left-6' : 'left-1'
                      }`}></div>
                    </button>
                  </div>

                  <div className="flex justify-between items-center p-3 border-2 border-ink-line rounded-xl select-none block-shadow">
                    <div>
                      <h5 className="text-sm font-bold">Streak автоматаар тооцох</h5>
                      <p className="text-[11px] text-paper-3">Зөв дуусгасан дасгалтай өдөр streak-д автоматаар орно.</p>
                    </div>
                    <span className="font-bold text-sm bg-ink-raise px-3 py-1 border border-ink-line rounded-lg">{streak} өдөр</span>
                  </div>
                </div>

                {/* 3. Account essentials */}
                <div className="space-y-3">
                  <h4 className="text-xs font-serif font-bold uppercase text-paper-3">Бүртгэл:</h4>
                  <div className="flex items-center justify-between p-3 border-2 border-ink-line rounded-xl block-shadow">
                    <div className="flex items-center gap-2 min-w-0">
                      <Mail className="w-4 h-4 text-paper-3 shrink-0" />
                      <span className="text-sm font-bold text-paper truncate">{currentUser?.email}</span>
                    </div>
                    <span className="text-[10px] text-paper-3 font-mono shrink-0 ml-2">Имэйл</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleResetPassword}
                    className="w-full flex items-center justify-between p-3 border-2 border-ink-line rounded-xl block-shadow cursor-pointer hover:bg-ink-raise transition-colors"
                  >
                    <span className="flex items-center gap-2 text-sm font-bold text-paper"><Lock className="w-4 h-4 text-paper-3" /> Нууц үг солих</span>
                    <span className="text-[11px] text-paper-2 font-bold shrink-0 ml-2">{resetSent ? 'Имэйл илгээлээ ✓' : 'Имэйл авах'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={logoutUser}
                    className="w-full flex items-center justify-center gap-2 p-3 bg-ink-raise border-2 border-ink-line text-paper-2 font-bold rounded-xl cursor-pointer hover:bg-ink-raise transition-all"
                  >
                    <LogOut className="w-4 h-4" /> Гарах
                  </button>
                </div>

                {/* Explanations instructions */}
                <div className="bg-ink-raise border border-ink-line p-4 rounded-xl text-center">
                  <p className="text-xs text-paper-2 leading-snug">
                    Vivid Lingua аппликэйшний бүхий л хичээлийн загваруудыг цээжлүүлэн бэлтгэлээ. Та settings цэсийг ашиглан хичээлийн удирдамжийг хялбархан тааруулж болно.
                  </p>
                </div>
              </div>
            </div>
  );
}
