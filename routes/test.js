

var fs = require('fs')

fs.writeFile('/Users/baidu/WebstormProjects/book-shopping/public/messImages/12663.txt', "12345", function (err) {
    if(err) console.error(err);
})