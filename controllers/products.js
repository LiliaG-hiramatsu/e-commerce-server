import data from "../data/data.json" with { type: "json" };

export const getProducts = (req, res) => {
  res.json(data.productos);
};

export const getProductById = (req, res) => {
  const id = Number(req.params.id);
  const product = data.productos.find(p => p.id === id);

  if (!product) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  res.json(product);
};
