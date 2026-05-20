<script setup lang="ts">
import type { LanguageCode } from '../domain/levelLogic';

defineProps<{
  language: LanguageCode;
}>();

const emit = defineEmits<{
  dismiss: [];
}>();
</script>

<template>
  <button type="button" class="complete-banner" role="status" @click="emit('dismiss')">
    {{ language === 'pt' ? 'Muito bem!' : language === 'en' ? 'Well done!' : 'Чудово!' }}
  </button>
</template>
