export type LanguageCode = 'pt' | 'en' | 'uk';

export type LocalizedText = Record<LanguageCode, string>;

export type LevelSource = 'built-in' | 'user' | 'ai';

export type SceneItemRole = 'search-target' | 'learning-only';

export type TargetArea = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type SceneItem = {
  id: string;
  role: SceneItemRole;
  label: LocalizedText;
  showLabelOnImage: boolean;
  targetArea: TargetArea;
  thumbnailArea?: TargetArea;
  thumbnailSrc?: string;
  audioSrc?: Partial<Record<LanguageCode, string>>;
};

export type Level = {
  id: string;
  title: LocalizedText;
  thumbnailSrc: string;
  imageSrc: string;
  source: LevelSource;
  items: SceneItem[];
};

export type FoundProgress = Record<string, boolean>;

export type AudioSource =
  | { kind: 'file'; src: string }
  | { kind: 'speech' };

export function getSearchItems(level: Level): SceneItem[] {
  return level.items.filter((item) => item.role === 'search-target');
}

export function buildInitialProgress(level: Level): FoundProgress {
  return Object.fromEntries(getSearchItems(level).map((item) => [item.id, false]));
}

export function markItemFound(progress: FoundProgress, item: SceneItem): FoundProgress {
  if (item.role !== 'search-target') {
    return { ...progress };
  }

  return {
    ...progress,
    [item.id]: true,
  };
}

export function isLevelComplete(level: Level, progress: FoundProgress): boolean {
  return getSearchItems(level).every((item) => progress[item.id] === true);
}

export function findItemAtPoint(level: Level, x: number, y: number): SceneItem | undefined {
  return level.items.find((item) => isPointInsideArea(item.targetArea, x, y));
}

export function isPointInsideArea(area: TargetArea, x: number, y: number): boolean {
  return x >= area.x && x <= area.x + area.width && y >= area.y && y <= area.y + area.height;
}

export function getAudioSource(item: SceneItem, language: LanguageCode): AudioSource {
  const src = item.audioSrc?.[language];
  return src ? { kind: 'file', src } : { kind: 'speech' };
}

export function getLabel(text: LocalizedText, language: LanguageCode): string {
  return text[language] || text.pt;
}

export function getThumbnailArea(item: SceneItem): TargetArea {
  return item.thumbnailArea ?? item.targetArea;
}

export function getThumbnailCropStyle(imageSrc: string, area: TargetArea): Record<string, string> {
  return {
    backgroundImage: `url(${imageSrc})`,
    backgroundSize: `${formatPercent(10000 / area.width)} ${formatPercent(10000 / area.height)}`,
    backgroundPosition: `${formatPercent(toBackgroundPosition(area.x, area.width))} ${formatPercent(toBackgroundPosition(area.y, area.height))}`,
  };
}

function toBackgroundPosition(start: number, size: number): number {
  const remaining = 100 - size;
  return remaining <= 0 ? 0 : (start / remaining) * 100;
}

function formatPercent(value: number): string {
  const rounded = Number(value.toFixed(4));
  return `${rounded}%`;
}
