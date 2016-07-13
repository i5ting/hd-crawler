#!/usr/bin/env node

/**
 * Module dependencies.
 */

var program = require('commander');

var c = {
  category: 0,
  book : 330,
  path : 'dist'
}
program
  .version(require('../package.json').version)
  .option('-c, --category [type]', 'category')
  .option('-b, --book [type]', 'book')
  .option('-p, --path [type]', 'path default dist/')
  .parse(process.argv);


if (program.category) {
  c.category = program.category;
}

if (program.book) {
  c.book = program.book;
}

if (program.path) {
  c.path = program.path;
}

try {
  var crawler = require('..')(c.category, c.book, c.path)
} catch (e) {
  console.log(e)
}
