<script setup lang="ts">
import { useRouter } from 'vue-router';
import LanguageSwitcher from '../components/LanguageSwitcher.vue';
import { getLabel } from '../domain/levelLogic';
import { useGameStore } from '../stores/gameStore';

const router = useRouter();
const game = useGameStore();

function openLevel(levelId: string): void {
  router.push(`/level/${levelId}`);
}
</script>

<template>
  <main class="home-screen">
    <header class="top-bar">
      <div>
        <p class="eyebrow">Lina Find</p>
        <h1>{{ game.language === 'pt' ? 'Escolhe uma imagem' : game.language === 'en' ? 'Choose a picture' : 'Обери картинку' }}</h1>
      </div>
      <LanguageSwitcher :language="game.language" @change="game.setLanguage" />
    </header>

    <section class="level-grid" aria-label="Levels">
      <button v-for="level in game.levels" :key="level.id" type="button" class="level-card" @click="openLevel(level.id)">
        <img :src="level.thumbnailSrc" :alt="getLabel(level.title, game.language)" />
        <span>{{ getLabel(level.title, game.language) }}</span>
      </button>
    </section>
  </main>
</template>
