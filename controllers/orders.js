import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta al archivo JSON donde guardaremos las órdenes
const ordersFilePath = path.join(__dirname, "../data/orders.json");

// Función interna: lee el archivo o devuelve [] si no existe
async function readOrders() {
  try {
    const data = await fs.readFile(ordersFilePath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    // Si el archivo no existe, devolvemos un array vacío
    if (err.code === "ENOENT") return [];
    throw err;
  }
}

// Función interna: guarda todas las órdenes
async function saveOrders(orders) {
  await fs.writeFile(ordersFilePath, JSON.stringify(orders, null, 2));
}


// Crear una nueva orden
export async function createOrder(req, res) {
  try {
    const newOrder = req.body;

    if (!newOrder || !newOrder.items || newOrder.items.length === 0) {
      return res.status(400).json({ message: "La orden está vacía" });
    }

    const orders = await readOrders();

    const orderToSave = {
      id: Date.now(),
      date: new Date().toISOString(),
      ...newOrder,
    };

    orders.push(orderToSave);

    await saveOrders(orders);

    res.status(201).json({
      orderId,
      message: "Orden guardada correctamente",
      order: orderToSave,
    });
  } catch (err) {
    console.error("Error al crear la orden:", err);
    res.status(500).json({ message: "Error interno al guardar la orden" });
  }
}

// Obtener todas las órdenes
export async function getOrders(req, res) {
  try {
    const orders = await readOrders();
    res.json(orders);
  } catch (err) {
    console.error("Error al leer órdenes:", err);
    res.status(500).json({ message: "Error interno al leer las órdenes" });
  }
}
