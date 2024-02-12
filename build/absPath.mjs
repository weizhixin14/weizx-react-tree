import {fileURLToPath} from 'url';
import {resolve, dirname} from 'path';

const absPath = path => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    return resolve(__dirname, '..', path);
};

export default absPath;
