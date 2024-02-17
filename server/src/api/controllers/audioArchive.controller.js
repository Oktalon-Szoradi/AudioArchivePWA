import fs from 'fs'
import { promisify } from 'util'
import * as model from '../models/audioArchive.model.js'

const readFile = promisify(fs.readFile)

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
  const { name, description, timestamp, rating } = req.body
  const audioFile = req.file

  const missingName = isNullOrWhitespace(name)
  const missingTimestamp = isNullOrWhitespace(timestamp)
  const missingAudio = !audioFile

  if (missingAudio) {
    return res.status(400).json('No audio provided (it must be a file)')
  }

  if (missingName || missingTimestamp) {
    let whatIsMissing = 'Could not add audio due to missing parameters:'
    if (missingName) whatIsMissing += ' name'
    if (missingTimestamp) whatIsMissing += ' timestamp'
    // if (missingAudio) whatIsMissing += ' audio'
    return res.status(400).json(whatIsMissing)
  }

  const audio = await readFile(audioFile.path)

  const addedAudio = await model.addAudioDb(
    name,
    description,
    timestamp,
    rating ?? 0,
    audio
  )

  fs.unlink(audioFile.path, err => {
    if (err) console.error(err)
  })

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
