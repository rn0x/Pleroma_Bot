import { launch } from 'puppeteer';
import path from 'path';
import fs from 'fs-extra';
import CrateHtml from './CrateHtml.js';

export default async function template(titel, description, image, url) {

    let browser
    try {

        await CrateHtml({
            titel: titel,
            description: description,
            image: image,
            url: url
        });
        let __dirname = path.resolve();
        let config = fs.readJSONSync(path.join(__dirname, './config.json'));
        let launchOptions = {
            headless: true,
            args: ['--start-maximized', '--no-sandbox', '--disable-setuid-sandbox'],
            executablePath: config?.executablePath
        };
        browser = await launch(launchOptions).catch(e => console.log('Error: browser is not launch ', e));
        let page = await browser?.newPage();
        await page?.setViewport({ width: 1100, height: 100 });
        await page?.goto(`file://${path.join(__dirname, './template/index.html')}`, {
            waitUntil: 'load',
            timeout: 600000
        });
        let screenshot = await page?.screenshot({ path: './preview.png', fullPage: true });
        await page?.setCacheEnabled(true);

        return {
            path: './preview.png',
            buffer: screenshot?.buffer
        }

    } catch (error) {
        console.log(error);
        return undefined

    } finally {
        await browser?.close();
    }

}