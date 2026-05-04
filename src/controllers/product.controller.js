import {
  getProductsService,
  createProductService,
  updateProductService,
  deleteProductService
} from "../services/product.service.js";

// GET
export async function getProductsController(req, res) {
  const { nombre } = req.query;
  const result = await getProductsService(nombre);
  res.send(result);
}

// CREATE
export async function createProductController(req, res) {
  const imagenes = req.files?.map(file => file.filename) || [];

  const data = {
    ...req.body,
    Imagenes: imagenes
  };

  const result = await createProductService(data);
  res.send(result);
}

// UPDATE
export async function updateProductController(req, res) {
  const { id } = req.params;
  const imagenes = req.files?.map(file => file.filename);

  const data = {
    ...req.body,
  };

  // solo actualiza imágenes si vienen nuevas
  if (imagenes && imagenes.length > 0) {
    data.Imagenes = imagenes;
  }

  const result = await updateProductService(id, data);
  res.send(result);
}

// DELETE
export async function deleteProductController(req, res) {
  const { id } = req.params;
  const result = await deleteProductService(id);
  res.send(result);
}