import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || "localhost",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "",
  database: process.env.MYSQL_DATABASE || "boda",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export async function openDB() {
  return pool;
}

export async function initDB() {
  const db = await openDB();
  await db.query(`CREATE TABLE IF NOT EXISTS Invitados (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    vendras BOOLEAN NOT NULL,
    fecha_registro DATETIME NOT NULL
  )`);
  await db.query(`CREATE TABLE IF NOT EXISTS Musica (
    id INT AUTO_INCREMENT PRIMARY KEY,
    invitado_id INT NOT NULL,
    sugerencia VARCHAR(255) NOT NULL,
    FOREIGN KEY(invitado_id) REFERENCES Invitados(id)
  )`);
  return db;
}