import { launch } from 'puppeteer';
import path from 'path';
import fs from 'fs-extra';
import CrateHtml from './CrateHtml.js';

export default async function template(filename, titel, content, image, icon, url) {

    try {

        await CrateHtml({
            titel: titel,
            content: content,
            image: image,
            icon: icon,
            url: url
        });
        let __dirname = path.resolve();
        let config = fs.readJSONSync(path.join(__dirname, './config.json'));
        let launchOptions = {
            headless: true,
            args: ['--start-maximized', '--no-sandbox', '--disable-setuid-sandbox'],
            executablePath: config?.executablePath
        };
        let browser = await launch(launchOptions).catch(e => console.log('Error: browser is not launch ', e));
        let page = await browser?.newPage();
        await page?.setViewport({ width: 700, height: 0 });
        await page?.goto(`file://${path.join(__dirname, './module/template/index.html')}`, {
            waitUntil: 'load',
            timeout: 600000
        });
        await page?.screenshot({ path: filename, fullPage: true });
        await page?.setCacheEnabled(true);
        await browser?.close();

        return {
            filename: filename,
        }

    } catch (error) {
        return error
    }

}
