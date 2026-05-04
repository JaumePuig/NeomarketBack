import { userModel } from "../models/user.model.js";
import bcrypt from "bcrypt";
import { createToken } from "./token.service.js";

const saltRounds = 10;

export async function registerUserService(userData) {
  try {
    const usuario = await userModel();
    //ciframos direccion
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

    const nuevoUsuario = await new usuario({
      nombre: userData.nombre,
      apellidos: userData.apellidos,
      email: userData.email,
      password: hashedPassword,
    });

    nuevoUsuario.save();

    return {
      status: 201,
      message: "usuario guardado",
    };
  } catch (e) {
    console.log(e);
    return {
      status: 409,
      message: "usuario NO guardado",
    };
  }
}

export async function loginService(userData) {
  try {
    const { email, password } = userData;
    const usuario = await userModel();
    const foundUser = await usuario.findOne({ email });
    if (!foundUser)
      return { status: 401, message: "Usuario o clave incorrecto" };

    const compare = await bcrypt.compare(password, foundUser.password);
    if (!compare) return { status: 401, message: "Usuario o clave incorrecto" };

    const userInfo = {
      nombre: foundUser.nombre,
      apellidos: foundUser.apellidos,
      email: foundUser.email,
    };

    return {
      status: 200,
      message: { foundUser, token: createToken(userInfo) },
    };
  } catch (e) {
    return {
      status: 403,
      message: e.message,
    };
  }
}

export async function userInfoService(userData) {
  const { email, password } = userData;
  const usuario = await userModel();
  const foundUser = await usuario.findOne({ email });
  if (!foundUser) return { status: 404, message: "Usuario o clave incorrecto" };
  const userInfo = {
    nombre: foundUser.nombre,
    apellidos: foundUser.apellidos,
    email: foundUser.email,
  };
  return {
    status: 200,
    message: userInfo,
  };
}
