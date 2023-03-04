import getFeed from './getFeed.js';
import getImageUrl from './getImageUrl.js';
import googleTranslate from './googleTranslate.js';
import path from 'path';
import fs from 'fs-extra';
import isUrl from './isUrl.js';

/**
* @typedef {Object} rss
* @property {string} title 
* @property {string} description 
* @property {string} link 
* @property {Array} image 
*/

/**
* @param {function(rss)} callback 
*/

export default async (callback) => {

    const __dirname = path.resolve();

    fs.existsSync(path.join(__dirname, './database')) ? true :
        fs.mkdirsSync(path.join(__dirname, '/database'), { recursive: true });

    while (true) {

        await new Promise(resolve => setTimeout(resolve, 1000));
        let config = fs.readJSONSync(path.join(__dirname, './config.json'));

        for (let item of config?.rss) {

            if (isUrl(item)) {

                let NewUrl = new URL(item);
                let hostname = NewUrl?.hostname
                let pathname = NewUrl?.pathname?.split('/')?.join('_')

                fs.existsSync(path.join(__dirname, `/database/${hostname + pathname}.json`)) ? true :
                    fs.writeJsonSync(path.join(__dirname, `/database/${hostname + pathname}.json`), [], { spaces: '\t' });


                let res = await fetch(item).catch(e => console.log(`${item} : `, e?.toString()));
                let status = res?.status;

                if (status === 200) {

                    let feed = await getFeed(item);

                    let link = feed?.items?.link;
                    let readJson = fs.readJsonSync(path.join(__dirname, `/database/${hostname + pathname}.json`))

                    if (readJson?.includes(link) === false && feed) {

                        let title = feed?.items?.title;
                        let description = feed?.items?.description;
                        let image = await getImageUrl(link);

                        if (config?.translate) {

                            let titleTranslate = await googleTranslate(feed?.items?.title);
                            let descriptionTranslate = await googleTranslate(feed?.items?.description);

                            if (titleTranslate && descriptionTranslate) {

                                title = titleTranslate;
                                description = descriptionTranslate;
                            }
                        }

                        fs.writeJsonSync(path.join(__dirname, `/database/${hostname + pathname}.json`), [link], { spaces: '\t' });

                        callback({
                            title: title,
                            description: description,
                            link: link,
                            image: image
                        })
                    }
                }
            }
        }
    }
}