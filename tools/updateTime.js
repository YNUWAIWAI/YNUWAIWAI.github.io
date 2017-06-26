const moment = require('moment');
const readline = require('readline');
const fs = require('fs');
const path = require('path');

const now = moment();
const inputFileName = path.basename(process.argv[2]);
const outputFileName = inputFileName.replace(/^\d\d\d\d-\d\d-\d\d/, now.format('YYYY-MM-DD'));
const input = path.resolve(__dirname, '..', 'src', '_posts', inputFileName);
const output = path.resolve(__dirname, '..', 'src', '_posts', outputFileName);

fs.stat(input, (err) => {
  if (err) {
    if (err.code === 'ENOENT') {
      console.error(`${input}: file does not exist`);

      return;
    }
    throw err;
  }

  const rl = readline.createInterface({
    input: fs.createReadStream(input),
  });
  const dest = fs.createWriteStream(output);
  const regexp = /(date:\s*)\d\d\d\d-\d\d-\d\d \d\d:\d\d:\d\d [+-]\d\d\d\d/;
  let count = 0;

  rl.on('line', (line) => {
    if ((/^---$/).test(line)) {
      count++;
    }

    if (count < 2 && regexp.exec(line)) {
      line = line.replace(regexp, `$1${now.format('YYYY-MM-DD HH:mm:ss ZZ')}`);
    }
    dest.write(line);
    dest.write('\n');
  });

  rl.on('close', () => {
    fs.unlink(input, (err) => {
      if (err) {
        throw err;
      }
      console.log(`--- ${input}`);
    });
    console.log(`+++ ${output}`);
  });
});
