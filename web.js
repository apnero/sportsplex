var express = require('express');
var app = express.createServer();
app.use(express.static(__dirname ));

app.use(express.bodyParser());

var postmark = require("postmark")("ff4a1e02-a2bf-4b6a-9a1d-763471e06995")



app.post('/getFormData', function(req, res) {
  postmark.send({
    "From": "email@plasmascape.com",
    "To": "info@sportsplexbethel.com",
    "Subject": "EMAIL FROM Sportsplex WEBSITE",
    "TextBody": new String('From: ' + req.body.name + '.\n\rPhone: ' + req.body.phone + '.\n\rEmail: ' + req.body.email + '.\n\rMessage: ' + req.body.message)
	}, function(error, success) {
    if(error) {
        res.send("We have had technical difficulties and we regret to say you email hasn't been delivered to Sportsplex.");
       return;
    }
    res.send("Thank you for contacting us.  We will respond as soon as possible.")
	});
  
});


var port = process.env.PORT || 3000;

app.listen(port);