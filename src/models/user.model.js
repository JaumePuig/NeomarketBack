import { dbConfig } from "../config/db.config.js";
export async function userModel() {
  const conexion = await dbConfig();
  if (!conexion) return { error: "DB connection failed" };
  const Schema = conexion.Schema;
  const users = new Schema({
    nombre: { type: String, required: true },
    apellidos: { type: String, required: true },
    email: { type: String, required: true, unique: true  },
    password: { type: String, required: true },
  });

  users.index({ email: 1 }, { unique: true });

  const userModelo =
    (await conexion.models["usuarios"]) || conexion.model("usuarios", users, "usuarios");
  //await userModelo.init();
  return userModelo;
}
