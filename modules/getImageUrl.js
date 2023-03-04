import fetch from 'node-fetch';
import { JSDOM } from "jsdom";

export default async (url) => {

    try {

        let res = await fetch(url).catch(e => console.log(`${url} : `, e?.toString()));
        let body = await res?.text()
        let dom = new JSDOM(body);
        global.document = dom.window.document;
        global.window = dom.window;
        let img = document.querySelector('img');
        let Ogimage = document.querySelector('meta[property~="og:image"]');
        let UrlOrigin = new URL(url).origin;
        let UrlPathname = new URL(url).pathnameI;

        if (Ogimage?.content) {

            if (Ogimage?.content?.includes('http')) {

                return Ogimage?.content
            }

            else {

                let imageUrl = `${UrlOrigin}/${Ogimage?.content}`;
                let res = await fetch(imageUrl);
                let type = res?.headers?.get('content-type');

                if (type.includes('image')) {

                    return imageUrl

                }

                else {
                    let imageUrl = `${UrlOrigin}${UrlPathname}/${Ogimage?.content}`;
                    let res = await fetch(imageUrl).catch(e => console.log(`${url} : `, e?.toString()));
                    let type = res?.headers?.get('content-type');

                    if (type.includes('image')) {

                        return imageUrl

                    }

                    else {
                        //console.log('not found image');
                        return './icon/logo.png'
                    }
                }

            }

        }

        else if (img?.src) {

            if (img?.src?.includes('http')) {

                return img?.src
            }

            else {

                let imageUrl = `${UrlOrigin}/${img?.src}`;
                let res = await fetch(imageUrl).catch(e => console.log(`${url} : `, e?.toString()));
                let type = res?.headers?.get('content-type');

                if (type.includes('image')) {

                    return imageUrl

                }

                else {

                    let imageUrl = `${UrlOrigin}${UrlPathname}/${img?.src}`;
                    let res = await fetch(imageUrl).catch(e => console.log(`${url} : `, e?.toString()));
                    let type = res?.headers?.get('content-type');

                    if (type.includes('image')) {

                        return imageUrl

                    }

                    else {
                        //console.log('not found image');
                        return './icon/logo.png'
                    }
                }

            }

        }

        else {
            return './icon/logo.png'
        }

    } catch (error) {

        console.log(`${url} : `, error?.toString());
        return './icon/logo.png'

    }
}