import { describe, expect, it } from 'vitest';
import { getSearchItems } from '../../domain/levelLogic';
import { builtInLevels } from '../levels';

describe('built-in levels', () => {
  it('keeps built-in levels in display order', () => {
    expect(builtInLevels.map((level) => level.id)).toEqual([
      'ai-kitchen',
      'ai-bedroom',
      'ai-bathroom',
      'ai-garden',
      'ai-playroom',
      'paper-market',
      'paper-space',
      'paper-seaside',
      'paper-forest',
      'paper-classroom',
      'toy-bakery',
      'toy-station',
      'toy-underwater',
      'toy-dino',
      'toy-music',
      'felt-picnic',
      'felt-bedroom',
      'felt-farm',
      'felt-candy',
      'felt-rooftop',
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

  it('provides generated scenes for every AI level', () => {
    const aiLevels = builtInLevels.filter((level) => level.source === 'ai');

    expect(aiLevels.map((level) => level.id)).toEqual([
      'ai-kitchen',
      'ai-bedroom',
      'ai-bathroom',
      'ai-garden',
      'ai-playroom',
      'toy-bakery',
      'toy-station',
      'toy-underwater',
      'toy-dino',
      'toy-music',
      'felt-picnic',
      'felt-bedroom',
      'felt-farm',
      'felt-candy',
      'felt-rooftop',
    ]);

    for (const level of aiLevels) {
      expect(level.imageSrc).toBe(`/assets/levels/${level.id}/scene.png`);
      expect(level.thumbnailSrc).toBe(`/assets/levels/${level.id}/scene.png`);
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
