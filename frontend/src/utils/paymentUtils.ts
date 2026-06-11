export function formatMnt(amountMnt: number | null | undefined): string {
  if (!amountMnt) return 'Үнэ тохируулаагүй';
  return new Intl.NumberFormat('mn-MN', {
    style: 'currency',
    currency: 'MNT',
    maximumFractionDigits: 0,
  }).format(amountMnt);
}

export function qpayQrImageSrc(qrImage?: string): string | null {
  if (!qrImage) return null;
  if (qrImage.startsWith('data:') || qrImage.startsWith('http')) return qrImage;
  return `data:image/png;base64,${qrImage}`;
}
