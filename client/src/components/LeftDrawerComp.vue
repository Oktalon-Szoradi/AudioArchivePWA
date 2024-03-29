<template>
  <q-drawer
    class="text-white"
    side="left"
    elevated
    overlay
    behavior="desktop"
    :width="250"
    :breakpoint="500"
  >
    <q-scroll-area class="fit">
      <q-list padding class="menu-list">
        <q-item
          to="/"
          clickable
          v-ripple
          :class="$route.fullPath === '/' ? 'active' : ''"
        >
          <q-item-section class="text-shadow">Home</q-item-section>
        </q-item>

        <q-item
          to="/shelf"
          clickable
          v-ripple
          :class="$route.fullPath === '/shelf' ? 'active' : ''"
        >
          <q-item-section class="text-shadow">Shelf</q-item-section>
        </q-item>

        <q-item
          to="/settings"
          clickable
          v-ripple
          :class="$route.fullPath === '/settings' ? 'active' : ''"
        >
          <q-item-section class="text-shadow">Settings</q-item-section>
        </q-item>

        <q-item
          to="/about"
          clickable
          v-ripple
          :class="$route.fullPath === '/about' ? 'active' : ''"
        >
          <q-item-section class="text-shadow">About</q-item-section>
        </q-item>

        <q-item
          v-if="props.update"
          @click="$emit('updateAndReload')"
          clickable
          v-ripple
          style="
            background: linear-gradient(
              to right,
              hsla(0deg 100% 50% / 25%),
              hsla(0deg 100% 50% / 5%)
            );
          "
        >
          <q-item-section class="text-shadow">Update available! Tap here!</q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<script setup>
const props = defineProps({
  update: { type: Boolean, default: false }
})

defineEmits(['updateAndReload'])
</script>

<style scoped>
.active {
  background-image: linear-gradient(
    to bottom,
    hsl(0deg 0% 100% / 25%),
    hsl(0deg 0% 100% / 10%),
    hsl(0deg 0% 100% / 10%),
    hsl(0deg 0% 100% / 25%)
  );
  font-weight: bold;
}
</style>
