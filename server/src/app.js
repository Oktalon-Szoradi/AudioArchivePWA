import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import path from 'path'
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js'
import { mebibytesToBytes } from './middleware/utils.js'
import audioArchiveRoute from './api/routes/audioArchive.route.js'

dotenv.config()

const dirname = path.resolve()

const app = express()

app.use(morgan('dev'))
app.use(express.static(path.join(dirname, '/public')))
app.use(express.json({ limit: mebibytesToBytes(32) }))

app.use('/audioarchive', audioArchiveRoute)
app.use(errorHandler)
app.use(notFoundHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`server running on Port ${PORT}`))
