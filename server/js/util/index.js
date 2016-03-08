var idCounter = 1;

module.exports = {
	generateId: function(type) {
		return type + "_" + idCounter++;
	}
};
