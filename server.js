var express = require('express');
var strftime = require('strftime');

var app = express();

app.set('port', (process.env.PORT || 8080));
app.use(express.static(__dirname + '/views'));

app.all("*", function(request, response, next) {
  response.writeHead(200, { "Content-Type": "text/plain" });
  next();
});

app.get("/", function(request, response) {
    response.sendFile("/index.html");
});

app.get("/:qtime", function(request, response) {
    var time = parseParams(decodeURIComponent(request.params.qtime))
    
    response.end(JSON.stringify(getTS(time)));
});

app.get("*", function(request, response) {
  response.end("404!");
});

app.listen(app.get('port'), function () {
  console.log('timestamp-api app listening on port 8080!');
})

function getTS (time) {
  return {
    unix: time ? time.getTime()/1000 : null,
    natural: time ? strftime('%B %d, %Y', time) : null
  }
};

function parseParams (dateParam) {
  var pTime;
  if(/^\d+$/.test(dateParam)){
      pTime = new Date(+dateParam*1000);
  }
  else{
      pTime = new Date(dateParam);
  }
  
  return pTime != "Invalid Date" ? pTime : null;
};