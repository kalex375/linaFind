import { describe, expect, it } from 'vitest';
import {
  buildInitialProgress,
  findItemAtPoint,
  getAudioSource,
  getThumbnailArea,
  getThumbnailCropStyle,
  getSearchItems,
  isLevelComplete,
  markItemFound,
  type Level,
} from '../levelLogic';

const sampleLevel: Level = {
  id: 'sample',
  title: { pt: 'Quarto', en: 'Bedroom', uk: 'Кімната' },
  thumbnailSrc: '/thumb.svg',
  imageSrc: '/scene.svg',
  source: 'built-in',
  items: [
    {
      id: 'ball',
      role: 'search-target',
      label: { pt: 'bola', en: 'ball', uk: "м'яч" },
      showLabelOnImage: true,
      targetArea: { x: 10, y: 20, width: 15, height: 10 },
      thumbnailArea: { x: 12, y: 22, width: 10, height: 8 },
      thumbnailSrc: '/ball.png',
      audioSrc: { pt: '/audio/bola.mp3' },
    },
    {
      id: 'lamp',
      role: 'learning-only',
      label: { pt: 'candeeiro', en: 'lamp', uk: 'лампа' },
      showLabelOnImage: true,
      targetArea: { x: 70, y: 5, width: 10, height: 20 },
    },
  ],
};

describe('level logic', () => {
  it('shows only search targets in the side panel', () => {
    expect(getSearchItems(sampleLevel).map((item) => item.id)).toEqual(['ball']);
  });

  it('tracks progress only for search targets', () => {
    const progress = buildInitialProgress(sampleLevel);

    expect(progress).toEqual({ ball: false });
    expect(markItemFound(progress, sampleLevel.items[1])).toEqual({ ball: false });
    expect(markItemFound(progress, sampleLevel.items[0])).toEqual({ ball: true });
  });

  it('completes the level only when all search targets are found', () => {
    expect(isLevelComplete(sampleLevel, { ball: false })).toBe(false);
    expect(isLevelComplete(sampleLevel, { ball: true })).toBe(true);
  });

  it('finds an interactive item by percentage coordinates', () => {
    expect(findItemAtPoint(sampleLevel, 12, 24)?.id).toBe('ball');
    expect(findItemAtPoint(sampleLevel, 75, 12)?.id).toBe('lamp');
    expect(findItemAtPoint(sampleLevel, 90, 90)).toBeUndefined();
  });

  it('prefers the smallest (most specific) area when targets overlap', () => {
    const overlappingLevel: Level = {
      ...sampleLevel,
      items: [
        {
          id: 'big',
          role: 'search-target',
          label: { pt: 'grande', en: 'big', uk: 'велике' },
          showLabelOnImage: false,
          targetArea: { x: 0, y: 0, width: 50, height: 50 },
        },
        {
          id: 'small',
          role: 'learning-only',
          label: { pt: 'pequeno', en: 'small', uk: 'мале' },
          showLabelOnImage: false,
          targetArea: { x: 10, y: 10, width: 10, height: 10 },
        },
      ],
    };

    expect(findItemAtPoint(overlappingLevel, 15, 15)?.id).toBe('small');
    expect(findItemAtPoint(overlappingLevel, 30, 30)?.id).toBe('big');
  });

  it('uses local audio when present and reports fallback when it is missing', () => {
    expect(getAudioSource(sampleLevel.items[0], 'pt')).toEqual({
      kind: 'file',
      src: '/audio/bola.mp3',
    });
    expect(getAudioSource(sampleLevel.items[0], 'en')).toEqual({ kind: 'speech' });
  });

  it('uses a separate thumbnail area for cropped side-panel previews', () => {
    expect(getThumbnailArea(sampleLevel.items[0])).toEqual({ x: 12, y: 22, width: 10, height: 8 });
    expect(getThumbnailArea(sampleLevel.items[1])).toEqual(sampleLevel.items[1].targetArea);
  });

  it('converts percentage item coordinates into CSS background crop coordinates', () => {
    expect(getThumbnailCropStyle('/scene.png', { x: 25, y: 40, width: 10, height: 20 })).toEqual({
      backgroundImage: 'url(/scene.png)',
      backgroundSize: '1000% 500%',
      backgroundPosition: '27.7778% 50%',
    });
  });
});
