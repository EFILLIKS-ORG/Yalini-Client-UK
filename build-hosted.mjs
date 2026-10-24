// Makes hosted.html from index.html for publishing as a claude.ai Artifact
// (the host adds its own doctype/html/head/body wrapper). Images publish alongside from ./images.
// Run: node "<this folder>\build-hosted.mjs"
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const here = import.meta.dirname;
const src = readFileSync(join(here, 'index.html'), 'utf8');
const out = src
  .replace(/<!doctype html>\s*/i, '')
  .replace(/<html[^>]*>\s*<head>\s*/i, '')
  .replace(/<meta charset="utf-8">\s*<meta name="viewport"[^>]*>\s*/i, '')
  .replace(/<title>.*?<\/title>/, '<title>Hearth &amp; Home Demo</title>')
  .replace(/<\/head>\s*<body>\s*/i, '')
  .replace(/\s*<\/body>\s*<\/html>\s*$/i, '\n');
writeFileSync(join(here, 'hosted.html'), out);
console.log('hosted.html written', out.length, 'chars');
