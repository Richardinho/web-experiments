var express = require('express');
var app = express();
app.use(express.static('.'));
app.listen(1234, function () {
	console.log('listening on 1234');
});
