export async function audioBlobToWavBlob(blob: Blob): Promise<Blob> {
  const arrayBuffer = await blob.arrayBuffer();
  const AudioCtx = (window as any).AudioContext || (window as any).webkitAudioContext;
  const ctx: AudioContext = new AudioCtx();
  const decoded = await ctx.decodeAudioData(arrayBuffer.slice(0));
  ctx.close();

  const targetRate = 16000;
  const srcRate = decoded.sampleRate;
  const srcData = decoded.getChannelData(0); // mono: first channel is enough
  const ratio = srcRate / targetRate;
  const outLen = Math.floor(srcData.length / ratio);
  const samples = new Int16Array(outLen);
  for (let i = 0; i < outLen; i++) {
    const s = srcData[Math.floor(i * ratio)] || 0;
    samples[i] = Math.max(-1, Math.min(1, s)) * 0x7fff;
  }

  const bytesPerSample = 2;
  const buffer = new ArrayBuffer(44 + samples.length * bytesPerSample);
  const view = new DataView(buffer);
  const writeStr = (off: number, str: string) => {
    for (let i = 0; i < str.length; i++) view.setUint8(off + i, str.charCodeAt(i));
  };
  const dataLen = samples.length * bytesPerSample;
  writeStr(0, 'RIFF'); view.setUint32(4, 36 + dataLen, true); writeStr(8, 'WAVE');
  writeStr(12, 'fmt '); view.setUint32(16, 16, true); view.setUint16(20, 1, true);
  view.setUint16(22, 1, true); view.setUint32(24, targetRate, true);
  view.setUint32(28, targetRate * bytesPerSample, true); view.setUint16(32, bytesPerSample, true);
  view.setUint16(34, 16, true); writeStr(36, 'data'); view.setUint32(40, dataLen, true);
  for (let i = 0; i < samples.length; i++) view.setInt16(44 + i * 2, samples[i], true);

  return new Blob([buffer], { type: 'audio/wav' });
}

// Decode a recorded audio Blob (webm/opus, mp4/aac, …) and re-encode it as a
// 16 kHz mono 16-bit WAV, returned base64-encoded. WAV is the format Gemini
// reliably accepts, so this sidesteps browser codec/container differences.
export async function audioBlobToWavBase64(blob: Blob): Promise<string> {
  const wavBlob = await audioBlobToWavBlob(blob);
  const arrayBuffer = await wavBlob.arrayBuffer();
  const bytes = new Uint8Array(arrayBuffer);
  let binary = '';
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode.apply(null, Array.from(bytes.subarray(i, i + chunk)));
  }
  return btoa(binary);
}
