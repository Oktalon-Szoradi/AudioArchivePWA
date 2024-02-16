import express from 'express'
import asyncHandler from 'express-async-handler'
import * as controller from '../controllers/audioArchive.controller.js'

const router = express.Router()

router.get('/', asyncHandler(controller.getAudios))
router.get('/:aid', asyncHandler(controller.getAudio))
router.post('/', asyncHandler(controller.addAudio))
router.patch('/:aid', asyncHandler(controller.updateAudioMetadata))
router.delete('/:aid', asyncHandler(controller.deleteAudio))

export default router
