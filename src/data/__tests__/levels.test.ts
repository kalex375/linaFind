import { describe, expect, it } from 'vitest';
import { getSearchItems } from '../../domain/levelLogic';
import { builtInLevels } from '../levels';

describe('built-in levels', () => {
  it('shows only generated AI levels on the level picker', () => {
    expect(builtInLevels.map((level) => level.id)).toEqual([
      'ai-kitchen',
      'ai-bedroom',
      'ai-bathroom',
      'ai-garden',
      'ai-playroom',
    ]);
  });

  it('includes the generated AI kitchen level as an offline asset', () => {
    const level = builtInLevels.find((candidate) => candidate.id === 'ai-kitchen');

    expect(level).toBeDefined();
    expect(level?.source).toBe('ai');
    expect(level?.imageSrc).toBe('/assets/levels/ai-kitchen/scene.png');
    expect(getSearchItems(level!)).toHaveLength(5);
  });

  it('uses object thumbnail assets for AI kitchen search targets', () => {
    const level = builtInLevels.find((candidate) => candidate.id === 'ai-kitchen');
    const items = getSearchItems(level!);

    expect(items.map((item) => item.thumbnailSrc)).toEqual([
      '/assets/levels/ai-kitchen/thumbs/cup.png',
      '/assets/levels/ai-kitchen/thumbs/spoon.png',
      '/assets/levels/ai-kitchen/thumbs/apple.png',
      '/assets/levels/ai-kitchen/thumbs/pot.png',
      '/assets/levels/ai-kitchen/thumbs/clock.png',
    ]);
  });

  it('provides generated scenes and object thumbnails for every AI level', () => {
    const aiLevels = builtInLevels.filter((level) => level.source === 'ai');

    expect(aiLevels.map((level) => level.id)).toEqual([
      'ai-kitchen',
      'ai-bedroom',
      'ai-bathroom',
      'ai-garden',
      'ai-playroom',
    ]);

    for (const level of aiLevels) {
      expect(level.imageSrc).toBe(`/assets/levels/${level.id}/scene.png`);
      expect(level.thumbnailSrc).toBe(`/assets/levels/${level.id}/scene.png`);
      expect(getSearchItems(level).every((item) => item.thumbnailSrc?.startsWith(`/assets/levels/${level.id}/thumbs/`))).toBe(true);
    }
  });

  it('provides at least five search targets per level', () => {
    for (const level of builtInLevels) {
      expect(getSearchItems(level), level.id).toHaveLength(5);
    }
  });

  it('uses Ukrainian as the third language', () => {
    for (const level of builtInLevels) {
      expect(Object.keys(level.title)).toEqual(['pt', 'en', 'uk']);

      for (const item of level.items) {
        expect(Object.keys(item.label)).toEqual(['pt', 'en', 'uk']);
      }
    }
  });
});
