import pkg from "pg"
import dotenv from "dotenv"

const enviroment = process.env.NODE_ENV
dotenv.config()

const { Pool } = pkg

const openDb = () => {
    const pool = new Pool({
        user: process.env.POSTGRES_USER,
        host: process.env.POSTGRES_HOST,
        database: process.env.NODE_ENV === "development" ? process.env.POSTGRES_DB_NAME : process.env.TEST_DB_NAME,
        password: process.env.POSTGRES_PASSWORD,
        port: process.env.NODE_ENV === "development" ?  process.env.DB_PORT : process.env.TEST_DB_PORT
    })
    return pool
}

const pool = openDb()

export { pool }
