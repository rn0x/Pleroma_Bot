import fetch from 'node-fetch';
import { JSDOM } from "jsdom";

export default async (url) => {

    try {

        let res = await fetch(url).catch(e => console.log(`${url} : `, e?.toString()));
        let text = await res?.text()
        let dom = new JSDOM(text);
        global.document = dom.window.document;
        global.window = dom.window;
        let body = document.querySelectorAll('p');
        let description = Array.from(body).map(e=>{
            return e.textContent
        })

        return description.join('\n')

    } catch (error) {

        console.log(`${url} : `, error?.toString());
        return ' '

    }
}