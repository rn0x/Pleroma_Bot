import Parser from 'rss-parser';
import fs from 'fs-extra';
import path from 'path';
import getImageUrl from './getImageUrl.js';
import googleTranslate from './googleTranslate.js';


/**
* @typedef {Object} rss
* @property {string} website 
* @property {string} icon 
* @property {string} language 
* @property {number} id 
* @property {string} name 
* @property {string} title 
* @property {string} content 
* @property {string} creator 
* @property {string} link 
* @property {string} isoDate 
* @property {Array} image 
*/

/**
* @param {function(rss)} callback 
*/

export default async function getRss(callback) {
    const __dirname = path.resolve();

    while (true) {

        await new Promise(resolve => setTimeout(resolve, 1000));
        let config = fs.readJSONSync(path.join(__dirname, './config.json'));
        let sentRss = fs.readJSONSync(path.join(__dirname, './database/sentRss.json'));

        for (let item of config?.rss) {

            let feed = await new Parser({ timed: 600000 }).parseURL(item).catch(e => console.log(`timed out ${item}`));
            let content = feed?.items[0]?.contentSnippet?.replace(/\n\n/g, " ")?.slice(0, 350);
            let title = feed?.items?.[0]?.title;
            let link = feed?.items?.[0]?.link

            if (feed?.items?.length !== 0 && sentRss?.includes(link) === false && title && title !== '' && content && content !== '') {

                let title_ar = feed?.language?.includes('ar') ? title : await googleTranslate(title).catch((e) => console.log(e));
                let content_ar = feed?.language?.includes('ar') ? content : await googleTranslate(content).catch((e) => console.log(e));

                if (title_ar && content_ar) {

                    sentRss.push(link);
                    fs.writeJSONSync(path.join(__dirname, './database/sentRss.json'), sentRss, { spaces: '\t' });
                    callback({
                        website: item,
                        icon: feed?.image?.url,
                        language: feed?.language,
                        name: feed?.title,
                        title: title_ar,
                        content: content_ar,
                        creator: feed?.items?.[0]?.creator,
                        link: link,
                        isoDate: feed?.items?.[0]?.isoDate,
                        image: await getImageUrl(feed?.items?.[0]?.content, link).catch(e => console.log(e))
                    })

                }
            }
        }
    }
}
