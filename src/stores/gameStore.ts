import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
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
  const searchItems = computed(() => (currentLevel.value ? getSearchItems(currentLevel.value) : []));
  const complete = computed(() => (currentLevel.value ? isLevelComplete(currentLevel.value, progress.value) : false));

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
    complete,
    currentLevel,
    language,
    lastTouchedItem,
    levels,
    progress,
    searchItems,
    openLevel,
    setLanguage,
    touchItem,
    touchPoint,
  };
});
