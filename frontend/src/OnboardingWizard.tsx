import React, { useState } from 'react';
import { Target, BookOpen, GraduationCap, Sparkles, Clock, ArrowRight, Check } from 'lucide-react';

interface OnboardingWizardProps {
  userName: string;
  onComplete: (data: { goal: string; level: string; dailyGoalMinutes: number }) => void;
}

export default function OnboardingWizard({ userName, onComplete }: OnboardingWizardProps) {
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState('');
  const [level, setLevel] = useState('');
  const [dailyGoalMinutes, setDailyGoalMinutes] = useState<number | null>(null);

  const goals = [
    { id: 'exam', label: 'Шалгалтад бэлдэх (Goethe/TestDaF)', desc: 'Түвшний шалгалтад өндөр оноо авах' },
    { id: 'work', label: 'Ажил, мэргэжлийн хэрэгцээ', desc: 'Герман түншүүдтэй харилцах, ажиллах' },
    { id: 'travel', label: 'Аялал жуулчлал', desc: 'Герман хэлтэй орнуудаар аялах' },
    { id: 'personal', label: 'Сонирхлоороо сурах', desc: 'Өөрийгөө хөгжүүлэх, шинэ зүйл сурах' },
  ];

  const levels = [
    { id: 'A1', label: 'A1', desc: 'Анхан шат — Энгийн мэндчилгээ, танилцуулга' },
    { id: 'A2', label: 'A2', desc: 'Суурь — Өдөр тутмын харилцаа' },
    { id: 'B1', label: 'B1', desc: 'Дунд — Аялал, ажлын нөхцөл' },
    { id: 'B2', label: 'B2', desc: 'Ахисан — Мэргэжлийн ярилцлага' },
  ];

  const durations = [
    { minutes: 5, label: '5 мин', desc: 'Хөнгөн хичээллэх' },
    { minutes: 10, label: '10 мин', desc: 'Дундаж ачаалалтай хичээллэх' },
    { minutes: 15, label: '15 мин', desc: 'Эрчимтэй хичээллэх' },
    { minutes: 30, label: '30 мин', desc: 'Урт хугацаанд гүнзгийрэх' },
    { minutes: 60, label: '60 мин', desc: 'Супер эрчимтэй хичээллэх' },
  ];

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else if (goal && level && dailyGoalMinutes) {
      onComplete({ goal, level, dailyGoalMinutes });
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const isNextDisabled = () => {
    if (step === 1) return !goal;
    if (step === 2) return !level;
    if (step === 3) return !dailyGoalMinutes;
    return true;
  };

  return (
    <div className="fixed inset-0 bg-ink z-[100] flex flex-col items-center justify-between pb-12 pt-6 px-4 md:px-12 animate-fade-in text-paper overflow-y-auto">
      {/* Atmospheric background glows in overlay */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-paper/[0.03] rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-paper/[0.03] rounded-full blur-[120px] pointer-events-none"></div>

      {/* Top Header & Progress */}
      <header className="w-full max-w-[600px] flex flex-col gap-4 py-2 relative z-10">
        <div className="flex justify-between items-center w-full">
          <h1 className="text-2xl font-serif font-light tracking-tight">
            <span className="text-paper">Vivid</span> <span className="text-paper-2">Lingua</span>
          </h1>
          <span className="text-[11px] uppercase tracking-[0.18em] text-paper-3 font-medium">Алхам {step} / 3</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2.5 bg-ink-raise border border-ink-line rounded-full overflow-hidden relative">
          <div
            className="h-full bg-paper transition-all duration-500"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </header>

      {/* Content Area */}
      <main className="flex-grow w-full max-w-[600px] flex flex-col justify-center py-8 relative z-10">
        <div className="animate-scale-up space-y-6">
          {step === 1 && (
            <div className="space-y-6">
              <div className="space-y-2 text-center md:text-left">
                <div className="inline-flex p-3 bg-ink-raise border border-ink-line rounded-xl text-paper-2 mb-2">
                  <Target className="w-6 h-6" />
                </div>
                <h2 className="text-2xl md:text-3xl font-serif font-light tracking-tight text-paper">Таны зорилго юу вэ?</h2>
                <p className="text-paper-2 text-sm leading-relaxed">Бид танд тохирсон сургалтын төлөвлөгөө бэлдэх болно</p>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {goals.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setGoal(g.label)}
                    className={`flex items-center justify-between text-left p-4 rounded-xl transition-all cursor-pointer ${
                      goal === g.label
                        ? 'bg-ink-raise border-2 border-paper'
                        : 'bg-ink-raise border border-ink-line hover:border-ink-line-2 hover:bg-ink-2'
                    }`}
                  >
                    <div>
                      <div className="font-medium text-paper text-base">{g.label}</div>
                      <div className="text-xs text-paper-2 mt-1">{g.desc}</div>
                    </div>
                    {goal === g.label && <Check className="w-5 h-5 text-paper flex-shrink-0 ml-3" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="space-y-2 text-center md:text-left">
                <div className="inline-flex p-3 bg-ink-raise border border-ink-line rounded-xl text-paper-2 mb-2">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h2 className="text-2xl md:text-3xl font-serif font-light tracking-tight text-paper">Одоогийн түвшингээ сонгоно уу</h2>
                <p className="text-paper-2 text-sm leading-relaxed">Мэдэхгүй бол A1 сонгоно уу — бид тест авч тодорхойлно</p>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {levels.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => setLevel(l.id)}
                    className={`flex items-center justify-between text-left p-4 rounded-xl transition-all cursor-pointer ${
                      level === l.id
                        ? 'bg-ink-raise border-2 border-paper'
                        : 'bg-ink-raise border border-ink-line hover:border-ink-line-2 hover:bg-ink-2'
                    }`}
                  >
                    <div>
                      <div className="font-serif font-normal text-paper text-lg">{l.label}</div>
                      <div className="text-xs text-paper-2 mt-1">{l.desc}</div>
                    </div>
                    {level === l.id && <Check className="w-5 h-5 text-paper flex-shrink-0 ml-3" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="space-y-2 text-center md:text-left">
                <div className="inline-flex p-3 bg-ink-raise border border-ink-line rounded-xl text-paper-2 mb-2">
                  <Clock className="w-6 h-6" />
                </div>
                <h2 className="text-2xl md:text-3xl font-serif font-light tracking-tight text-paper">Өдөрт хэр удаан хичээллэх вэ?</h2>
                <p className="text-paper-2 text-sm leading-relaxed">Бид танд тохирсон хичээлийн хэмжээг тааруулна</p>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {durations.map((d) => (
                  <button
                    key={d.minutes}
                    onClick={() => setDailyGoalMinutes(d.minutes)}
                    className={`flex items-center justify-between text-left p-4 rounded-xl transition-all cursor-pointer ${
                      dailyGoalMinutes === d.minutes
                        ? 'bg-ink-raise border-2 border-paper'
                        : 'bg-ink-raise border border-ink-line hover:border-ink-line-2 hover:bg-ink-2'
                    }`}
                  >
                    <div>
                      <div className="font-medium text-paper text-base">{d.label}</div>
                      <div className="text-xs text-paper-2 mt-1">{d.desc}</div>
                    </div>
                    {dailyGoalMinutes === d.minutes && <Check className="w-5 h-5 text-paper flex-shrink-0 ml-3" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer Navigation */}
      <footer className="w-full max-w-[600px] flex gap-4 mt-4 relative z-10">
        {step > 1 && (
          <button
            onClick={handleBack}
            className="flex-1 py-3.5 bg-transparent border border-ink-line hover:border-paper/60 hover:bg-ink-raise rounded-xl text-xs font-medium uppercase tracking-[0.15em] transition-all text-paper-2 hover:text-paper cursor-pointer"
          >
            Буцах
          </button>
        )}
        <button
          onClick={handleNext}
          disabled={isNextDisabled()}
          className="flex-[2] bg-paper text-ink text-xs font-medium uppercase tracking-[0.15em] rounded-xl py-3.5 px-6 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          {step === 3 ? (
            <>
              Эхлэцгээе! <Sparkles className="w-5 h-5 text-ink animate-pulse" />
            </>
          ) : (
            <>
              Үргэлжлүүлэх <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </footer>
    </div>
  );
}
