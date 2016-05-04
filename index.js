"use strict";

module.exports = mapDom;

function mapDom(element, fn) {
	return fn(element, mapChildren(element.children, fn));
}

function mapChildren(children, fn) {
	return function() {
		var length = children.length;
		var index = 0;
		var results = [];
		for (; index < length; index++) {
			var child = children[index];
			results.push(mapDom(child, fn));
		}
		return results;
	};
}
