import {
  getProductsService,
  createProductService,
  updateProductService,
  deleteProductService
} from "../services/product.service.js";

import { getProductByIdService } from "../services/product.service.js";

export async function getProductByIdController(req, res) {
  const { id } = req.params;
  const result = await getProductByIdService(id);
  res.send(result);
}

// GET
export async function getProductsController(req, res) {
  const { nombre } = req.query;
  const result = await getProductsService(nombre);
  res.send(result);
}

// CREATE
export async function createProductController(req, res) {
  console.log(req.body);   // 👈 DEBUG
  console.log(req.files);  // 👈 DEBUG

  const imagenes = req.files?.map(file => file.filename) || [];

  const data = {
    Nombre: req.body.Nombre,
    Descripcion: req.body.Descripcion,
    Precio: Number(req.body.Precio),
    Stock: Number(req.body.Stock),
    Categoria: req.body.Categoria,
    Descuento: Number(req.body.Descuento) || 0,
    Imagenes: imagenes,
    Etiquetas: req.body.Etiquetas
      ? req.body.Etiquetas.split(",")
      : []
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
    Precio: req.body.Precio ? Number(req.body.Precio) : undefined,
    Stock: req.body.Stock ? Number(req.body.Stock) : undefined,
    Descuento: req.body.Descuento
      ? Number(req.body.Descuento)
      : undefined,
    Etiquetas: req.body.Etiquetas
      ? req.body.Etiquetas.split(",")
      : undefined
  };

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