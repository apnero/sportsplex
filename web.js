var express = require('express');
var pg = require('pg');

var app = express.createServer();
app.use(express.static(__dirname ));

app.use(express.bodyParser());

var postmark = require("postmark")("f403df90-28cf-4da4-9819-eaa0773a7b83")


app.post('/getFormData', function(req, res) {
  postmark.send({
    "From": "email@plasmascape.com",
    "To": "andrew@plasmascape.com",
    "Subject": "EMAIL FROM PHILLYS WEB SITE",
    "TextBody": new String('From: ' + req.body.name + '.\n\rEmail: ' + req.body.email  + '.\n\rSubject: ' + req.body.phone + '.\n\rMessage: ' + req.body.message)
	}, function(error, success) {
    if(error) {
        res.send("We have had technical difficulties and we regret to say you email hasn't been delivered to PlasmaGFX");
       return;
    }
    res.send("Thank you for contacting us.  We will respond as soon as possible.")
	});
  
});

app.post('/getEmailData', function(req, res) {
	
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
	  client.query("INSERT INTO emails VALUES ($1)", [req.body.email], function(err, result) {
		done();
		if(err) return console.error(err + 'in here');
		console.log(result.rows);
	  });
	});

});


var port = process.env.PORT || 3000;

app.listen(port);