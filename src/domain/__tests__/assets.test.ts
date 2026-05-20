import { describe, expect, it } from 'vitest';
import { resolveAssetPath } from '../assets';

describe('asset paths', () => {
  it('keeps absolute external URLs unchanged', () => {
    expect(resolveAssetPath('https://example.com/image.png')).toBe('https://example.com/image.png');
    expect(resolveAssetPath('data:image/png;base64,abc')).toBe('data:image/png;base64,abc');
  });

  it('resolves app assets through the Vite base URL', () => {
    expect(resolveAssetPath('/assets/levels/ai-kitchen/scene.png')).toBe('/assets/levels/ai-kitchen/scene.png');
    expect(resolveAssetPath('assets/flags/pt.svg')).toBe('/assets/flags/pt.svg');
  });
});
