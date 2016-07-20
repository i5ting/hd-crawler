var fs = require('fs')
var debug = require('debug')('crawler')
var mkdirp = require('mkdirp');

exports.mkdir = function(path, folder){   
  mkdirp(path + '/' + folder, function (err) {
      if (err) console.error(err)
      else debug('pow!')
  });
}

exports.write_total_chapter = function(path, book){
  var content = " "
  
  fs.writeFile(path + '/'+ book.type + '/' + book.num + '.html', content, function (err) {
    if (err) throw err;
    debug('It\'s saved!');
  });
}

exports.write_chapter = function(path, book, chapter, content){
  content = content.replace('[笔趣库手机版 m.biquku.com]', '')
  
  fs.writeFile(path + '/' + book.type + '/'+ book.num + '/' + chapter.num + '.html', content, function (err) {
    if (err) throw err;
    debug('It\'s saved!');
  });
}

exports.write_config = function (path, book) {
  mkdirp.sync(path + '/'+ book.type + '/' + book.num);
  
  var content =  JSON.stringify(book, null, 4); // Indented 4 spaces
    console.log(path)
      console.log(book)
    console.log(content)
  fs.writeFile(path + '/'+ book.type + '/' + book.num + '/book.json', content, function (err) {
    if (err) throw err;
    debug('It\'s saved!');
  });
}
