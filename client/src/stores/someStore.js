// TODO: rename this store

import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

const useSomeStore = defineStore('SomeStore', () => {
  const pwaTitle = ref('AudioArchive (prototype)')
  const audios = ref([])

  const fetchAudios = async () => {
    const response = await axios.get('/audioarchive')
    audios.value = response.data
  }

  return { pwaTitle, fetchAudios, audios }
})

export default useSomeStore
