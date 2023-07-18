// create web server

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(express.static('public'));

app.get('/comment_get', function(req, res) {
    fs.readFile(__dirname + '/' + 'comments.json', 'utf8', function(err, data) {
        console.log(data);
        res.end(data);
    });
});

app.post('/comment_post', urlencodedParser, function(req, res) {
    var comment = {
        "name": req.body.name,
        "comment": req.body.comment
    };
    console.log(comment);
    fs.readFile(__dirname + '/' + 'comments.json', 'utf8', function(err, data) {
        data = JSON.parse(data);
        data.comments.push(comment);
        console.log(data);
        fs.writeFile(__dirname + '/' + 'comments.json', JSON.stringify(data), function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log("success");
            }
        });
        res.end(JSON.stringify(data));
    });
});

var server = app.listen(8080, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log("server is running at http://%s:%s", host, port);
});