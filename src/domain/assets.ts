export function resolveAssetPath(src: string): string {
  if (/^(https?:|data:|blob:)/.test(src)) {
    return src;
  }

  const base = import.meta.env.BASE_URL || '/';
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  const normalizedSrc = src.startsWith('/') ? src.slice(1) : src;

  return `${normalizedBase}${normalizedSrc}`;
}
