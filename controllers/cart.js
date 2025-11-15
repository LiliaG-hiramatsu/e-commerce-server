import { readDB, writeDB } from "../utils/jsondb.js";

export const getCart = (req, res) => {
  const db = readDB();
  const cart = db.carritos.find(c => c.usuario_id === Number(req.params.userId));

  if (!cart) {
    return res.status(404).json({ error: "Carrito no encontrado" });
  }

  res.json(cart);
};

// Agregar un item al carrito
export const addToCart = (req, res) => {
  const { productId, cantidad } = req.body;
  const userId = Number(req.params.userId);

  const db = readDB();
  const cart = db.carritos.find(c => c.usuario_id === userId);

  if (!cart) {
    return res.status(404).json({ error: "Carrito no encontrado" });
  }

  const existing = cart.items.find(item => item.producto_id === productId);

  if (existing) {
    existing.cantidad += cantidad;
  } else {
    cart.items.push({ producto_id: productId, cantidad });
  }

  cart.total = calcCartTotal(cart, db);

  writeDB(db);
  res.json(cart);
};

// Vaciar carrito
export const clearCart = (req, res) => {
  const db = readDB();
  const cart = db.carritos.find(c => c.usuario_id === Number(req.params.userId));
  
  if (!cart) {
    return res.status(404).json({ error: "Carrito no encontrado" });
  }

  cart.items = [];
  cart.total = 0;

  writeDB(db);
  res.json({ message: "Carrito vaciado" });
};

// Auxiliar
function calcCartTotal(cart, db) {
  return cart.items.reduce((acc, item) => {
    const product = db.productos.find(p => p.id === item.producto_id);
    return acc + (product.precio * item.cantidad);
  }, 0);
}
