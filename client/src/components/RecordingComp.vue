<template>
  <div>
    <div class="q-mt-xl row justify-center">
      <!-- :class="mediaRecorderState !== 'inactive' ? 'microphone-bubble-active' : ''" -->
      <div class="microphone-bubble" @click="enabled = !enabled">
        <q-icon :name="enabled ? 'stop' : 'mic'" color="white" size="5em" />
      </div>
    </div>
    <div v-show="enabled" class="recording">
      <AVMedia :media="stream" type="wform" line-color="#7BADE2" />
      <p>{{ stopWatchStore.time }}</p>
    </div>
  </div>
</template>

<script setup>
import { watch } from 'vue'
import { AVMedia } from 'vue-audio-visual'
import { useUserMedia } from '@vueuse/core'
import { formatISO9075 } from 'date-fns'
import useStopWatchStore from '@/stores/stopWatchStore.js'

const emit = defineEmits(['recordingComplete'])
const { stream, enabled } = useUserMedia({ constraints: { audio: true } })
const stopWatchStore = useStopWatchStore()

let mediaRecorder
let chunks = []

let blob
let url = ''
let mimeType

let name
let timeStamp

watch(enabled, value => {
  if (!value) {
    mediaRecorder.stop()
  }
})

watch(stream, currentStream => {
  if (currentStream) {
    stopWatchStore.start()
    mediaRecorder = new MediaRecorder(currentStream)

    mediaRecorder.ondataavailable = e => {
      chunks.push(e.data)
    }

    mediaRecorder.onstop = () => {
      stopWatchStore.stop()

      mimeType = mediaRecorder.mimeType || 'audio/ogg; codecs=opus'

      timeStamp = new Date()
      name = `Recording on ${formatISO9075(timeStamp)}`

      blob = new Blob(chunks, { type: mimeType })
      chunks = []
      url = window.URL.createObjectURL(blob)

      emit('recordingComplete', {
        url,
        name,
        timeStamp,
        blob,
        mimeType
      })
    }
    mediaRecorder.start()
  }
})
</script>

<style scoped>
.microphone-bubble {
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  margin: 1em;
  border-radius: 50%;
  box-shadow: 0 0 8px 0 hsl(0deg 0% 33%), 0 0 32px 0 hsl(243deg 56% 50%), 0 0 16px inset hsl(0deg 0% 100% / 100%);
  background-image: radial-gradient(circle at 50% 90%, hsl(243deg 56% 60%), hsl(243deg 56% 40%));
  cursor: pointer;
  width: 10em;
  height: 10em;
}

.microphone-bubble::after {
  position: absolute;
  top: 0;
  left: 15%;
  border-radius: 50%;
  background-image: radial-gradient(circle at 50% 100%, hsl(0deg 0% 100% / 0%), hsl(0deg 0% 100% / 75%));
  width: 70%;
  height: 50%;
  content: '';
}

.microphone-bubble > * {
  opacity: 0.75;
}

.microphone-bubble:hover {
  box-shadow: 0 0 8px 0 hsl(0deg 0% 33%), 0 0 32px 0 hsl(243deg 56% 60%), 0 0 16px inset hsl(0deg 0% 100% / 100%);
  background-image: radial-gradient(circle at 50% 90%, hsl(243deg 56% 70%), hsl(243deg 56% 50%));
}

.microphone-bubble-active,
.microphone-bubble-active:hover,
.microphone-bubble:active {
  box-shadow: 0 0 8px 0 hsl(0deg 0% 33%), 0 0 32px 0 hsl(243deg 56% 40%), 0 0 16px inset hsl(0deg 0% 100% / 100%);
  background-image: radial-gradient(circle at 50% 90%, hsl(243deg 56% 50%), hsl(243deg 56% 30%));
}

.recording {
  border-radius: 4px;
  box-shadow: inset 0 0 0 1px hsl(0deg 0% 0% / 40%), inset 0 0 0 2px hsl(0deg 0% 100% / 25%);
  background: linear-gradient(to bottom, #333, black);
  padding: 8px;
  color: #7bade2;
  font-family: StopWatch;
  font-size: 1.25em;
}
</style>
