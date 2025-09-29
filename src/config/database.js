import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    // para borrar toda la base de datos
    // await mongoose.connection.dropDatabase();
    console.log("========================================");
    console.log("=>   Conectado a la base de datos     <=");
    console.log("========================================");
  } catch (error) {
    console.log("No se pudo conectar a la base de datos", error);
  }
};
