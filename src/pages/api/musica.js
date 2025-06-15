import { openDB, initDB } from "@/db";

export default async function handler(req, res) {
  await initDB();
  const db = await openDB();
  if (req.method === "POST") {
    const { invitado_id, sugerencia } = req.body;
    if (!invitado_id || !sugerencia) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }
    const [result] = await db.query(
      "INSERT INTO Musica (invitado_id, sugerencia) VALUES (?, ?)",
      [invitado_id, sugerencia]
    );
    return res.status(201).json({ id: result.insertId, invitado_id, sugerencia });
  } else if (req.method === "GET") {
    const [musicas] = await db.query("SELECT * FROM Musica");
    return res.status(200).json(musicas);
  } else {
    res.status(405).json({ error: "Método no permitido" });
  }
}