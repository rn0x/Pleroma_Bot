import fs from 'fs-extra';
import path from 'path';
import getRss from './module/getRss.js';
import template from './module/template/index.js';
import Mastodon from './module/Mastodon.js';
import random from './module/random.js';
import createDatabase from './module/createDatabase.js';

console.log('Starting Bot Rss');

let __dirname = path.resolve();
let config = fs.readJSONSync(path.join(__dirname, './config.json'));
await createDatabase().catch((e) => console.log(e));

await getRss(async (e) => {


    let client = new Mastodon(config?.server, config?.accessToken);

    let Tmp = await template(path.join(__dirname, `./images/${random(20)}.png`), e.title, e.content, e.image[0], e.icon, e.website).catch((e) => console.log(e));
    let text = `العنوان: ${e.title}.\n\n\n`
    text += `الموجز: ${e.content}\n\n`
    text += e.link
    if (Tmp?.filename && e.title && e.content) {

        let buffer = fs.readFileSync(Tmp?.filename)
        let up = await client.Upload(buffer).catch(e => console.log(e));

        if (up?.id) {
            await client.Publish(text, up?.id).catch(e => console.log(e));
        }

    }

}).catch((e) => console.log(e));