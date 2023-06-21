import mongoose from 'mongoose';

const MONGODB_URI = process.env.NEXT_PUBLIC_MONGO_URI;

if (!MONGODB_URI) {
    throw new Error(
        'Please define the MONGODB_URI environment variable inside .env.local'
    );
}

export async function connectToDatabase(): Promise<void> {
    try {
        await mongoose.connect(MONGODB_URI as string, {
            dbName: 'TheButcheress',
        });
        console.log('MongoDB successfully connected');
    } catch (error) {
        throw new Error(`Could not connect to MongoDB: ${error}`);
    }
}

// Export the default connection created by Mongoose
export const db = mongoose.connection;