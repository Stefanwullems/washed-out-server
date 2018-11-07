// src/index.js
import * as jwt from "jsonwebtoken"
import { bootstrap } from "vesper";
import controllers from "./controller";
import { getManager } from "typeorm"
import entities from "./entity";
import  User  from "./entity/User"

const port: number = Number(process.env.PORT) || 4000;
export const secret:string = process.env.JWT_SECRET || '9u8nnjksfdt98*(&*%T$#hsfjk'

bootstrap({
  cors: true,
  port,
  controllers: controllers,
  entities: entities,
  schemas: ["../**/*.graphql"],
  setupContainer: async (container, action) => {
    const request = action.request;
    const token:string = request.headers["token"] as string || "";
    if(token === "") {
        return;
    }

    const entityManager = getManager();
    const payload = jwt.verify(token, secret);
    const currentUser = await entityManager.findOneOrFail(User, { id: payload["id"] });

    container.set(User, currentUser);
  },
authorizationChecker: (container, action) => {
    const currentUser = action.container.get(User);
    if(currentUser.id === undefined) {
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
