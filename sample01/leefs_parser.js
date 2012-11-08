
var jade = require('../jade')
  , watch = require('../watch/main')
  , path_media_image_jpg = __dirname + '/media_image_jpg.jade'
  , fn_media_image_jpg = jade.compile(require('fs').readFileSync(path_media_image_jpg, 'utf8'), { filename: path_media_image_jpg, pretty: true });

 watch.watchTree('/Users/gutenbergtechnology/Downloads/images/', function (f, curr, prev) {
    if (typeof f == "object" && prev === null && curr === null) {
        for (var j in f) {
            var s = { file:j };
            console.log(fn_media_image_jpg(s));	
        }
    } else if (prev === null) {
           console.dir("new "+f);
    } else if (curr.nlink === 0) {
        console.dir("removed "+f);
    } else {
        console.dir("changed "+f);
    }
});
