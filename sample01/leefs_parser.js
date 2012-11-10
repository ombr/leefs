var leefs_publish        = require('http').createServer(handler)
  , leefs_io             = require('socket.io').listen(leefs_publish)
  , leefs_parse          = require('watch/main')
  , jade                 = require('jade')
  , path_media_image_jpg = __dirname + '/media_image_jpg.jade'
  , fn_media_image_jpg   = jade.compile(require('fs').readFileSync(path_media_image_jpg, 'utf8'), { filename: path_media_image_jpg, pretty: true })
  , fs                   = require('fs')
  , store                = [];

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

leefs_io.sockets.on('connection', function (socket) {
  socket.emit('sync', { data : store });
});

leefs_parse.watchTree(process.argv[2], function (f, curr, prev) {
    if (typeof f == "object" && prev === null && curr === null) {
        for (var j in f) {
            var s = { file:j };
            console.log(fn_media_image_jpg(s));
            store[store.length]=fn_media_image_jpg(s);
        }
    } else if (prev === null) {
           console.dir("new "+f);
    } else if (curr.nlink === 0) {
      //removed
    } else {
      //changed
    }
});

leefs_publish.listen(8080);

