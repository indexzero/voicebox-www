var http = require('http');
var fs = require('fs');
var concat = require('concat-stream');
var voicebox = require('voicebox-karaoke');
var ecstatic = require('ecstatic')({ root: __dirname + '/public' });

http.createServer(function (req, res) {
  console.log('%s', req.url);

  if (req.url === '/bump') {
    req.pipe(concat(function (data) {
      var parts = /roomId=([\w]+)\&song=([\d]+)/.exec('' + data);
      console.log('%s | %s @ %s', req.url, parts[1], parts[2]);
      var client = voicebox(parts[1]);
      client.bump(parts[2]);

      res.writeHead(200);
      res.end();
    }));
    return;
  }

  if (req.url === '/queue') {
    req.pipe(concat(function (data) {
      var client = voicebox(data.roomId);
      client.addSong(data.song);
      res.writeHead(200);
      res.end();
    }));
    return;
  }

  ecstatic(req, res);


}).listen(3000);