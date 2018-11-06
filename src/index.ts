// src/index.js
import { bootstrap } from "vesper";
import controllers from "./controller";
import entities from "./entity";

const port: number = Number(process.env.PORT) || 4000;

bootstrap({
  cors: true,
  port,
  controllers: controllers,
  entities: entities,
  schemas: ["../**/*.graphql"]
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
