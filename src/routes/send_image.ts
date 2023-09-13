import { FastifyInstance } from "fastify/types/instance";

import { sendBuffer } from "../cntroller/captureScreenshot";
import { Type } from "@sinclair/typebox";


export default async (server: FastifyInstance) => {
    server.route({
        method: "POST",
        url: "/generate-qrcode",
        schema: {
            summary: 'generate image with qrcode',
            tags: ["Contact"],
            body: Type.Object({
                id: Type.String()
            }),
        },
        handler: sendBuffer,
    });
}