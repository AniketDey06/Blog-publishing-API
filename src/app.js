import express from 'express'
import cookieParser from 'cookie-parser'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

import authRouter from './routes/auth.route.js'
import postRouter from './routes/post.route.js'

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/post', postRouter)

export default app