import fs from 'fs-extra';
import path from 'path';


export default async function createDatabase() {

    const __dirname = path.resolve();

    if (fs.existsSync(path.join(__dirname, './database')) === false) {

        fs.mkdirsSync(path.join(__dirname, '/database'), { recursive: true });

    }

    if (fs.existsSync(path.join(__dirname, './images')) === false) {

        fs.mkdirsSync(path.join(__dirname, '/images'), { recursive: true });

    }

    if (fs.existsSync(path.join(__dirname, './database/sentRss.json')) === false) {

        fs.writeJsonSync(path.join(__dirname, './database/sentRss.json'), [], { spaces: '\t' });

    }

}