<template>
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
	background: hsl(211, 64%, 78%);
	background-image: linear-gradient(135deg, hsl(211, 64%, 78%), hsl(211, 64%, 68%));
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
}
.q-drawer {
	background: transparent !important;
	background-image: linear-gradient(
    to bottom,
    hsla(243, 56%, 54%, 50%),
    hsla(243, 56%, 64%, 50%),
    hsla(243, 56%, 54%, 50%)
  ) !important;
	backdrop-filter: blur(8px);
}
.text-shadow {
	text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);
}
.overflow-ellipse {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.q-item.q-router-link--active {
	color: white;
}
@media (max-width: 599px) {
  .q-scrollarea__content {
    justify-content: flex-end;
    display: flex;
    flex-direction: column;
  }
}
.title {
	position: absolute;
	top: -0.425em;
	left: -0.125em;
	opacity: 0.1;
	z-index: -1;
	font-size: 8em;
  font-family: 'OxygenLight';
	user-select: none;
}
.about-box {
  font-size: 1.25em;
  border-radius: 4px;
  box-shadow: 0 0 0 1px hsla(0, 0%, 100%, 1), 0 0 0 2px hsla(0, 0%, 0%, 0.5),
    0 0 8px black;
  background-image: radial-gradient(
      ellipse 100% 33% at bottom,
      hsla(0, 0%, 0%, 0.15),
      transparent
    ),
    radial-gradient(ellipse at bottom left, transparent 75%, hsla(0, 0%, 100%, 0.75)),
    radial-gradient(ellipse at bottom right, transparent 75%, hsla(0, 0%, 100%, 0.75)),
    linear-gradient(
      to bottom,
      hsla(0, 0%, 100%, 0.55),
      hsla(0, 0%, 100%, 0.6) 49%,
      hsla(0, 0%, 100%, 0.5) 51%
    );
  width: 90vw;
  backdrop-filter: blur(4px);
}
</style>
