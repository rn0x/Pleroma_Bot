import Meta from 'rss-to-json';
import getText from './getText.js';

export default async (url) => {
    try {
        const feed = await Meta.parse(url);
        return {
            title: feed?.title,
            description: feed?.description,
            link: feed?.link,
            icon: feed?.image,
            items: {
                id: feed?.items?.[0]?.id,
                title: feed?.items?.[0]?.title,
                description: feed?.items?.[0]?.description ? HTMLPartToTextPart(feed?.items?.[0]?.description) : await getText(feed?.items?.[0]?.link),
                link: decodeURI(feed?.items?.[0]?.link),
                author: feed?.items?.[0]?.author,
                published: feed?.items?.[0]?.published,
                created: feed?.items?.[0]?.created
            }
        }
    } catch (error) {

        console.log(`${url} : `, error);
        return false
    }
}


const HTMLPartToTextPart = (HTMLPart) => (
    HTMLPart
        ?.replace(/\n/ig, '')
        ?.replace(/<style[^>]*>[\s\S]*?<\/style[^>]*>/ig, '')
        ?.replace(/<head[^>]*>[\s\S]*?<\/head[^>]*>/ig, '')
        ?.replace(/<script[^>]*>[\s\S]*?<\/script[^>]*>/ig, '')
        ?.replace(/<\/\s*(?:p|div)>/ig, '\n')
        ?.replace(/<br[^>]*\/?>/ig, '\n')
        ?.replace(/<[^>]*>/ig, '')
        ?.replace('&nbsp;', ' ')
        ?.replace(/[^\S\r\n][^\S\r\n]+/ig, ' ')
);
