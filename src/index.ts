// src/index.js
import { bootstrap } from "vesper";
import controllers from "./controller";
import entities from "./entity";
import * as bodyparser from "body-parser";
import { PubSub } from "graphql-subscriptions";

const port: number = Number(process.env.PORT) || 4000;
export const secret: string =
  process.env.JWT_SECRET || "9u8nnjksfdt98*(&*%T$#hsfjk";

const pubSub = new PubSub();

bootstrap({
  cors: true,
  port,
  use: [bodyparser.json()],
  controllers: controllers,
  entities: entities,
  schemas: ["../**/*.graphql"],
  graphQLRoute: "/graphql",
  setupContainer: container => container.set(PubSub, pubSub),
  subscriptionAsyncIterator: triggers => pubSub.asyncIterator(triggers)
})
  .then(() => {
    console.log(
      `Your app is up and running on http://localhost:${port}. 
      You can use playground in development mode on http://localhost:${port}/playground`
    );
  })
  .catch(error => {
    console.error(error.stack ? error.stack : error);
  });
