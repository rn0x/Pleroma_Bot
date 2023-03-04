import fs from 'fs-extra';
import path from 'path';


export default async function CrateHtml({
    titel: titel,
    description: description,
    image: image,
    url: url

}) {

    let html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div id="content">
        <img id="image" src="${image}">
        <div id="info">
            <h1>
            ${titel}
            
            </h1>
            <p>
            ${description?.replace(/\n\n/g, " ")?.slice(0, 570)}...
            </p>
            <div id="url_posts">
                <p id="posts">
                    Post link
                </p>
                <p id="url">
                
                ${url}

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
    fs.writeFileSync(path.join(__dirname, './template/index.html'), html);
}



// function isUrl(str) {
//     var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
//         '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
//         '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
//         '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
//         '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
//         '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
//     return !!pattern.test(str);
// }