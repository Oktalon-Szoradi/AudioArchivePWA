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
          :class="this.$route.fullPath === '/' ? 'active' : ''"
        >
          <q-item-section class="text-shadow">Home</q-item-section>
        </q-item>

        <q-item
          to="/shelf"
          clickable
          v-ripple
          :class="this.$route.fullPath === '/shelf' ? 'active' : ''"
        >
          <q-item-section class="text-shadow">Shelf</q-item-section>
        </q-item>

        <q-item
          to="/settings"
          clickable
          v-ripple
          :class="this.$route.fullPath === '/settings' ? 'active' : ''"
        >
          <q-item-section class="text-shadow">Settings</q-item-section>
        </q-item>

        <q-item
          to="/about"
          clickable
          v-ripple
          :class="this.$route.fullPath === '/about' ? 'active' : ''"
        >
          <q-item-section class="text-shadow">About</q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<script setup></script>

<style scoped>
.active {
  background-image: linear-gradient(
    to bottom,
    hsla(0, 0%, 100%, 25%),
    hsla(0, 0%, 100%, 10%),
    hsla(0, 0%, 100%, 10%),
    hsla(0, 0%, 100%, 25%)
  );
  font-weight: bold;
}
</style>
