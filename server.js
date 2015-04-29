var express = require('express'),
  http = require('http'),
  slides = require('./data/data2');

  var bodyParser = require('body-parser');
  var multer = require('multer');

var done = false;

var app = express()
  // .use(express.bodyParser())
  .use(express.static('public'));

app.use(multer({ dest: './public/images/',
 rename: function (fieldname, filename) {
    return filename;
  },
onFileUploadStart: function (file) {
  },
onFileUploadComplete: function (file) {
  done=true;
}
}));


app.get('/slides', function  (req, res) {
  res.json(slides);
});

app.post('/slides/new',function(req,res){
 
  if(done==true){
    //send rename file
  	res.end('VASA');
  }
});

app.post('/slides', function  (req, res) {
  var matches = slides.filter(function  (slide) {
    return slide.url === req.body.url;
  });

  if (matches.length > 0) {
    res.json(409, {status: 'slide already exists'});
  } else {
    req.body.id = req.body.url;
    slides.push(req.body);
    res.json(req.body);
  }

});

app.get('/slides/:slide_name', function  (req, res) {
  var matches = slides.filter(function  (slide) {
    return slide.url === req.params.slide_name;
  });

  if (matches.length > 0) {
    res.json(matches[0]);
  } else {
    res.json(404, {status: 'invalid menu slide'});
  }

});

app.delete('/slides/:slide_name', function  (req, res) {


  var found = false;

  slides.forEach(function (slide, index) {
    if (slide.url == req.params.slide_name) {
      found = index;
       console.log(found + ' ' + slide.url + ' ? ' + req.params.slide_name);
    }
  });

  if (found) {
    slides.splice(found, 1);
    res.json(200, {status: 'deleted'});
  } else {
    res.json(404, {status: 'invalid menu slide'});
  }

});

app.get('/*', function  (req, res) {
  res.json(404, {status: 'not found'});
});

http.createServer(app).listen(3000, function () {
  console.log("Server ready at http://localhost:3000");
});
