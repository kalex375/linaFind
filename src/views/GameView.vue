<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import CompleteBanner from '../components/CompleteBanner.vue';
import LanguageSwitcher from '../components/LanguageSwitcher.vue';
import SceneCanvas from '../components/SceneCanvas.vue';
import SearchPanel from '../components/SearchPanel.vue';
import { speakItem } from '../domain/audio';
import type { SceneItem } from '../domain/levelLogic';
import { getLabel } from '../domain/levelLogic';
import { useGameStore } from '../stores/gameStore';

const route = useRoute();
const router = useRouter();
const game = useGameStore();
const completeBannerDismissed = ref(false);

watch(
  () => String(route.params.id ?? ''),
  (id) => {
    if (id && game.currentLevel?.id !== id) {
      game.openLevel(id);
      completeBannerDismissed.value = false;
    }
  },
  { immediate: true },
);

const title = computed(() => (game.currentLevel ? getLabel(game.currentLevel.title, game.language) : ''));

async function handleItem(item: SceneItem): Promise<void> {
  game.touchItem(item);
  await speakItem(item, game.language).catch(() => undefined);
}
</script>

<template>
  <main v-if="game.currentLevel" class="game-screen">
    <header class="game-toolbar">
      <button type="button" class="back-button" aria-label="Back" @click="router.push('/')">
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <path d="M15 6 9 12l6 6" />
        </svg>
      </button>
      <h1>{{ title }}</h1>
      <LanguageSwitcher :language="game.language" @change="game.setLanguage" />
    </header>

    <section class="game-layout">
      <SceneCanvas
        :level="game.currentLevel"
        :language="game.language"
        :last-touched-item="game.lastTouchedItem"
        @item="handleItem"
      />
      <div class="game-side">
        <SearchPanel
          :level="game.currentLevel"
          :items="game.searchItems"
          :found="game.progress"
          :language="game.language"
        />
      </div>
    </section>

    <CompleteBanner
      v-if="game.complete && !completeBannerDismissed"
      :language="game.language"
      @dismiss="completeBannerDismissed = true"
    />
  </main>

  <main v-else class="home-screen">
    <h1>Level not found</h1>
    <button type="button" class="primary-button" @click="router.push('/')">Home</button>
  </main>
</template>
