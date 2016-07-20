var c = require('.')

c(0, 330, function (current, count) {
  console.log(current + '/' + count)
})