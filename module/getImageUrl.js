import { parse } from 'node-html-parser';
import fetch from 'node-fetch';

export default async function getImageUrl(content, url) {

    try {

        const response = await fetch(url)
        let text = await response?.text()
        let img = parse(content)?.querySelectorAll('img');
        let Ogimg = parse(text)?.querySelector('meta[property=og:image]');
        let array = []

        if (img?.length !== 0) {

            for (let item of img) {
                array.push(item?.getAttribute('src'))
            }

            return array
        }

        if (img?.length === 0 && Ogimg) {

            return [Ogimg?.getAttribute('content')]
        }


        else {

            return content?.match(/<img [^>]*src="[^"]*"[^>]*>/gm)
                ?.map(x => x?.replace(/.*src="([^"]*)".*/, '$1')) || []
        }


    } catch (error) {

        return []
    }
}