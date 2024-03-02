<template>
  <div>
    <div class="q-mt-xl row justify-center">
      <div
        class="microphone-bubble"
        :class="mediaRecorderState !== 'inactive' ? 'microphone-bubble-active' : ''"
        @click="toggleRecording()"
      >
        <q-icon name="mic" color="white" size="5em" />
      </div>
    </div>
    {{ mediaRecorderState }}
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { formatISO9075 } from 'date-fns'

const emit = defineEmits(['recordingComplete'])

const mediaRecorderState = ref('inactive')

let mediaRecorder
let chunks = []

let blob
let url = ''
let mimeType

let name
let timeStamp

if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices
    .getUserMedia({
      audio: true
    })
    .then(stream => {
      mediaRecorder = new MediaRecorder(stream)

      mediaRecorder.ondataavailable = e => {
        chunks.push(e.data)
        console.log(e)
      }

      mediaRecorder.onstop = async () => {
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
    })
    .catch(error => {
      console.error('navigator.mediaDevices ran into an error:', error)
    })
}

const toggleRecording = () => {
  if (mediaRecorder.state === 'inactive') {
    mediaRecorder.start()
    console.info('Recording started')
  } else {
    mediaRecorder.stop()
    console.info('Recording stopped')
  }
  mediaRecorderState.value = mediaRecorder.state
}
</script>

<style scoped>
.microphone-bubble {
  position: relative;
  margin: 1em;
  border-radius: 50%;
  box-shadow: 0 0 8px 0 hsla(0, 0%, 33%), 0 0 32px 0 hsla(243, 56%, 50%), 0 0 16px inset hsla(0, 0%, 100%, 100%);
  background-image: radial-gradient(circle at 50% 90%, hsl(243, 56%, 60%), hsl(243, 56%, 40%));
  width: 10em;
  height: 10em;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.microphone-bubble::after {
  position: absolute;
  top: 0;
  left: 15%;
  border-radius: 50%;
  background-image: radial-gradient(circle at 50% 100%, hsla(0, 0%, 100%, 0%), hsla(0, 0%, 100%, 75%));
  width: 70%;
  height: 50%;
  content: '';
}
.microphone-bubble > * {
  opacity: 75%;
}
.microphone-bubble:hover {
  box-shadow: 0 0 8px 0 hsla(0, 0%, 33%), 0 0 32px 0 hsla(243, 56%, 60%), 0 0 16px inset hsla(0, 0%, 100%, 100%);
  background-image: radial-gradient(circle at 50% 90%, hsl(243, 56%, 70%), hsl(243, 56%, 50%));
}
.microphone-bubble-active,
.microphone-bubble-active:hover,
.microphone-bubble:active {
  box-shadow: 0 0 8px 0 hsla(0, 0%, 33%), 0 0 32px 0 hsla(243, 56%, 40%), 0 0 16px inset hsla(0, 0%, 100%, 100%);
  background-image: radial-gradient(circle at 50% 90%, hsl(243, 56%, 50%), hsl(243, 56%, 30%));
}
</style>
