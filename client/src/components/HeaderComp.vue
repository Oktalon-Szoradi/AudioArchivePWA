<template>
  <q-header class="nav-header text-white" elevated height-hint="98">
    <q-toolbar>
      <!-- <q-btn dense flat round icon="r_menu" @click="$emit('toggleLeftDrawer')" /> -->

      <q-toolbar-title>
        <q-avatar>
          <img src="/AudioArchive_Logo.svg" />
        </q-avatar>
        <span class="text-shadow q-ml-sm">{{ audioStore.pwaTitle }}</span>
      </q-toolbar-title>
    </q-toolbar>

    <q-tabs align="left">
      <q-route-tab to="/" label="Home" />
      <q-route-tab to="/shelf" label="Shelf" />
      <q-route-tab to="/settings" label="Settings" />
      <q-route-tab to="/about" label="About" />
    </q-tabs>
  </q-header>
</template>

<script setup>
import useaudioStore from '@/stores/audioStore.js'

const audioStore = useaudioStore()

defineEmits(['toggleLeftDrawer'])
</script>

<style scoped>
.nav-header {
  background-color: transparent;
  background-image: linear-gradient(to bottom, transparent 80%, hsl(0deg 0% 100% / 17.5%)),
    linear-gradient(to right, hsl(243deg 56% 54% / 50%), hsl(243deg 56% 64% / 50%));
  backdrop-filter: blur(8px);
}
</style>
