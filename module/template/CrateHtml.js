import fs from 'fs-extra';
import path from 'path';


export default async function CrateHtml({
    titel: titel,
    content: content,
    image: image,
    url: url

}) {

    let Url = decodeURI(url)

    if (image === undefined || image?.length === 0 || image?.includes('.ico')) {
        image = './icon/rss.png'
    }

    let html = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
</head>

<body>

    <div id="header">
        <p>منشور جديد</p>
    </div>

    <div id="content">

        <img id="image" src="${image}">

        <div id="info">

            <h1>

            ${titel}
            
            </h1>

            <p>

            ${content}

            </p>

            <div id="url_posts">
                <p id="posts">
                    رابط المنشور
                </p>

                <p id="url">
                
                ${Url}

                </p>
            </div>

        </div>

    </div>

    <div id="footer">
        <img src="./icon/logo.png" id="footer_icon">
        <p id="footer_website">bassam.social</p>
    </div>

</body>

</html>`
    let __dirname = path.resolve();
    fs.writeFileSync(path.join(__dirname, './module/template/index.html'), html);
}