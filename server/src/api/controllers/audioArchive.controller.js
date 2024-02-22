import * as model from '../models/audioArchive.model.js'

const isNullOrWhitespace = string => {
  string = toString(string)
  return !string || string.trim().length === 0
}

export const getAudios = async (req, res) => {
  const audios = await model.getAudiosDb()
  return res.status(200).json(audios)
}

export const getAudio = async (req, res) => {
  const { aid } = req.params
  const audio = await model.getAudioDb(aid)
  if (!audio) return res.status(404).json('Audio not found')
  return res.status(200).json(audio)
}

export const addAudio = async (req, res) => {
  const { name, description, timestamp, rating, audiomimetype } = req.body
  const audioFile = req.file

  const missingName = isNullOrWhitespace(name)
  const missingTimestamp = isNullOrWhitespace(timestamp)
  const missingAudio = !audioFile

  if (missingName || missingTimestamp || missingAudio) {
    let whatIsMissing = 'Could not add audio because the following are missing:'
    if (missingName) whatIsMissing += ' name (parameter)'
    if (missingTimestamp) whatIsMissing += ' timestamp (parameter)'
    if (missingAudio) whatIsMissing += ' audio (file)'
    return res.status(400).json(whatIsMissing)
  }

  const audioPath = audioFile.path

  const addedAudio = await model.addAudioDb(
    name,
    description,
    timestamp,
    rating ?? 0,
    audioPath,
    audiomimetype
  )

  return res.status(201).json(addedAudio)
}

export const updateAudioMetadata = async (req, res) => {
  const { aid } = req.params
  const { name, description, rating } = req.body

  if (
    isNullOrWhitespace(name) &&
    isNullOrWhitespace(description) &&
    isNullOrWhitespace(rating)
  ) {
    return res.status(400).json('No metadata provided to update')
  }

  const updatedAudio = await model.updateAudioMetadataDb(
    aid,
    name,
    description,
    rating
  )
  if (!updatedAudio) return res.status(404).json('Audio not found')
  return res.status(200).json(updatedAudio)
}

export const deleteAudio = async (req, res) => {
  const { aid } = req.params
  const deletedAudio = await model.deleteAudioDb(aid)
  if (!deletedAudio) return res.status(404).json('Audio not found')
  return res.status(200).json(deletedAudio)
}
