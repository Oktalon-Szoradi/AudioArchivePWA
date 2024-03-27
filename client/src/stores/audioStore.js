import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import { formatISO9075 } from 'date-fns'

const useAudioStore = defineStore('AudioStore', () => {
  const pwaTitle = ref('AudioArchive v0.2.2')
  const audios = ref([])

  const fetchAudios = async () => {
    const response = await axios.get('/audioarchive')
    audios.value = response.data
  }

  const fetchAudioFile = async (filename, aid) => {
    const response = await axios.get(
      `/audioarchive/audio/${filename}?aid=${aid}`,
      {
        responseType: 'blob'
      }
    )
    return response.data
  }

  const addAudio = async (
    name,
    description,
    rating,
    timestamp,
    audio,
    mimetype
  ) => {
    const audioFileExtension = mimetype.match(/\/(.*?);/)[1]
    const timestampAsISO = formatISO9075(timestamp)
    const timestampAsUnix = timestamp.getTime()

    const formData = new FormData()
    formData.append('name', name)
    formData.append('description', description)
    formData.append('rating', rating)
    formData.append('timestamp', timestampAsISO)
    formData.append('mimetype', mimetype)
    formData.append(
      'audio',
      audio,
      `${timestampAsUnix}--${name}.${audioFileExtension}`
    )

    await axios.post('/audioarchive', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    await fetchAudios()
  }

  const updateAudio = async newAudio => {
    await axios.patch(`/audioarchive/${newAudio.aid}`, newAudio)
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
    fetchAudioFile,
    addAudio,
    updateAudio,
    deleteAudio
  }
})

export default useAudioStore
