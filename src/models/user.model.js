import { dbConfig } from "../config/db.config.js";
export async function userModel() {
  const conexion = await dbConfig();
  if (!conexion) return { error: "DB connection failed" };
  const Schema = conexion.Schema;
  const users = new Schema({
    Nombre: { type: String, required: true },
    Apellidos: { type: String, required: true },
    Telefono: { type: Number, required: true},
    Email: { type: String, required: true  },
    Password: { type: String, required: true },
    Direccion: { type: String, required: true },
    Admin: { type: Boolean, required: true },
    Wishlist: { type: Array, required: true },
    Cartera: { type: Number, required: true },
    Birthdate: { type: String, required: true },
  });

  users.index({ Email: 1 }, { unique: true });

  const userModelo =
    (await conexion.models["Users"]) || conexion.model("Users", users, "Users");
  //await userModelo.init();
  return userModelo;
}
