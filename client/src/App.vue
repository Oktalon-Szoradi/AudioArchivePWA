<template>
  <BackgroundComp />

  <q-layout view="hHh lpR fFf">
    <HeaderComp
      @updateAndReload="updateAndReload"
      v-if="!$q.screen.lt.sm"
      :update="update"
    />

    <LeftDrawerComp
      @updateAndReload="updateAndReload"
      v-model="leftDrawerOpen"
      :update="update"
    />

    <q-page-container>
      <q-page class="q-pa-md row justify-center">
        <RouterView />
      </q-page>
    </q-page-container>

    <FooterComp
      @toggleLeftDrawer="toggleLeftDrawer"
      v-if="$q.screen.lt.sm"
      :update="update"
    />
  </q-layout>
</template>

<script setup>
import BackgroundComp from './components/BackgroundComp.vue'
import HeaderComp from '@/components/HeaderComp.vue'
import LeftDrawerComp from '@/components/LeftDrawerComp.vue'
import FooterComp from '@/components/FooterComp.vue'
import { ref, onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useQuasar } from 'quasar'
import { onlineTest } from '@/utils/onlineTest.js'
import useAudioStore from '@/stores/audioStore.js'

const $q = useQuasar()

const leftDrawerOpen = ref(false)
const toggleLeftDrawer = () => (leftDrawerOpen.value = !leftDrawerOpen.value)

const audioStore = useAudioStore()
const update = ref(false)

const updateAndReload = async () => {
  const registration = await navigator.serviceWorker.getRegistration()
  if (registration) registration.waiting?.postMessage({ type: 'SKIP_WAITING' })
  window.location.reload()
}

onMounted(async () => {
  window.addEventListener('resize', () => {
    if (!$q.screen.lt.sm) leftDrawerOpen.value = false
  })

  window.addEventListener('online', () => (audioStore.isOnline = true))
  window.addEventListener('offline', () => (audioStore.isOnline = false))
  audioStore.isOnline = await onlineTest()

  const registration = await navigator.serviceWorker.getRegistration()
  if (!registration) {
    console.log('registration failed!')
    return
  }
  registration.addEventListener('updatefound', () => (update.value = true))
  if (registration.waiting) update.value = true
})
</script>

<style>
body {
  background: hsl(211deg 64% 78%);
  background-image: linear-gradient(135deg, hsl(211deg 64% 78%), hsl(211deg 64% 68%));
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

@keyframes fade-in {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.fade-in {
  animation: fade-in 1s;
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
  position: fixed;
  top: 0;
  left: -0.075em;
  opacity: 0.05;
  z-index: -1;
  font-family: OxygenLight;
  font-size: 16em;
  user-select: none;
}

a[target='_blank']::after {
  content: url('@/assets/IconExternalLink.svg');
}

@media (width <= 800px) {
  .title {
    top: 0.45em;
    font-size: 8em;
  }
}

@media (width <= 599px) {
  /* NavSideBar Items Bottom-Aligned (For Mobile View) */
  /* stylelint-disable-next-line selector-class-pattern */
  .q-scrollarea__content {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  .title {
    top: -0.425em;
    font-size: 8em;
  }
}
</style>
