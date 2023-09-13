import type { FastifyInstance } from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";


export async function initSwagger(app: FastifyInstance) {
    await app.register(fastifySwagger, {
        mode: "dynamic",
        openapi: {
            info: {
                title: "garage Api Documentation",
                description: "All endPoint for garage API",
                version: "0.1.0",
            },
            security: [
                {
                    bearerAuth: [],
                },
            ],
            components: {
                securitySchemes: {
                    bearerAuth: {
                        type: "http",
                        scheme: "bearer",
                        bearerFormat: "JWT",
                    },
                },
            },
        },
    });

    await app.register(fastifySwaggerUi, {
        routePrefix: "/docs",
        uiConfig: {
            deepLinking: false,
        },
        uiHooks: {
            onRequest(request, reply, next) {
                next();
            },
            preHandler(request, reply, next) {
                next();
            },
        },
        staticCSP: false,
        transformStaticCSP: (header) => header,
    });

}


