import mongoose from "mongoose";

let isConnected = false // tracks database connection

export const connectToDB = async () => {
    mongoose.set('strictQuery', true)

    if(isConnected) {
        console.log('MongoDB is already connected')
        return;
    }

    // if not connected:
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'share_prompt',
            serverSelectionTimeoutMS: 20000, // Increase timeout to 20 seconds
        })

        isConnected = true
        console.log('Connected to MongoDB')
    } catch (error) {
        console.error('MongoDB connection error:', error)
        throw new Error('Failed to connect to MongoDB')
    }
}

