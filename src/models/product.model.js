import mongoose from "mongoose";
import { dbConfig } from "../config/db.config.js";

export async function productModel() {
  await dbConfig();

  const productSchema = new mongoose.Schema({
    Nombre: String,
    Descripcion: String,
    Imagenes: [String],
    Precio: Number,
    Stock: Number,
    Categoria: String,
    Etiquetas: [String],
    Descuento: Number
  });

  return mongoose.models.Products ||
         mongoose.model("Products", productSchema, "Products");
}