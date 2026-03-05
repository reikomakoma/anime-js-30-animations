const fs = require('fs');
const path = require('path');

const baseDir = '/Volumes/SanDisk SSD/antigravity/animejs-demo';

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const filePath = path.resolve(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            if (file !== 'node_modules' && file !== '.git') {
                results = results.concat(walk(filePath));
            }
        } else if (file.endsWith('.html')) {
            results.push(filePath);
        }
    });
    return results;
}

const htmlFiles = walk(baseDir);

htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    const rel = path.relative(baseDir, file);
    const depth = rel.split(path.sep).length - 1;
    const prefix = depth > 0 ? '../'.repeat(depth) : './';

    const cssTag = `<link rel="stylesheet" href="${prefix}global-nav.css">`;
    const scriptTag = `<script src="${prefix}global-nav.js"></script>`;

    let modified = false;

    // 1. CSS Injection (into <head>)
    if (!content.includes('global-nav.css')) {
        if (content.includes('</head>')) {
            content = content.replace('</head>', `    ${cssTag}\n</head>`);
            modified = true;
        }
    }

    // 2. JS Injection (before </body>)
    if (!content.includes('global-nav.js')) {
        if (content.includes('</body>')) {
            content = content.replace('</body>', `  ${scriptTag}\n</body>`);
            modified = true;
        }
    } else {
        // Fix existing script tag if path is wrong
        const regex = /<script src="[^"]*global-nav\.js"><\/script>/;
        const correctTag = `<script src="${prefix}global-nav.js"></script>`;
        if (content.match(regex) && !content.includes(correctTag)) {
            content = content.replace(regex, correctTag);
            modified = true;
        }
    }

    if (modified) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated: ${rel}`);
    } else {
        console.log(`No changes needed: ${rel}`);
    }
});

console.log("All done.");
