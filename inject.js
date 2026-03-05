const fs = require('fs');
const path = require('path');

const baseDir = '/Volumes/SanDisk SSD/antigravity/animejs-demo';

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.resolve(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            if (file.endsWith('.html')) {
                results.push(file);
            }
        }
    });
    return results;
}

const htmlFiles = walk(baseDir);

htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes('global-nav.js')) {
        console.log(`Skipping (already injected): ${path.relative(baseDir, file)}`);
        return;
    }

    const rel = path.relative(baseDir, file);
    const depth = rel.split(path.sep).length - 1;
    const prefix = depth > 0 ? '../'.repeat(depth) : './';
    const scriptTag = `  <script src="${prefix}global-nav.js"></script>\n`;

    if (content.includes('</body>')) {
        content = content.replace('</body>', scriptTag + '</body>');
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Injected: ${rel}`);
    } else if (content.includes('<script src="demos.js"></script>')) {
        content = content.replace('  <script src="demos.js"></script>', scriptTag + '  <script src="demos.js"></script>');
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Injected into index style: ${rel}`);
    } else {
        console.log(`NO BODY TAG OR DEMOS.JS: ${rel}`);
    }
});

console.log("All done.");
