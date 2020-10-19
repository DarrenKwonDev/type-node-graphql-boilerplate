import dotenv from "dotenv"
import path from "path"
dotenv.config({ path: path.resolve(__dirname, "../.env") }) 
import express from 'express';

const app = express();
const PORT = process.env.PORT

app.get("/", (req, res) => res.json("what"))

app.listen(PORT, () => console.log(`Listen on : http://localhost:${PORT}`))