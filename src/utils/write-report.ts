import path from 'path';
import fs from 'fs';

export function writeReport(outFile: string, htmlReport: string) {
    const pathToReportDir = path.dirname(outFile);
    if (!fs.existsSync(pathToReportDir)) {
        fs.mkdirSync(pathToReportDir, { recursive: true });
    }
    fs.writeFileSync(`${outFile}.html`, htmlReport);
}
