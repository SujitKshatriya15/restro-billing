import express from "express";
import Database from "better-sqlite3";
import cors from "cors";

const app = express();
const db = new Database("cafe.db");
const port =5000;
app.use(cors());
app.use(express.json());

db.prepare(`
    CREATE TABLE IF NOT EXISTS foods(
    id INTEGER PRIMARY KEY,
    title TEXT,
    category TEXT,
    price INTEGER,
    para TEXT
    )
    `).run();

app.get("/", (req,res) =>{
    res.send("POS SERVER RUNNING");
})


app.listen(port, ()=>{
    console.log(`server is running on port ${port}`)
})