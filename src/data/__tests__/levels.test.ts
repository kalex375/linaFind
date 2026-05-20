import { describe, expect, it } from 'vitest';
import { getSearchItems } from '../../domain/levelLogic';
import { builtInLevels } from '../levels';

describe('built-in levels', () => {
  it('includes the generated AI kitchen level as an offline asset', () => {
    const level = builtInLevels.find((candidate) => candidate.id === 'ai-kitchen');

    expect(level).toBeDefined();
    expect(level?.source).toBe('ai');
    expect(level?.imageSrc).toBe('/assets/levels/ai-kitchen/scene.png');
    expect(getSearchItems(level!)).toHaveLength(5);
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
