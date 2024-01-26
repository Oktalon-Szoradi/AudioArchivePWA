// TODO: rename this store

import { defineStore } from 'pinia'
import { ref } from 'vue'

const useSomeStore = defineStore('SomeStore', () => {
  const pwaTitle = ref('AudioArchive (prototype)')
  const audios = ref([])

  const fetchAudios = async () => {
    audios.value = [
      {
        aid: 0,
        name: 'birds',
        description: 'birds chirping',
        timestamp: '2023-11-12T06:16:21Z',
        rating: 5,
        audio: ['binary data']
      },

      {
        aid: 1,
        name: 'drink',
        description: 'me drinking a can of soda',
        timestamp: '2023-11-13T17:16:05Z',
        rating: 4,
        audio: ['binary data']
      },

      {
        aid: 2,
        name: 'laughing',
        description: 'Syyab laughing',
        timestamp: '2023-11-14T10:25:43Z',
        rating: 5,
        audio: ['binary data']
      },

      {
        aid: 3,
        name: 'television',
        description: 'CRT turning off',
        timestamp: '2023-11-15T21:02:21Z',
        rating: 4,
        audio: ['binary data']
      },

      {
        aid: 4,
        name: 'dishwasher',
        description: 'the dishwasher starting',
        timestamp: '2023-11-16T18:16:21Z',
        rating: 3,
        audio: ['binary data']
      },

      {
        aid: 5,
        name: 'song',
        description: 'me singing',
        timestamp: '2023-11-17T00:18:21Z',
        rating: 1,
        audio: ['binary data']
      }
    ]
  }

  return { pwaTitle, fetchAudios, audios }
})

export default useSomeStore
