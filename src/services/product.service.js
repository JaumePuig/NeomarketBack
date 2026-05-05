import { productModel } from "../models/product.model.js";

// GET (uno o todos)
export async function getProductsService(nombre) {
  const producto = await productModel();

  if (nombre) {
    return await producto.findOne({ Nombre: nombre });
  }

  return await producto.find();
}

// CREATE
export async function createProductService(data) {
  const producto = await productModel();
  return await producto.create(data);
}

// UPDATE
export async function updateProductService(id, data) {
  const producto = await productModel();

  return await producto.findByIdAndUpdate(
    id,
    { $set: data },
    { returnDocument: "after" }
  );
}

// DELETE
export async function deleteProductService(id) {
  const producto = await productModel();
  return await producto.findByIdAndDelete(id);
}

export async function getProductByIdService(id) {
  const producto = await productModel();
  return await producto.findById(id);
}