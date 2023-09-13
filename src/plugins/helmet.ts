import fp from "fastify-plugin";
import type { FastifyHelmetOptions } from "@fastify/helmet";
import helmet from "@fastify/helmet";

export default fp<FastifyHelmetOptions>(async (fastify, opts) => {
    void fastify.register(helmet, {
        ...opts,
    });
});