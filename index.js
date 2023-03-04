import fetchFeeds from './modules/fetchFeeds.js';
import Mastodon from './modules/Mastodon.js';
import path from 'path';
import fs from 'fs-extra';
import template from './template/index.js';

console.log('Starting Pleroma_Bot');

const __dirname = path.resolve();
const config = fs.readJSONSync(path.join(__dirname, './config.json'));

await fetchFeeds(async e => {

    let client = new Mastodon(config?.server, config?.accessToken);
    let Tmp = await template(e.title, e.description, e.image, e.link).catch((e) => console.log(e.toString()));
    let text = `${e.title}.\n\n\n___________`
    text += `\n\n${e.description}\n\n`
    text += e.link

    if (Tmp.buffer) {

        let up = await client.Upload(Tmp?.buffer).catch(e => console.log(e));

        if (up?.id) {
            await client.Publish(text, up?.id).catch(e => console.log(e));
        }

    }
});