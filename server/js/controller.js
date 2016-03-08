var util = require("./util");

var Controller = function() {
	this.id = util.generateId("c");

	this.value = 0;
	this.valueChanged = Date.now()
	this.controllerCreated = Date.now();
}
Controller.prototype = {
	setValue: function(value) {
		this.value = value;
		this.valueChanged = Date.now();
	},
};

module.exports = Controller;
