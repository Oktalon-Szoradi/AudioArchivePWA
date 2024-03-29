<template>
  <q-footer elevated class="nav-footer text-white">
    <q-toolbar>
      <q-btn dense flat round icon="r_menu" @click="$emit('toggleLeftDrawer')">
        <q-badge v-if="update" class="glossy fade-in" color="red" floating>!</q-badge>
      </q-btn>

      <q-toolbar-title>
        <q-avatar>
          <img src="/AudioArchive_Logo.svg" />
        </q-avatar>
        <span class="text-shadow q-ml-sm">{{ audioStore.pwaTitle }}</span>
      </q-toolbar-title>
    </q-toolbar>
  </q-footer>
</template>

<script setup>
import useaudioStore from '@/stores/audioStore.js'

const audioStore = useaudioStore()

const props = defineProps({
  update: { type: Boolean, default: false }
})

defineEmits(['toggleLeftDrawer'])
</script>

<style scoped>
.nav-footer {
  background-color: transparent;
  background-image: linear-gradient(
      to bottom,
      hsl(0deg 0% 100% / 25%),
      hsl(0deg 0% 100% / 0%) 25%
    ),
    linear-gradient(to right, hsl(243deg 56% 54% / 50%), hsl(243deg 56% 64% / 50%));
  backdrop-filter: blur(8px);
}
</style>
