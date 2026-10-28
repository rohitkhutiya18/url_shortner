import { ApolloServer } from "@apollo/server";
import { resolvers } from "./app/root-resolver.js";
import { typeDefs } from "./app/root-schema.js";
import "reflect-metadata";
import { config } from "dotenv";
import { appDataSource } from "./config/db.config.js";
import express from "express";
import { expressMiddleware } from "@as-integrations/express4";
import { getOgUrl } from "./url/url.service.js";
import { createContext } from "./auth/auth-service.js";
import { connectRedis } from "./utils/redis.js";
const app = express();
config();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

try {
  const connection = await appDataSource.initialize().then(async () => {
    await import("./utils/cronJob.js");
  });
  await connectRedis();
  console.log("Redis is connected");
  console.log("db is connected");

  await server.start();
  app.use(
    "/graphql",
    express.json(),
    expressMiddleware(server, {
      context: createContext,
    }),
  );

  app.get("/:id", async (req, res) => {
    try {
      const id = req.params.id;
      if (!id) {
        return res.status(400).send("id is required");
      }

      const originalUrl = await getOgUrl(id);
      if (!originalUrl) {
        return res.status(404).send("url is not present");
      }

      const redirectUrl = originalUrl?.originalUrl;

      if (!redirectUrl) {
        return res.status(404).send("Redirect URL is not available");
      }

      res.redirect(redirectUrl);
    } catch (err) {
      console.log(err);
    }
  });

  app.listen({ port: 4000 }, () => {
    console.log(`Server ready at http://localhost:4000/graphql`);
  });
} catch (error) {
  console.log("error", error);
}
