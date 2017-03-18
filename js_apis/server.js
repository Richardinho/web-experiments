var express = require('express');
var app = express();
app.use(express.static('.'));
app.listen(1555, function () {
	console.log('listening onf 1555');
});
