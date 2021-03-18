import * as fs from 'fs';
import * as path from 'path';

export function readPacts(dir: string): Pact[] {
    const fileNames = fs.readdirSync(dir);

    if (fileNames.length === 0) {
        throw new Error(`Pact directory ${dir} is empty.`);
    }

    return fileNames.map((fileName) => {
        const filePath = path.join(dir, fileName);
        return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    });
}

export interface Pact {
    provider?: { name?: string };
    [x: string]: any;
}
