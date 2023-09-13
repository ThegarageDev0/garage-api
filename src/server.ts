import fastify from "fastify";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { initSwagger } from "./swagger";

export const server = fastify({
  logger: true,
  ajv: {
    customOptions: {
      removeAdditional: "all",
      ownProperties: true,
    },
  },
}).withTypeProvider<TypeBoxTypeProvider>();

const port = Number(process.env.PORT ?? process.env.$PORT ?? 8080);
const host = process.env.Host ?? process.env.$HOST ?? "0.0.0.0";

void initSwagger(server);

void server.register(import("./app"));

export function listen() {
  server
    .listen({
      port: port,
      host: host,
    })
    .catch((err) => {
      server.log.error(err);
      process.exit(1);
    });

  server.ready((err: Error) => {
    if (err) {
      server.log.error(err);
      process.exit(1);
    }
  });
}


