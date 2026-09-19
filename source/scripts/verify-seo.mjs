import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), 'utf8');
const failures = [];

const layout = read('app/layout.tsx');
const robots = read('public/robots.txt');
const sitemap = read('public/sitemap.xml');

if (/index\s*:\s*false|follow\s*:\s*false|noindex|nofollow/i.test(layout)) {
  failures.push('app/layout.tsx contains a directive that blocks indexing or link discovery.');
}

if (!/^Allow:\s*\/$/mi.test(robots) || /^Disallow:\s*\/$/mi.test(robots)) {
  failures.push('public/robots.txt must allow the public site and must not disallow the root path.');
}

if (!/^Sitemap:\s*https:\/\/transactionsolutionsconsulting\.com\/sitemap\.xml$/mi.test(robots)) {
  failures.push('public/robots.txt must advertise the production sitemap URL.');
}

if (fs.existsSync(path.join(root, 'app/robots.ts')) || fs.existsSync(path.join(root, 'app/sitemap.ts'))) {
  failures.push('Duplicate app metadata routes must not coexist with the authoritative public robots and sitemap files.');
}

const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
if (sitemapUrls.length !== 14 || sitemapUrls.some((url) => !url.startsWith('https://transactionsolutionsconsulting.com/'))) {
  failures.push('public/sitemap.xml must contain the 14 canonical production URLs.');
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log('SEO source checks passed: public indexing enabled, one robots source, one sitemap source, and 14 canonical URLs.');
