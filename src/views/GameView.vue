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
const showLabels = ref(false);

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
const showDebugAreas = computed(() => route.query.debug === 'areas');
const backTarget = computed(() => (game.currentCollection ? `/collection/${game.currentCollection.id}` : '/'));
const foundCount = computed(() => game.searchItems.filter((item) => game.progress[item.id]).length);

async function handleItem(item: SceneItem): Promise<void> {
  game.touchItem(item);
  await speakItem(item, game.language).catch(() => undefined);
}
</script>

<template>
  <main v-if="game.currentLevel" class="game-screen" :class="{ complete: game.complete }">
    <header class="game-toolbar">
      <button type="button" class="back-button" aria-label="Back" @click="router.push(backTarget)">
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <path d="M15 6 9 12l6 6" />
        </svg>
      </button>
      <h1>{{ title }}</h1>
      <div class="progress-badge" aria-live="polite">
        <span>{{ foundCount }}</span>
        <small>/ {{ game.searchItems.length }}</small>
      </div>
      <div class="toolbar-actions">
        <button
          type="button"
          class="icon-button label-toggle"
          :class="{ active: showLabels }"
          :aria-pressed="showLabels"
          :aria-label="showLabels ? 'Hide labels' : 'Show labels'"
          :title="showLabels ? 'Hide labels' : 'Show labels'"
          @click="showLabels = !showLabels"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24">
            <path d="M4 6h16" />
            <path d="M4 12h10" />
            <path d="M4 18h7" />
          </svg>
        </button>
        <LanguageSwitcher :language="game.language" @change="game.setLanguage" />
      </div>
    </header>

    <section class="game-layout">
      <div class="scene-shell">
        <SceneCanvas
          :level="game.currentLevel"
          :language="game.language"
          :last-touched-item="game.lastTouchedItem"
          :show-debug-areas="showDebugAreas"
          :show-labels="showLabels"
          @item="handleItem"
        />
      </div>
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
