const beautify = require('js-beautify').html;
const fs = require('fs');
const glob = require('glob');
const option = {
  'extra_liners': [ 'article', 'aside', 'body', 'footer', 'header', 'main', 'nav', 'section' ],
  'indent_size': 2,
  'max_preserve_newlines': 0,
  'type': 'html',
  'unformatted': []
};
const files = glob.sync('_site/**/*.html');

for (const file of files) {
  const html = fs.readFileSync(file, 'utf-8');
  fs.writeFileSync(file, beautify(html, option));
  console.log(`beautify ${file}`);
}
