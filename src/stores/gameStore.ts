import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { builtInCollections, findCollectionById, findCollectionForLevel, getLevelsInCollection } from '../data/collections';
import { builtInLevels, findLevelById } from '../data/levels';
import {
  buildInitialProgress,
  findItemAtPoint,
  getSearchItems,
  isLevelComplete,
  markItemFound,
  type FoundProgress,
  type LanguageCode,
  type Level,
  type SceneItem,
} from '../domain/levelLogic';

const languageStorageKey = 'lina-find-language';

export const useGameStore = defineStore('game', () => {
const supportedLanguages: LanguageCode[] = ['pt', 'en', 'uk'];
const savedLanguage = window.localStorage.getItem(languageStorageKey) as LanguageCode | null;
  const language = ref<LanguageCode>(savedLanguage && supportedLanguages.includes(savedLanguage) ? savedLanguage : 'pt');
  const currentLevel = ref<Level | undefined>();
  const progress = ref<FoundProgress>({});
  const lastTouchedItem = ref<SceneItem | undefined>();

  const levels = computed(() => builtInLevels);
  const collections = computed(() => builtInCollections);
  const currentCollection = computed(() => (currentLevel.value ? findCollectionForLevel(currentLevel.value.id) : undefined));
  const searchItems = computed(() => (currentLevel.value ? getSearchItems(currentLevel.value) : []));
  const complete = computed(() => (currentLevel.value ? isLevelComplete(currentLevel.value, progress.value) : false));

  function findCollection(collectionId: string) {
    return findCollectionById(collectionId);
  }

  function levelsForCollection(collectionId: string): Level[] {
    const collection = findCollectionById(collectionId);
    return collection ? getLevelsInCollection(collection) : [];
  }

  function setLanguage(nextLanguage: LanguageCode): void {
    language.value = nextLanguage;
    window.localStorage.setItem(languageStorageKey, nextLanguage);
  }

  function openLevel(levelId: string): void {
    const level = findLevelById(levelId);
    currentLevel.value = level;
    progress.value = level ? buildInitialProgress(level) : {};
    lastTouchedItem.value = undefined;
  }

  function touchItem(item: SceneItem): void {
    lastTouchedItem.value = item;
    progress.value = markItemFound(progress.value, item);
  }

  function touchPoint(x: number, y: number): SceneItem | undefined {
    if (!currentLevel.value) {
      return undefined;
    }

    const item = findItemAtPoint(currentLevel.value, x, y);
    if (item) {
      touchItem(item);
    }

    return item;
  }

  return {
    collections,
    complete,
    currentCollection,
    currentLevel,
    language,
    lastTouchedItem,
    levels,
    progress,
    searchItems,
    findCollection,
    levelsForCollection,
    openLevel,
    setLanguage,
    touchItem,
    touchPoint,
  };
});
