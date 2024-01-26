import * as model from '../models/audioArchive.model.js'

export const getAudios = async (req, res) => {
  const audios = await model.getAudiosDb()
  return res.status(200).json(audios)
}
