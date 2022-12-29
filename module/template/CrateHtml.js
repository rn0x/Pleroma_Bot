import fs from 'fs-extra';
import path from 'path';


export default async function CrateHtml({
    titel: titel,
    content: content,
    image: image,
    icon: icon,
    url: url

}) {

    if (image === undefined || image?.length === 0 || image?.includes('.ico')) {
        image = './image/rss.png'
    }

    if (icon === undefined || icon?.length === 0) {
        icon = './image/logo.png'
    }

    let html = `<!DOCTYPE html>

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./style.css">
</head>

<body>
    <img id="icon" src="./image/bassam-main-logo.svg">
    <img src="${image}"id="image">
    <p id="title">${titel}</p>
    <p id="content">
    ${content}
    </p>

    <img src="${icon}" id="fot_icon">
    <p class="fot">الخلاصة من موقع: ${url}</p>
</body>

</html>`
    let __dirname = path.resolve();
    fs.writeFileSync(path.join(__dirname, './module/template/index.html'), html);
}