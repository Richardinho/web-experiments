var express = require('express');
var app = express();
var port = 4631;
function appHandler() {
	console.log('listening on port', port);
}
app.use(express.static('.'));
app.listen(port, appHandler);
