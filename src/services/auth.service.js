import { userModel } from "../models/user.model.js";
import bcrypt from "bcrypt";
import { createToken } from "./token.service.js";

const saltRounds = 10;

export async function registerUserService(userData) {
  try {
    const usuario = await userModel();
    //ciframos direccion
    const hashedPassword = await bcrypt.hash(userData.Password, saltRounds);

    const nuevoUsuario = await new usuario({
      Nombre: userData.Nombre,
      Apellidos: userData.Apellidos,
      Telefono: userData.Telefono,
      Email: userData.Email,
      Password: hashedPassword,
      Direccion: userData.Direccion,
      Admin: userData.Admin,
      Wishlist: userData.Wishlist,
      Cartera: userData.Cartera,
      Birthdate: userData.Birthdate,
    });

    await nuevoUsuario.save();

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
    const { Email, Password } = userData;
    const usuario = await userModel();
    const foundUser = await usuario.findOne({ Email });
    if (!foundUser)
      return { status: 401, message: "Usuario o clave incorrecto" };

    const compare = await bcrypt.compare(Password, foundUser.Password);
    if (!compare) return { status: 401, message: "Usuario o clave incorrecto" };

    const userInfo = {
      Nombre: foundUser.Nombre,
      Apellidos: foundUser.Apellidos,
      Telefono: foundUser.Telefono,
      Email: foundUser.Email,
      Direccion: foundUser.Direccion,
      Admin: foundUser.Admin,
      Wishlist: foundUser.Wishlist,
      Cartera: foundUser.Cartera,
      Birthdate: foundUser.Birthdate,
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

export async function userUpdateService(userData) {
  const usuario = await userModel();
  return await usuario.findOneAndUpdate({ 'Email': userData.Email }, { $set: { 'Nombre': userData.Nombre, 'Apellidos': userData.Apellidos, 'Telefono': userData.Telefono, 'Direccion': userData.Direccion, 'Wishlist': userData.Wishlist, 'Cartera': userData.Cartera, 'Birthdate': userData.Birthdate } }, {returnDocument: 'after'});
}

export async function userDeleteService({ Email }) {
  const usuario = await userModel();
  return await usuario.findOneAndDelete({ 'Email': Email });
}

export async function userInfoService(userData) {
  const { email, password } = userData;
  const usuario = await userModel();
  const foundUser = await usuario.findOne({ Email: email });
  if (!foundUser) return { status: 404, message: "Usuario o clave incorrecto" };
  const userInfo = {
    Nombre: foundUser.Nombre,
    Apellidos: foundUser.Apellidos,
    Telefono: foundUser.Telefono,
    Email: foundUser.Email,
    Direccion: foundUser.Direccion,
    Wishlist: foundUser.Wishlist,
    Cartera: foundUser.Cartera,
    Birthdate: foundUser.Birthdate,
  };
  return {
    status: 200,
    message: userInfo,
  };
}
