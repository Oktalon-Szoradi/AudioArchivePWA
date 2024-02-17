import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

const useAudioStore = defineStore('AudioStore', () => {
  const pwaTitle = ref('AudioArchive (prototype)')
  const audios = ref([])

  const fetchAudios = async () => {
    const response = await axios.get('/audioarchive')
    audios.value = response.data
  }

  const addAudio = async (name, description, rating, timestamp, audio) => {
    const formData = new FormData()
    formData.append('name', name)
    formData.append('description', description)
    formData.append('rating', rating)
    formData.append('timestamp', timestamp.toISOString())
    formData.append('audio', audio, name)

    await axios.post('/audioarchive', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    await fetchAudios()
  }

  const deleteAudio = async id => {
    await axios.delete(`/audioarchive/${id}`)
    await fetchAudios()
  }

  return {
    pwaTitle,
    audios,
    fetchAudios,
    addAudio,
    deleteAudio
  }
})

export default useAudioStore
