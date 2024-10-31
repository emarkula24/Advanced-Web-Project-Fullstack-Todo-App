import express from "express"
import cors from "cors"
import pkg from "pg"
import dotenv from "dotenv"

dotenv.config()

const port = 3002
const { Pool } = pkg
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

const openDb = () => {
    const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: 5432
    })
    return pool
}

app.get("/", (req, res) => {
    const pool = openDb()

    pool.query("select * from task", (error, result) => {
        if (error) {

            return res.status(500).json({error: error.message})
        }
        return res.status(200).json(result.rows)
    })
})

app.post("/create", (req, res) => {
    const pool = openDb()

    pool.query("insert into task (description) values ($1) returning *",
        [req.body.description],
        (error, result) => {
            if (error) {
                return res.status(500).json({error: error.message})
            }
            return res.status(200).json({id: result.rows[0].id})
        }
    )
})

app.delete("/delete/:id", (req, res) => {
    const pool = openDb()
    const id = parseInt(req.params.id)
    pool.query("delete from task where id = $1",
        [id],
        (error, result) => {
            if (error) {
                return res.status(500).json({error: error.message})
            }
            return res.status(200).json({id: id})
        }
    )
})




app.listen(port, 'localhost')