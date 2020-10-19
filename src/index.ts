import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, "../.env") });
import express from "express";
import logger from "morgan";
import cors from "cors";

const PORT = process.env.PORT;
const isProd = process.env.NODE_ENV === "development" ? false : true;
const app = express();

// middleware
app.use(logger(isProd ? "combined" : "dev"));
app.use(cors());

// router
app.get("/", (req, res) => res.json("what"));

// listener
app.listen(PORT, () => console.log(`TS Backend on : http://localhost:${PORT}`));
