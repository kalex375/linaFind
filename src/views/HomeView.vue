<script setup lang="ts">
import { useRouter } from 'vue-router';
import LanguageSwitcher from '../components/LanguageSwitcher.vue';
import { resolveAssetPath } from '../domain/assets';
import { getLabel } from '../domain/levelLogic';
import { useGameStore } from '../stores/gameStore';

const router = useRouter();
const game = useGameStore();

function openCollection(collectionId: string): void {
  router.push(`/collection/${collectionId}`);
}
</script>

<template>
  <main class="home-screen">
    <header class="top-bar">
      <div>
        <p class="eyebrow">Lina Find</p>
        <h1>{{ game.language === 'pt' ? 'Escolhe uma coleção' : game.language === 'en' ? 'Choose a collection' : 'Обери колекцію' }}</h1>
      </div>
      <LanguageSwitcher :language="game.language" @change="game.setLanguage" />
    </header>

    <section class="level-grid" aria-label="Collections">
      <button v-for="collection in game.collections" :key="collection.id" type="button" class="level-card" @click="openCollection(collection.id)">
        <img :src="resolveAssetPath(collection.thumbnailSrc)" :alt="getLabel(collection.title, game.language)" />
        <span>{{ getLabel(collection.title, game.language) }}</span>
      </button>
    </section>
  </main>
</template>
