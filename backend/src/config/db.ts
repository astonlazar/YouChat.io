import mongoose from "mongoose";
import dotenv from 'dotenv'

const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI || '')
    .then(() => console.log('DB connected successfully'))
  } catch(error) {
    console.warn(`Error connecting to DB - ${error}`)
    process.exit(1)
  }
}

export default connectDB