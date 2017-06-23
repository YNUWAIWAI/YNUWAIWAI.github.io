const moment = require('moment');
const path = require('path');
const fs = require('fs');

const filename = process.argv[2] || 'sample';
const now = moment()
const post = {
  date: now.format('YYYY-MM-DD HH:mm:ss ZZ'),
  filename: `${now.format('YYYY-MM-DD')}-${filename}.md`,
  title: 'New Post!'
};

const dest = path.join(__dirname, '..', 'src', '_posts', post.filename);

const template =
`---
layout: post
title:  ${post.title}
date:   ${post.date}
---
本文
`;

fs.writeFile(dest, template, (err) => {
  if (err) {
    throw err;
  }
  console.log(`Create ${dest}`);
});
