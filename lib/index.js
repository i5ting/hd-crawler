var ProgressBar = require('progress')
var debug = require('debug')('crawler')
var Crawler = require("crawler")
var url = require('url')
var fs = require('fs')
var jsdom = require('jsdom')
var utils = require('./utils')

var current_book = { }
var bar
var c

function info(download_path, num){
  utils.mkdir(download_path, num)
}

function get_all_chapters(download_path, processing){
  for(var j = 0;  j< current_book.chapters.length;  j++){
    var chapter = current_book.chapters[j]
    // debug(chapter)
    one(current_book, chapter,download_path, processing)
  }
  
  utils.write_config(download_path, current_book)
  
  var green = '\u001b[42m \u001b[0m'
  var red = '\u001b[41m \u001b[0m'
  
  if (!processing) {   
    bar = new ProgressBar('  downloading :title [:bar] :percent :elapseds', {
      complete: green,
      incomplete: red,
      width: 20,
      total: (current_book.chapters.length - 1)
    })
  }
}

function one(book, chapter, download_path, processing){
  debug(chapter)
  
  var arr = [current_book.type, current_book.num]
  
  debug('http://www.biquku.com/' + arr[0] +'/' + arr[1] + '/' + chapter + '.html')
  
  if(require('fs').existsSync(download_path + '/' + arr[0] +'/' + arr[1] + '/' + chapter + '.html')){
    console.log('exist')
    if (current_book.one === current_book.chapters.length-1 ){
      debug('complete fetch!')
      setTimeout(function(){
        process.exit()
      }, 1000)
    }
    current_book.one++
    
    console.log(__dirname + '/dist/' + arr[0] +'/' + arr[1] + '/' + chapter + '.html exist...')
  } else {
    c.queue([{
      uri: 'http://www.biquku.com/' + arr[0] +'/' + arr[1] + '/' + chapter + '.html',
      jQuery: jsdom,
      forceUTF8:true,
      // The global callback won't be called
      callback: function (error, result, $) {
          //bar
          // bar.complete
        var count = (current_book.chapters.length-1);
        
        // 进度
        if (!processing) {
          bar.tick({ title: current_book.one + '/'+ (current_book.chapters.length-1)  })
        } else {
          processing(current_book.one, count)
        }
        
        debug(error)
        debug('http://www.biquku.com/' + arr[0] +'/' + arr[1] + '/' + chapter + '.html')
        
        var content = $('#content').html()
        utils.write_chapter(download_path, current_book, chapter, content)
      
        // console.log(' ------- ' + current_book.one + '/'+ (current_book.chapters.length-1) )
      
        if (current_book.one === current_book.chapters.length-1 ){
          debug('complete fetch!')
          setTimeout(function(){
            process.exit()
          }, 1000)
        }
        current_book.one++
      }
    }])
  }
}

// http://www.biquku.com/6/6327/
// start('6/6327')
// start(0, 330)
// processing = function(current, count) {{}
module.exports = function start (category, book, processing, download_path) {
  var num = category + '/' + book
  
  if (download_path) {
    download_path = download_path
  }else {
    download_path = 'dist'
  }
  
  utils.mkdir('.', download_path)
  
  if (processing) {
    processing = processing
  } else {
    processing = function (current, count) {
      console.log(current + '/' + count)
    }
  }
  
  c = new Crawler({
      jQuery: jsdom,
      maxConnections : 1000,
      forceUTF8:true,
    // incomingEncoding: 'gb2312',
      // This will be called for each crawled page
      callback : function (error, result, $) {
        var urls = $('#list a')

        current_book.title = $('#maininfo h1').text()
        current_book.author = $('#info p').eq(0).text()
        current_book.update_time = $('#info p').eq(2).text()
        current_book.latest_chapter = $('#info p').eq(3).html()
        current_book.intro = $('#intro').html()
        current_book.chapters = []

        for(var i = 0; i< urls.length; i++){
          var url = urls[i]
        
          debug(i + ' = ' + $(url).attr('href'))

          var _url = $(url).attr('href')+""
          var num = _url.replace('.html','')
          var title = $(url).text()

          debug(_url)
          debug(title)

          current_book.chapters.push({
            num: num,
            title: title,
            url: _url
          })
        }
      
        debug(current_book)
      
        // 
        // one('153070')
        get_all_chapters(download_path, processing)
      }
  })
  
  // Queue just one URL, with default callback
  c.queue('http://www.biquku.com/' + num + '/')
  
  var arr = num.split('/')
  current_book.type = arr[0]
  current_book.num = arr[1]
  current_book.one = 0
  
  info(download_path, num)
}