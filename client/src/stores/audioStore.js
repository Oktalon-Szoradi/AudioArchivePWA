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
    await axios.post('/audioarchive', audio)
    await fetchAudios()
  }

  const deleteAudio = async id => {
    await axios.delete(`/audioarchive/${id}`)
    await fetchAudios()
  }

  return {
    pwaTitle,
    audios,
    blobToBase64,
    fetchAudios,
    addAudio,
    deleteAudio
  }
})

export default useAudioStore
