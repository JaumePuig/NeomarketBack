import { userService, userCreateService, userUpdateService, userDeleteService } from "../services/user.service.js";
export async function userController(req, res) {
  const { nombre } = req.body;
  const mensaje = await userService(nombre);
  res.send(mensaje);
}

export async function userControllerCreate(req, res) {
  const { nombre, apellidos, Edad, Direccion } = req.body;
  const mensaje = await userCreateService({ nombre, apellidos, Edad, Direccion });
  res.send(mensaje);
}

export async function userControllerUpdate(req, res) {
  const { nombre, apellidos, Edad, Direccion } = req.body;
  const mensaje = await userUpdateService({ nombre, apellidos, Edad, Direccion });
  res.send(mensaje);
}

export async function userControllerDelete(req, res) {
  const { nombre } = req.body;
  const mensaje = await userDeleteService({ nombre});
  res.send(mensaje);
}