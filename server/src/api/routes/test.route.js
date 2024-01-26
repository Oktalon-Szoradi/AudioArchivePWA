import express from 'express';
import asyncHandler from 'express-async-handler';
import { getTest, getMovies } from '../controllers/test.controller.js';

const router = express.Router();

// Here come your routes
router.get('/test', asyncHandler(getTest));
router.get('/movies', asyncHandler(getMovies));

export default router;
