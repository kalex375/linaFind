<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import LanguageSwitcher from '../components/LanguageSwitcher.vue';
import { resolveAssetPath } from '../domain/assets';
import { getLabel } from '../domain/levelLogic';
import { useGameStore } from '../stores/gameStore';

const route = useRoute();
const router = useRouter();
const game = useGameStore();

const collectionId = computed(() => String(route.params.id ?? ''));
const collection = computed(() => game.findCollection(collectionId.value));
const levels = computed(() => game.levelsForCollection(collectionId.value));

function openLevel(levelId: string): void {
  router.push(`/level/${levelId}`);
}
</script>

<template>
  <main v-if="collection" class="home-screen">
    <header class="top-bar">
      <div class="top-bar-title">
        <button type="button" class="back-button" aria-label="Back" @click="router.push('/')">
          <svg aria-hidden="true" viewBox="0 0 24 24">
            <path d="M15 6 9 12l6 6" />
          </svg>
        </button>
        <div>
          <p class="eyebrow">{{ getLabel(collection.title, game.language) }}</p>
          <h1>{{ game.language === 'pt' ? 'Escolhe uma imagem' : game.language === 'en' ? 'Choose a picture' : 'Обери картинку' }}</h1>
        </div>
      </div>
      <LanguageSwitcher :language="game.language" @change="game.setLanguage" />
    </header>

    <section class="level-grid" aria-label="Levels">
      <button v-for="level in levels" :key="level.id" type="button" class="level-card" @click="openLevel(level.id)">
        <img :src="resolveAssetPath(level.thumbnailSrc)" :alt="getLabel(level.title, game.language)" />
        <span>{{ getLabel(level.title, game.language) }}</span>
      </button>
    </section>
  </main>

  <main v-else class="home-screen">
    <h1>Collection not found</h1>
    <button type="button" class="primary-button" @click="router.push('/')">Home</button>
  </main>
</template>

<style scoped>
.top-bar-title {
  display: flex;
  align-items: center;
  gap: 12px;
}
</style>
