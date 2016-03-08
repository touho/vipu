var conf = require("./config");
var confDefaults = require("./config_defaults");
var _ = require("lodash");

module.exports = _.extend({}, confDefaults, conf);
