import fs from "fs";
import path from "path";

const dbPath = path.resolve("data/data.json");

export function readDB() {
  const raw = fs.readFileSync(dbPath, "utf-8");
  return JSON.parse(raw);
}

export function writeDB(newData) {
  fs.writeFileSync(dbPath, JSON.stringify(newData, null, 2));
}
