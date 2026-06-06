export function cleanText(txt: string): string {
  return txt.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, '').replace(/\s+/g, ' ').trim();
}
