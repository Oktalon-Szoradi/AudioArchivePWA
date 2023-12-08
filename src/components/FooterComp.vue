<template>
  <q-footer elevated class="navFooter text-white">
    <q-toolbar>
      <q-btn dense flat round icon="r_menu" @click="$emit('toggleLeftDrawer')" />

      <q-toolbar-title>
        <q-avatar>
          <img src="/AudioArchive_Logo.svg" />
        </q-avatar>
        <span class="text-shadow q-ml-sm">{{ someStore.pwaTitle }}</span>
      </q-toolbar-title>
    </q-toolbar>
  </q-footer>
</template>

<script setup>
import useSomeStore from '@/stores/someStore.js'

const someStore = useSomeStore()

defineEmits(['toggleLeftDrawer'])
</script>

<style scoped>
.navFooter {
  background-color: transparent;
  background-image: linear-gradient(
      to bottom,
      hsla(0, 0%, 100%, 25%),
      hsla(0, 0%, 100%, 0%) 25%
    ),
    linear-gradient(to right, hsla(243, 56%, 54%, 50%), hsla(243, 56%, 64%, 50%));
  backdrop-filter: blur(8px);
}
</style>
