import express from 'express'
import cookieParser from 'cookie-parser'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

import authRouter from './routes/auth.route.js'
import postRouter from './routes/post.route.js'
import adminRouter from './routes/admin.route.js'

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/posts', postRouter)
// app.use('/api/v1/admin/posts', adminRouter)
app.use('/api/v1/admin', adminRouter)

export default app