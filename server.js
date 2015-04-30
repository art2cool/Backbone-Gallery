var express = require('express');
var path = require('path');
var http = require('http');
var routes = require('./routes/index');
var fs = require('fs');
var bodyParser = require('body-parser');
var multer = require('multer');
var data = require('./public/data2.json');

var app = express();
var done = false;

app.use(multer({ dest: './public/images/',
 rename: function (fieldname, filename) {
    return filename; //+ Date.now();
  },
  onFileUploadStart: function (file) {
  },
  onFileUploadComplete: function (file) {
    done=true;
  }
}));

app.set('port', 3000);

http.createServer(app).listen(app.get('port'),  function() {
  console.log('Express server has started ' + app.get('port') );
});

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended : false }));

app.use('/', routes);

app.post('/api/photo', function (req, res) {
  if(done==true){
    res.end("File uploaded. Good boy");
  }
});


app.get('/slides', function(req, res) {
  res.json(data);
});

app.get('/slides/:slide_name', function  (req, res) {
 data.forEach(function (slide, index) {
  if (slide.url == req.params.slide_name) {
    res.json(data[index]);
  }
});
});
 app.delete('/slides/:slide_name', function (req, res) {
  var found = false;
  data.forEach(function (slide, index) {
    if (slide.url == req.params.slide_name) {

      found = index;
     }
  });

  if (found) {
    data.splice(found, 1);
    var str = JSON.stringify(data);
     fs.writeFile('./public/data2.json', str, function (err) {
    console.log(err);
  });
  res.json(200, {status: 'deleted'});
} else {
  res.json(404, {status: 'invalid menu slide'});
}
});

// app.post('/add', function(req, res) {
//   var title   = req.body.title;
//   var img = req.body.img;
//   fs.readFile('./public/data2.json', function(error, data){
//     var objdata = JSON.parse(data);
//     var keyb = 0;
//       for (var key in objdata){
//         if (parseInt(key) > keyb) keyb = key;
//       }
//       keyb++;

//     objdata[keyb] = {"idN": keyb, "title" : title, "img" : img};
//     var str = JSON.stringify(objdata);
//     fs.writeFile('./public/data2.json', str , function(err) {
//     });
//   });
// res.end('keyb');
// });

app.use(function(req, res) {
  var err = new Error('Not Found');
  err.status = 404;
  res.end(err);
});


