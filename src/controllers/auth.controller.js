import { registerUserService, loginService, userInfoService } from "../services/auth.service.js";

export async function registerController(req, res) {
  const { nombre, apellidos, email, password } = req.body;
  const mensaje = await registerUserService(req.body);
  res.status(mensaje.status).json(mensaje.message);
}

export async function loginController(req, res) {
  const login = await loginService(req.body);
  res.status(login.status).json(login.message);
}

export async function userInfoController(req, res){
  const userInfo = await userInfoService(req.body);
  res.status(userInfo.status).json(userInfo.message);
}