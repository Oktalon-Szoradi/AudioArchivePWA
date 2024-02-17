import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

const useAudioStore = defineStore('AudioStore', () => {
  const pwaTitle = ref('AudioArchive (prototype)')
  const audios = ref([])

  const blobToBase64 = async blob => {
    return new Promise((resolve, reject) => {
      const reader = new window.FileReader()
      reader.onload = () => resolve(reader.result)
      reader.onerror = error => reject(error)
      reader.readAsDataURL(blob)
    })
  }

  const fetchAudios = async () => {
    const response = await axios.get('/audioarchive')
    audios.value = response.data
  }

  const addAudio = async audio => {
    const response = await axios.post('/audioarchive', audio)
    audios.value.push(response.data)
  }

  return { pwaTitle, audios, blobToBase64, fetchAudios, addAudio }
})

export default useAudioStore
