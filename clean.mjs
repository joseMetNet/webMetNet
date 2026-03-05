import fs from 'fs';
let html = fs.readFileSync('stitch.html', 'utf8');
let out = "";
let i = 0;
while (true) {
    let start = html.indexOf('src="data:image/', i);
    if (start === -1) {
        out += html.slice(i);
        break;
    }
    out += html.slice(i, start + 5);
    let end = html.indexOf('"', start + 5);
    i = end;
}
fs.writeFileSync('stitch-clean.html', out);
