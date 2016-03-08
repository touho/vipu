
$(function() {
	$("#controllers").before($("<button>").text("create").click(function() {
		$.get("createController").done(function(results) {
		});
	}));
	$("#listeners").before($("<button>").text("create").click(function() {
		$.get("createListener").done(function(results) {
		});
	}));
});




function createSetValueButton(controllerId) {
	return $("<button>").text("set").click(function() {
		var value = prompt("value");
		$.get("setControllerValue?id="+controllerId+"&value="+ ~~value).done(function(results) {
		});
	});
}
function updateControllers() {
	$.get("getControllers").done(function(results) {
		var controllers = $("#controllers").empty();
		for (var k in results) {
			var button = createSetValueButton(k);
			controllers.append(k + ": " + results[k].value);
			controllers.append(button, "<br>");
		}
	});
}
setInterval(updateControllers, 1000);
updateControllers();









function createLinkButton(listenerId) {
	return $("<button>").text("link").click(function() {
		var id = prompt("controller id");
		$.get("link?controllerId="+id+"&listenerId="+listenerId).done(function(results) {
		});
	});
}
var listeners = {};
var listenerValues = {};
function updateListeners() {
	$.get("getListeners").done(function(results) {
		listeners = results;
		var listenerList = $("#listeners").empty();
		for (var k in results) {
			var l = results[k];
			var c = l.controller;
			var value = c ? c.value : "-";
			var button = createLinkButton(l.id);
			listenerList.append(k + ": " + value + " listening " + (c ? c.id : "-"));
			listenerList.append(button, "<br>");
		}
	});
}
setInterval(updateListeners, 1000);
updateListeners();



var lastChange = 0;
function updateChanges() {
	function get(id) {
		$.get("getChanges?id="+id+"&lastChanged="+lastChange).done(function(results) {
			if (results.value == undefined) return;
			listenerValues[id] = results.value;
			console.log(results.value);
			lastChange = results.time;
		});
	}
	for (var id in listeners) {
		get(id);
	}
}
setInterval(updateChanges, 1000);


