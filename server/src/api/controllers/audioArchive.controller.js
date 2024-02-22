import fs from 'fs'
import * as model from '../models/audioArchive.model.js'

const isNullOrWhitespace = string => {
  string = toString(string)
  return !string || string.trim().length === 0
}

export const getAllAudioMetadata = async (req, res) => {
  const audios = await model.getAllAudioMetadataDb()
  return res.status(200).json(audios)
}

export const getAudioMetadata = async (req, res) => {
  const { aid } = req.params
  const audio = await model.getAudioMetadataDb(aid)
  if (!audio) return res.status(404).json('Audio not found')
  return res.status(200).json(audio)
}

export const getAudioFile = async (req, res) => {
  const { filename } = req.params
  const { aid } = req.query
  const filepath = `uploads/${filename}`

  let audioMetadata
  let fileExtension

  if (aid) {
    audioMetadata = await model.getAudioMetadataDb(aid)
    fileExtension = audioMetadata.mimetype.match(/\/(.*?);/)[1]
  }

  if (!fileExtension) {
    try {
      const fileExtensionRegExp = filepath.match(/\.([^.]+)$/)
      fileExtension = fileExtensionRegExp[1]
    } catch (error) {
      fileExtension = '*'
      console.warn(
        'getAudioFile Warning: Could not detect file extension for the purpose of the Content-Type HTTP Header. Using wildcard/generic MIME type (*).'
      )
    }
  }

  fs.readFile(filepath, async (err, data) => {
    if (err) return res.status(404).json('Audio file not found')

    res.setHeader('Content-Type', `audio/${fileExtension}`)
    res.send(data)
  })
}

export const addAudio = async (req, res) => {
  const {
    name,
    description,
    timestamp,
    rating,
    mimetype
  } = req.body
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

  const audioFileName = audioFile.originalname

  const addedAudio = await model.addAudioDb(
    name,
    description,
    timestamp,
    rating ?? 0,
    audioFileName,
    mimetype
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
