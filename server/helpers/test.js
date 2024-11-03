import fs from "fs"
import path from "path"
import { pool } from "./db.js"
import { fileURLToPath } from 'url'
import { dirname } from 'path'


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log("Current directory:", __dirname); // Add this to verify __dirname's value

const initializeTestDb = () => {
    const sql = fs.readFileSync(path.resolve(__dirname, "../todo.sql"), "utf8");
    pool.query(sql)
}

const insertTestUser = (email, password) => {
    hash(password, 10, (error, hashedPassword) => {
        pool.query("insert into account (email, password) values ($1, $2)"),
            [email, hashedPassword]
    })
}

const getToken = (email) => {
    return sign({user: email}, process.env.JWT_SECRET_KEY)
}

export { initializeTestDb, insertTestUser, getToken }