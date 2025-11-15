import data from "../data/data.json" with { type: "json" };

export const getCategories = (req, res) => {
  res.json(data.categorias);
};

export const getCategoryById = (req, res) => {
  const id = Number(req.params.id);

  const categoria = data.categorias.find(c => c.id === id);
  if (!categoria) {
    return res.status(404).json({ error: "Categoría no encontrada" });
  }

  const productos = data.productos.filter(p => p.categoria_id === id);
  //console.log(productos)
  res.json(productos);
};
