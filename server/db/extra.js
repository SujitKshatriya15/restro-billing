import Database from "better-sqlite3"
const db = new Database("cafe.db")

db.prepare(`
            INSERT INTO tables
            (table_number, status)

            VALUES
            ('P6', 'AVAILABLE');
            ('P7', 'AVAILABLE');
            ('P8', 'AVAILABLE');
        `).run()