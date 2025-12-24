const db = require('./db');
const bcrypt = require('bcryptjs');

async function init() {
  console.log("Initializing Database Schema...");

  try {
    await db.execute(`
      CREATE TABLE IF NOT EXISTS config (
        id INTEGER PRIMARY KEY CHECK (id = 1),
        limit_per_number INTEGER DEFAULT 350,
        limit_total_shift INTEGER DEFAULT 5000,
        system_retention INTEGER DEFAULT 5,
        shift_schedule TEXT DEFAULT '{"morning":"08:00-12:00","afternoon":"13:00-18:00","night":"19:00-22:00"}',
        whatsapp_number TEXT DEFAULT ''
      )
    `);

    await db.execute(`
      CREATE TABLE IF NOT EXISTS shifts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type TEXT CHECK(type IN ('Mañana', 'Tarde', 'Noche')) NOT NULL,
        date TEXT NOT NULL,
        status TEXT CHECK(status IN ('ABIERTO', 'CERRADO', 'FINALIZADO')) DEFAULT 'ABIERTO',
        winning_number TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        closed_at DATETIME
      )
    `);

    await db.execute(`
      CREATE TABLE IF NOT EXISTS tickets (
        id TEXT PRIMARY KEY,
        shift_id INTEGER NOT NULL,
        total INTEGER NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(shift_id) REFERENCES shifts(id)
      )
    `);

    await db.execute(`
      CREATE TABLE IF NOT EXISTS sales (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        shift_id INTEGER NOT NULL,
        ticket_id TEXT,
        number TEXT NOT NULL CHECK(length(number) = 2),
        amount INTEGER NOT NULL CHECK(amount > 0),
        prize INTEGER NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(shift_id) REFERENCES shifts(id),
        FOREIGN KEY(ticket_id) REFERENCES tickets(id)
      )
    `);

    await db.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT DEFAULT 'admin',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Seed Config
    try {
        await db.execute("INSERT INTO config (id) VALUES (1)");
        console.log("Config seeded.");
    } catch (e) { 
        // Ignore if exists
    }

    // Seed Admin
    try {
        const rs = await db.execute({ sql: "SELECT * FROM users WHERE username = ?", args: ['admin'] });
        if (rs.rows.length === 0) {
            console.log("Seeding admin...");
            const hash = bcrypt.hashSync("admin123", 10);
            await db.execute({ sql: "INSERT INTO users (username, password, role) VALUES (?, ?, ?)", args: ['admin', hash, 'admin'] });
        }
    } catch (e) {
        console.error("Error seeding admin", e);
    }
    
    console.log("Database initialized successfully.");
  } catch (e) {
    console.error("Initialization failed:", e);
  }
}

init();
