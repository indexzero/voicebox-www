var http = require('http');
var fs = require('fs');
var concat = require('concat-stream');
var voicebox = require('voicebox-karaoke');

http.createServer(function (req, res) {

  if (req.url === '/') {
    return fs.createReadStream(__dirname + '/public/index.html')
      .pipe(res);
  }

  if (req.url === '/bump') {
    req.pipe(concat(function (data) {
      var client = voicebox(data.roomId);
      client.bump(data.song);
    }));
    return;
  }

  if (req.url === '/queue') {
    req.pipe(concat(function (data) {
      var client = voicebox(data.roomId);
      client.addSong(data.song);
    }));
    return;
  }
}).listen(3000);

