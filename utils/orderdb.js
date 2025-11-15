import fs from "fs";
const PATH = "./data/orders.json";

export function readOrders() {
  return JSON.parse(fs.readFileSync(PATH, "utf8"));
}

export function writeOrders(data) {
  fs.writeFileSync(PATH, JSON.stringify(data, null, 2));
}
