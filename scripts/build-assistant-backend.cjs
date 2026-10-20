// Produce the single file to paste into a new Apps Script project. No credentials are bundled.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const files = ['projects-data.js', 'assistant-knowledge.js', 'google-apps-script.gs'];
const source = '// Almat portfolio assistant — generated from repository sources.\n' +
    '// Paste this entire file into Apps Script Code.gs. API key: Script Properties only.\n\n' +
    files.map(file => '// ===== ' + file + ' =====\n' + fs.readFileSync(path.join(root, file), 'utf8').trim()).join('\n\n') + '\n';
new vm.Script(source, { filename: 'Code.gs' });
fs.mkdirSync(path.join(root, 'apps-script'), { recursive: true });
fs.writeFileSync(path.join(root, 'apps-script/Code.gs'), source);
console.log('Generated apps-script/Code.gs from ' + files.join(', '));
