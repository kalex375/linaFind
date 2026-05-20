import { describe, expect, it } from 'vitest';
import { getSearchItems } from '../../domain/levelLogic';
import { builtInLevels } from '../levels';

describe('built-in levels', () => {
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
