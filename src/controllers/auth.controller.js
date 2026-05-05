import { registerUserService, loginService, userUpdateService, userDeleteService, userInfoService } from "../services/auth.service.js";

export async function registerController(req, res) {
  const { Nombre, Apellidos, Telefono, Email, Password, Direccion, Admin, Wishlist, Cartera, Birthdate } = req.body;
  const mensaje = await registerUserService(req.body);
  res.status(mensaje.status).json(mensaje.message);
}

export async function loginController(req, res) {
  const login = await loginService(req.body);
  res.status(login.status).json(login.message);
}

export async function updateController(req, res) {
  const { Nombre, Apellidos, Telefono, Email, Password, Direccion, Admin, Wishlist, Cartera, Birthdate } = req.body;
  const mensaje = await userUpdateService(req.body);
  res.send(mensaje);
}

export async function deleteController(req, res) {
  const { Email } = req.body;
  const mensaje = await userDeleteService({ Email});
  res.send(mensaje);
}

export async function userInfoController(req, res){
  const userInfo = await userInfoService(req.body);
  res.status(userInfo.status).json(userInfo.message);
}