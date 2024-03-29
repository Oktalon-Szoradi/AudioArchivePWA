<template>
  <BackgroundComp />

  <q-layout view="hHh lpR fFf">
    <HeaderComp @toggleLeftDrawer="toggleLeftDrawer" v-if="!$q.screen.lt.sm" />

    <LeftDrawerComp v-model="leftDrawerOpen" />

    <q-page-container>
      <q-page class="q-pa-md row justify-center">
        <RouterView />
      </q-page>
    </q-page-container>

    <FooterComp @toggleLeftDrawer="toggleLeftDrawer" v-if="$q.screen.lt.sm" />
  </q-layout>
</template>

<script setup>
import BackgroundComp from './components/BackgroundComp.vue'
import HeaderComp from '@/components/HeaderComp.vue'
import LeftDrawerComp from '@/components/LeftDrawerComp.vue'
import FooterComp from '@/components/FooterComp.vue'
import { ref } from 'vue'
import { RouterView } from 'vue-router'

const leftDrawerOpen = ref(false)
const toggleLeftDrawer = () => (leftDrawerOpen.value = !leftDrawerOpen.value)
</script>

<style>
body {
  background: hsl(211deg 64% 78%);
  background-image: linear-gradient(135deg, hsl(211deg 64% 78%), hsl(211deg 64% 68%));
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  overflow-x: hidden;
}

.q-card {
  backdrop-filter: blur(4px);
  background-color: hsla(211deg 64% 95% / 75%);
}

.q-drawer {
  background: transparent !important;
  background-image: linear-gradient(
    to bottom,
    hsl(243deg 56% 54% / 50%),
    hsl(243deg 56% 64% / 50%),
    hsl(243deg 56% 54% / 50%)
  ) !important;
  backdrop-filter: blur(8px);
}

/* stylelint-disable-next-line selector-class-pattern */
.q-item.q-router-link--active {
  color: white;
}

.text-shadow {
  text-shadow: 2px 2px 2px rgb(0 0 0 / 25%);
}

.overflow-ellipse {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.title {
  position: absolute;
  top: -0.425em;
  left: -0.075em;
  opacity: 0.05;
  z-index: -1;
  font-family: OxygenLight;
  font-size: 16em;
  user-select: none;
}

a[target='_blank']::after {
  content: url('@/assets/external\ link.svg');
}

/* NavSideBar Items Bottom-Aligned (For Mobile View) */
@media (width <= 599px) {
  /* stylelint-disable-next-line selector-class-pattern */
  .q-scrollarea__content {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
}

@media (width <= 800px) {
  .title {
    font-size: 8em;
  }
}
</style>
