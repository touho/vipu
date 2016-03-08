var Listener = require("./listener");
var controllerManager = require("./controllerManager");

var listeners = {};


var manager = {
	getOrCreateListener: function(id) {
		var listener = listeners[id];
		if (!listener) {
			listener = new Listener();
			listeners[listener.id] = listener;
		}
		return listener;
	},
	getListeners: function() {
		return listeners;
	},
	getChangesSince: function(id, lastChange) {
		var listener = listeners[id];
		if (!listener) return { ok: false };

		return listener.getChangesSince(lastChange);
	},
	link: function(listenerId, controllerId) {
		var listener = listeners[listenerId];
		if (!listener) return { ok: false };

		if (!controllerId) return listener.setController(null);

		var controller = controllerManager.getController(controllerId);
		if (!controller) return { ok: false };

		listener.setController(controller);
	},
};

module.exports = manager;