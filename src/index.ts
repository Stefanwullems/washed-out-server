// src/index.js
import { bootstrap } from "vesper";
import controllers from "./controller";
import entities from "./entity";
import * as bodyparser from "body-parser";
import { PubSub } from "graphql-subscriptions";
import User from "./entity/User";
import * as jwt from "jsonwebtoken";
import CurrentUser from "./auth/currentUser";
import { getManager } from "typeorm";

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
  setupContainer: async (container, action) => {
    // trivial implementation, used for demonstration purpose
    const request = action.request; // user request, you can get http headers from it
    console.log("hi", request.headers.authorization);
    const user = await User.findOne({
      where: {
        token: request.headers.authorization
      }
    });
    if (!user) return;
    const currentUser = new CurrentUser(user.id);

    container.set(CurrentUser, currentUser);

    container.set(PubSub, pubSub);
  },
  subscriptionAsyncIterator: triggers => pubSub.asyncIterator(triggers),
  authorizationChecker: (roles: string[], action) => {
    console.log("heyk");
    const currentUser = action.container.get(User);
    if (currentUser.id === undefined) {
      throw new Error("The current user doesn't set");
    }
  }
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
