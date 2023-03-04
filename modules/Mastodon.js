import fetch, { FormData, fileFromSync, File } from 'node-fetch';
import { fileTypeFromBuffer, fileTypeFromFile } from 'file-type';

export default class Mastodon {

    /** 
     * @param {string} url عناوان منصة mastodon 
     * @param {string} token رمز المستخدم | token
     */

    constructor(url, token) {

        this.url = url
        this.token = token
    }

    /** 
     * إرفاق الوسائط بالمنشورات 
     * 
     * @param {string} buffer المخزن المؤقت للملف المراد إرفاقه
     * @return {Promise<object>} return json.
     */

    async Upload(buffer) {

        let formData = new FormData();
        let contentType = await fileTypeFromBuffer(buffer).catch(e => console.log(e))
        let file = new File([buffer], `fileName.${contentType?.ext}`, { type: contentType?.mime })

        formData.set('file', file);

        let response = await fetch(`${this.url}/api/v1/media`, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + this.token,
            },
            body: formData,
        }).catch(e => console.log(e));
        let json = await response?.json().catch(e => console.log(e));

        if (json?.error) {

            return json?.error

        }

        else return json
    }


    /** 
     * كتابة منشور جديد او رد على منشور
     * 
     * @param {string} text المحتوى النصي (default: undefined)
     * @param {string  | Array} media_ids مصفوفة معرفات المرفقات التي سيتم إرفاقها كوسائط (default: undefined)
     * @param {string} in_reply_to_id معرف المنشور الذي يتم الرد عليه ، إذا كان المنشور عبارة عن رد (default: undefined)
     * @return {Promise<object>} return json.
     */

    async Publish(text = undefined, media_ids = undefined, in_reply_to_id = undefined) {

        let Parameters = {
            status: text,
            media_ids: media_ids ? Array.isArray(media_ids) ? media_ids : [media_ids] : undefined,
            in_reply_to_id: in_reply_to_id
        }
        let response = await fetch(`${this.url}/api/v1/statuses`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.token,
            },
            body: JSON.stringify(Parameters),
        }).catch(e => console.log(e));
        let json = await response?.json().catch(e => console.log(e));

        if (json?.error) {

            return json?.error

        }

        else return json
    }
}