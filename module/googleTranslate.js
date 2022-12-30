import { launch } from 'puppeteer';
import fs from 'fs-extra';
import path from 'path';

export default async function googleTranslate(text) {

    try {

        let __dirname = path.resolve();
        let config = fs.readJSONSync(path.join(__dirname, './config.json'));
        let launchOptions = {
            headless: true,
            args: ['--start-maximized', '--no-sandbox', '--disable-setuid-sandbox'],
            executablePath: config?.executablePath
        };
        let browser = await launch(launchOptions).catch(e => console.log('Error: browser is not launch ', e));
        let page = await browser?.newPage();
        page?.setDefaultNavigationTimeout(600000);

        // https://translate.google.com/#view=home&op=translate&sl=auto&tl=ar&text=${text}

        await page?.goto(`https://translate.google.com/?hl=ar&sl=auto&tl=ar&text=${text}`, {
            waitUntil: 'load',
            timeout: 600000
        });
        let XPath = '/html/body/c-wiz/div/div[2]/c-wiz/div[2]/c-wiz/div[1]/div[2]/div[3]/c-wiz[2]/div/div[8]/div/div[1]/span[1]'
        await page?.waitForXPath(XPath);
        let [element] = await page?.$x(XPath);
        let translate = await page?.evaluate(e => e?.innerText, element);
        await page?.setCacheEnabled(true);
        await browser?.close();

        return translate

    } catch (error) {

        return undefined
    }
}
