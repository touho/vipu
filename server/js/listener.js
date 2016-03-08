var util = require("./util");

var Listener = function() {
	this.id = util.generateId("l");

	this.cacheValue = 0;
	this.controller = null;
	this.controllerChangedTime = Date.now();
	this.listenerCreated = Date.now();
}
Listener.prototype = {
	setController: function(controller) {
		if (!controller)
			this.cacheValue = this.controller.value;

		this.controller = controller;
		this.controllerChangedTime = Date.now();
	},
	getChangesSince: function(lastChange) {
		if (this.controller) {
			if (this.controller.valueChanged > lastChange) {
				return {
					time: Date.now(),
					value: this.controller.value,
				};
			}
		} else {
			if (this.controllerChangedTime > lastChange) {
				return {
					time: Date.now(),
					value: this.cacheValue
				};
			}
		}

		return {
			ok: true
		};
	},
};

module.exports = Listener;
