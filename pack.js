import { readFileSync, existsSync, mkdirSync } from 'fs';
import { parse, resolve } from 'path';
import AdmZip from 'adm-zip';
import { fileURLToPath } from 'url';
import { dirname } from 'path'; 

const __filename = fileURLToPath(import.meta.url); 
const __dirname = dirname(__filename);

try {
  const { base } = parse(__dirname);
  const { version } = JSON.parse(
    readFileSync(resolve(__dirname, 'package.json'), 'utf8')
  );

  const outdir = resolve(__dirname, 'release');c
  const filename = `${base}-v${version}.zip`;
  const zip = new AdmZip();
  zip.addLocalFolder(resolve(__dirname, 'dist'));
  if (!existsSync(outdir)) {
    mkdirSync(outdir);
  }
  zip.writeZip(`${outdir}/${filename}`);

  console.log(
    `Success! Created a ${filename} file under ${outdir} directory. You can upload this file to web store.`
  );
} catch (e) {
    console.error(e)
  console.error('Error! Failed to generate a zip file.');
}
