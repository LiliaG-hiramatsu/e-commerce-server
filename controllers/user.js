import { readDB } from "../utils/jsondb.js";

export const getUsers = (req, res) => {
  const db = readDB();
  res.json(db.usuarios);
};

export const getUserById = (req, res) => {
  const db = readDB();
  const user = db.usuarios.find(u => u.id === Number(req.params.id));

  if (!user) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  res.json(user);
};
