import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import linkRoutes from './routes/linkRoutes.js'
import postRoutes from './routes/postRoutes.js'
import sellerpostRoutes from './routes/sellerpostRoutes.js'
import uPostsRoutes from './routes/uPostsRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import passwordRouter from './routes/passwordRoutes.js';
import fileUploadRoutes from './routes/fileUploadRoutes.js'
import lRoutes from './routes/lRoutes.js'
import metadata from './routes/metadataRoutes.js'
import cors from 'cors'
dotenv.config()

connectDB()

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
app.use(cors());
app.use(express.json())

app.use('/api/products', productRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/seller/posts',sellerpostRoutes)
app.use('/api/blogs',uPostsRoutes)
app.use('/api/links',linkRoutes)
app.use('/api/l',lRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/fileupload', fileUploadRoutes)
app.use('/api/metadata',metadata)
app.use('/api/password', passwordRouter);
app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)
