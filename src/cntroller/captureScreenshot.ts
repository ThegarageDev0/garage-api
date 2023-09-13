import puppeteer, { Browser, Page } from 'puppeteer';
import * as fs from 'fs';
import * as path from 'path';
import * as handlebars from 'handlebars';
import { FastifyReply } from 'fastify/types/reply';

async function captureScreenshot(html: string): Promise<Buffer> {
    const browser: Browser = await puppeteer.launch();
    const page: Page = await browser.newPage();
    await page.setContent(html);
    const screenshot: Buffer = await page.screenshot();
    await browser.close();
    return screenshot;
}

export const sendBuffer = async (request: any, reply: FastifyReply) => {
    const id = request.body as string;
    try {
        const url = `https://chart.googleapis.com/chart?cht=qr&chl=${id}&chs=160x160&chld=L|0`
        const filePath = path.join(__dirname, '../template/index.html');
        const source = fs.readFileSync(filePath, 'utf-8').toString();
        const template = handlebars.compile(source);
        const replacements = {
            url
        };
        const htmlToSend = template(replacements);
        const screenshot = await captureScreenshot(htmlToSend);

        reply.send({ screenshot });
    } catch {
        reply.badRequest();
    }
}