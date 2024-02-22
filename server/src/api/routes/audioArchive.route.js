import express from 'express'
import asyncHandler from 'express-async-handler'
import multer from 'multer'
import * as controller from '../controllers/audioArchive.controller.js'

const router = express.Router()

const storageEngine = multer.diskStorage({
  destination: 'uploads/',
  filename (req, file, cb) {
    cb(null, `${Date.now()}--${file.originalname}`)
  }
})
const upload = multer({
  storage: storageEngine
})

router.get('/', asyncHandler(controller.getAudios))
router.get('/:aid', asyncHandler(controller.getAudio))
router.post('/', upload.single('audio'), asyncHandler(controller.addAudio))
router.patch('/:aid', asyncHandler(controller.updateAudioMetadata))
router.delete('/:aid', asyncHandler(controller.deleteAudio))

export default router
