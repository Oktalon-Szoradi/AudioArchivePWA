<template>
  <q-header class="navHeader text-white" elevated height-hint="98">
    <q-toolbar>
      <q-btn dense flat round icon="r_menu" @click="$emit('toggleLeftDrawer')" />

      <q-toolbar-title>
        <q-avatar>
          <img src="@/assets/img/AudioArchive_Logo.svg" />
        </q-avatar>
        <span class="text-shadow q-ml-sm">{{ someStore.pwaTitle }}</span>
      </q-toolbar-title>
    </q-toolbar>

    <!-- <q-tabs align="left">
      <q-route-tab to="/" label="Home" />
      <q-route-tab to="/about" label="About" />
    </q-tabs> -->
  </q-header>
</template>

<script setup>
import useSomeStore from '@/stores/someStore.js'

const someStore = useSomeStore()

defineEmits(['toggleLeftDrawer'])
</script>

<style scoped>
.navHeader {
  background-color: transparent;
  background-image: linear-gradient(
    to right,
    hsla(243, 56%, 54%, 50%),
    hsla(243, 56%, 64%, 50%)
  );
  backdrop-filter: blur(8px);
}
</style>
