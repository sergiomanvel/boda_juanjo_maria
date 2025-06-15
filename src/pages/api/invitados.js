import { openDB, initDB } from "@/db";

export default async function handler(req, res) {
  await initDB();
  const db = await openDB();
  if (req.method === "POST") {
    const { nombre, vendras } = req.body;
    if (!nombre || typeof vendras === "undefined") {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }
    const fecha_registro = new Date();
    const [result] = await db.query(
      "INSERT INTO Invitados (nombre, vendras, fecha_registro) VALUES (?, ?, ?)",
      [nombre, vendras, fecha_registro]
    );
    return res.status(201).json({ id: result.insertId, nombre, vendras, fecha_registro });
  } else if (req.method === "GET") {
    const [invitados] = await db.query("SELECT * FROM Invitados");
    return res.status(200).json(invitados);
  } else {
    res.status(405).json({ error: "Método no permitido" });
  }
}