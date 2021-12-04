import * as fs from 'fs';
import * as path from 'path';

export function readPacts(dir: string): Pact[] {
    const pactFiles = fs.readdirSync(dir).map((fileName) => {
        const filePath = path.join(dir, fileName);
        return {
            pact: JSON.parse(fs.readFileSync(filePath, 'utf8')) as Pact,
            path: filePath,
        };
    });

    if (pactFiles.length === 0) {
        throw new Error(`Pact directory ${dir} is empty.`);
    }

    const pactsWithEmptyInteractions = pactFiles.filter(
        ({ pact }) => pact.interactions.length === 0
    );

    if (pactsWithEmptyInteractions.length) {
        const errorMessage = pactsWithEmptyInteractions
            .map(
                ({ pact, path }) =>
                    `Pact interactions for provider: ${pact.provider?.name} in pact file ${path} are empty.`
            )
            .join('\n');
        throw new Error(errorMessage);
    }

    return pactFiles.map(({ pact }) => pact);
}

export interface Pact {
    provider?: { name?: string };
    interactions: Array<unknown>;
    [x: string]: any;
}
