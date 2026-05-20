<script setup lang="ts">
import type { FoundProgress, LanguageCode, Level, SceneItem } from '../domain/levelLogic';
import { getLabel } from '../domain/levelLogic';
import ItemThumbnail from './ItemThumbnail.vue';

defineProps<{
  found: FoundProgress;
  items: SceneItem[];
  language: LanguageCode;
  level: Level;
}>();
</script>

<template>
  <aside class="search-panel" aria-label="Items to find">
    <h2>{{ language === 'pt' ? 'Encontra' : language === 'en' ? 'Find' : 'Знайди' }}</h2>
    <div class="search-list">
      <div v-for="item in items" :key="item.id" class="search-item" :class="{ found: found[item.id] }">
        <ItemThumbnail :level="level" :item="item" />
        <span>{{ getLabel(item.label, language) }}</span>
      </div>
    </div>
  </aside>
</template>
