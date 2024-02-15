import express from 'express'
import asyncHandler from 'express-async-handler'
import * as controller from '../controllers/audioArchive.controller.js'

const router = express.Router()

router.get('/', asyncHandler(controller.getAudios))
router.get('/:id', asyncHandler(controller.getAudio))
router.post('/', asyncHandler(controller.addAudio))

export default router
