import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, "../.env") });
import express from "express";
import { graphqlHTTP } from "express-graphql";
import logger from "morgan";
import cors from "cors";
import schema from "./schema";

const PORT = process.env.PORT;
const isProd = process.env.NODE_ENV === "development" ? false : true;
const app = express();

// middleware
app.use(logger(isProd ? "combined" : "dev"));
app.use(cors());

// router
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

// listener
app.listen(PORT, () => console.log(`TS Backend on : http://localhost:${PORT}`));
