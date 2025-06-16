import { supabase } from "@/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { guestNames, attendance, children, allergies, sugerencia } = req.body;
    
    if (!guestNames || typeof attendance === "undefined") {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    const { data, error } = await supabase
      .from('invitados')
      .insert([
        {
          nombre: guestNames,
          vendras: attendance === 'yes',
          hijos: children,
          alergias: allergies || '',
          sugerencia: sugerencia || '',
          fecha_registro: new Date().toISOString()
        }
      ])
      .select();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(201).json(data[0]);
    
  } else if (req.method === "GET") {
    const { data, error } = await supabase
      .from('invitados')
      .select('*');

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json(data);
    
  } else {
    res.status(405).json({ error: "Método no permitido" });
  }
}