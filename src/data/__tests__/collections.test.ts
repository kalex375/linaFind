import { describe, expect, it } from 'vitest';
import { builtInCollections, findCollectionById, findCollectionForLevel, getLevelsInCollection } from '../collections';
import { builtInLevels, findLevelById } from '../levels';

describe('built-in collections', () => {
  it('groups the sunny-house levels in display order', () => {
    const collection = findCollectionById('sunny-house');

    expect(collection).toBeDefined();
    expect(collection?.levelIds).toEqual([
      'ai-kitchen',
      'ai-bedroom',
      'ai-bathroom',
      'ai-garden',
      'ai-playroom',
    ]);
  });

  it('uses Ukrainian as the third language for every collection title', () => {
    for (const collection of builtInCollections) {
      expect(Object.keys(collection.title)).toEqual(['pt', 'en', 'uk']);
    }
  });

  it('references only real levels', () => {
    for (const collection of builtInCollections) {
      for (const levelId of collection.levelIds) {
        expect(findLevelById(levelId), levelId).toBeDefined();
      }
    }
  });

  it('covers every built-in level in exactly one collection', () => {
    const collected = builtInCollections.flatMap((collection) => collection.levelIds);

    expect([...collected].sort()).toEqual(builtInLevels.map((level) => level.id).sort());
    expect(new Set(collected).size).toBe(collected.length);
  });

  it('resolves collection level ids to level objects', () => {
    const collection = findCollectionById('sunny-house')!;
    const levels = getLevelsInCollection(collection);

    expect(levels.map((level) => level.id)).toEqual(collection.levelIds);
    expect(levels.every((level) => level.source === 'ai')).toBe(true);
  });

  it('finds the collection a level belongs to', () => {
    expect(findCollectionForLevel('ai-garden')?.id).toBe('sunny-house');
    expect(findCollectionForLevel('does-not-exist')).toBeUndefined();
  });
});
