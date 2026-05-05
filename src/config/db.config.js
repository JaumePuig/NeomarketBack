import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

export async function dbConfig() {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 30000, // 30 segundos
      socketTimeoutMS: 45000, // 45 segundos
    });
    console.log("conectado console");
    return connection;
  } catch (e) {
    console.log('Error en conexión a MongoDB:', e);
    return null;
  }
}
