import mongoose from 'mongoose'

let cachedMongoose

const connectDB = async () => {
  try {
    if (cachedMongoose) {
      console.warn('reusing existing connection')
      return cachedMongoose
    }
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    })
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
    cachedMongoose = conn
    return cachedMongoose
  } catch (error) {
    console.error(`Error: ${error.message}`.red.underline.bold)
    process.exit(1)
  }
}

export default connectDB
