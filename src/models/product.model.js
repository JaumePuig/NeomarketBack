import mongoose from "mongoose";

export async function productModel() {

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