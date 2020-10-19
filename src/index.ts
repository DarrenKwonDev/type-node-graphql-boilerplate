import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, "../.env") });
import express from "express";
import logger from "morgan";
import cors from "cors";
import { createConnection } from "typeorm";
import connectionOptions from "./ormConfig";
import { graphqlHTTP } from "express-graphql";
import expressPlayground from "graphql-playground-middleware-express";
import schema from "./schema";

const PORT = process.env.PORT;
const isProd = process.env.NODE_ENV === "development" ? false : true;
const app = express();

// middleware
app.use(logger(isProd ? "combined" : "dev"));
app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

// router
app.get("/playground", expressPlayground({ endpoint: "/graphql" }));

// listener + DB Transaction start
createConnection(connectionOptions)
  .then(() => {
    app.listen(PORT, () => console.log(`TS Backend on : http://localhost:${PORT}/playground`));
  })
  .catch((error) => console.log(error));
