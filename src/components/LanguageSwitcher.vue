<script setup lang="ts">
import type { LanguageCode } from '../domain/levelLogic';

defineProps<{
  language: LanguageCode;
}>();

const emit = defineEmits<{
  change: [language: LanguageCode];
}>();

const languages: Array<{ code: LanguageCode; label: string; flagSrc: string }> = [
  { code: 'pt', label: 'Português', flagSrc: '/assets/flags/pt.svg' },
  { code: 'en', label: 'English', flagSrc: '/assets/flags/gb.svg' },
  { code: 'uk', label: 'Українська', flagSrc: '/assets/flags/ua.svg' },
];
</script>

<template>
  <div class="language-switcher" aria-label="Language">
    <button
      v-for="option in languages"
      :key="option.code"
      type="button"
      class="language-button"
      :class="{ active: option.code === language }"
      :aria-label="option.label"
      :title="option.label"
      @click="emit('change', option.code)"
    >
      <img class="language-flag" :src="option.flagSrc" alt="" aria-hidden="true" />
    </button>
  </div>
</template>
