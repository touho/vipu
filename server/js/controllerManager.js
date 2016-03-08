var Controller = require("./controller");

var controllers = {};


var manager = {
	getOrCreateController: function(id) {
		var controller = controllers[id];
		if (!controller) {
			controller = new Controller();
			controllers[controller.id] = controller;
		}
		return controller;
	},
	getControllers: function() {
		return controllers;
	},
	setValue: function(id, value) {
		var controller = controllers[id];
		if (!controller) return { ok: false };

		controller.setValue(value);
		return { ok: true };
	},
	getChangesSince: function(lastChange) {
		var changes = [];
		for (var k in controllers) {
			if (controllers[k].valueChanged > lastChange)
				changes.push(controllers[k]);
		}
		return changes;
	},
	getController: function(id) {
		return controllers[id];
	}
};

module.exports = manager;