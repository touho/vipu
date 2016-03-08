var express = require('express');
var app = express();

var controllerManager = require("./js/controllerManager");
var listenerManager = require("./js/listenerManager");

app.use(express.static(__dirname + "/public"));

app.get('/createController', function (req, res) {
	var controller = controllerManager.getOrCreateController(req.query.id);
	res.send(controller);
});
app.get('/createListener', function (req, res) {
	var listener = listenerManager.getOrCreateListener(req.query.id);
	res.send(listener);
});
app.get('/getControllers', function (req, res) {
	var idList = controllerManager.getControllers();
	res.send(idList);
});
app.get('/getListeners', function (req, res) {
	var idList = listenerManager.getListeners();
	res.send(idList);
});
app.get('/setControllerValue', function (req, res) {
	var id = req.query.id;
	var value = ~~req.query.value;
	var rv = controllerManager.setValue(id, value);
	res.send(rv);
});
app.get('/getChanges', function (req, res) {
	var id = req.query.id;
	var lastChange = req.query.lastChanged;
	var changes = listenerManager.getChangesSince(id, lastChange);
	res.send(changes);
});

app.get('/link', function (req, res) {
	var controllerId = req.query.controllerId;
	var listenerId = req.query.listenerId;
	res.send(listenerManager.link(listenerId, controllerId));
});

app.listen(3000, function () {
	console.log('Vipu listening port 3000!');
});


/*



*/
