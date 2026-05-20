import type { LanguageCode, SceneItem } from './levelLogic';
import { getAudioSource, getLabel } from './levelLogic';

const speechLanguage: Record<LanguageCode, string> = {
  pt: 'pt-PT',
  en: 'en-US',
  uk: 'uk-UA',
};

export async function speakItem(item: SceneItem, language: LanguageCode): Promise<void> {
  const source = getAudioSource(item, language);

  if (source.kind === 'file') {
    await playAudioFile(source.src);
    return;
  }

  speakWithBrowser(getLabel(item.label, language), language);
}

function playAudioFile(src: string): Promise<void> {
  const audio = new Audio(src);
  return audio.play();
}

function speakWithBrowser(text: string, language: LanguageCode): void {
  if (!('speechSynthesis' in window)) {
    return;
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = speechLanguage[language];
  utterance.rate = 0.85;
  window.speechSynthesis.speak(utterance);
}
