import type { Collection, Level } from '../domain/levelLogic';
import { findLevelById } from './levels';

export const builtInCollections: Collection[] = [
  {
    id: 'sunny-house',
    title: { pt: 'Casa solarenga', en: 'Sunny house', uk: 'Сонячний дім' },
    thumbnailSrc: '/assets/levels/ai-kitchen/scene.png',
    levelIds: ['ai-kitchen', 'ai-bedroom', 'ai-bathroom', 'ai-garden', 'ai-playroom'],
  },
  {
    id: 'paper-adventure',
    title: { pt: 'Aventura de papel', en: 'Paper adventure', uk: 'Paper adventure' },
    thumbnailSrc: '/assets/levels/paper-market/scene.png',
    levelIds: ['paper-market', 'paper-space', 'paper-seaside', 'paper-forest', 'paper-classroom'],
  },
];

export function findCollectionById(id: string): Collection | undefined {
  return builtInCollections.find((collection) => collection.id === id);
}

export function getLevelsInCollection(collection: Collection): Level[] {
  return collection.levelIds
    .map((levelId) => findLevelById(levelId))
    .filter((level): level is Level => level !== undefined);
}

export function findCollectionForLevel(levelId: string): Collection | undefined {
  return builtInCollections.find((collection) => collection.levelIds.includes(levelId));
}
