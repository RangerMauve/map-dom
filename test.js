"use strict";
var test = require("tape");
var mapDom = require("./");

var testContents = "<div data-foo='bar'>" +
	"<div data-index='1' data-cats-are='cool'></div>" +
	"<div data-index='2' data-cats-are='cool'></div>" +
	"<div data-index='3' data-cats-are='cool'>Text is ignored! :D</div>" +
	"<div data-index='4' data-cats-are='cool'></div>" +
	"</div>";

test("kitchen sink", function(t) {
	t.plan(1);

	document.body.innerHTML = testContents;

	var element = document.body.children[0];

	var results = mapDom(element, map);

	var expected = {
		foo: "bar",
		children: [{
			index: "1",
			catsAre: "cool",
			children: []
		}, {
			index: "2",
			catsAre: "cool",
			children: []
		}, {
			index: "3",
			catsAre: "cool",
			children: []
		}, {
			index: "4",
			catsAre: "cool",
			children: []
		}]
	};

	t.deepEqual(results, expected, "mapped tree contains all children and data attributes");

	function map(element, children) {
		var data = toPlainObject(element.dataset);
		data.children = children();
		return data;
	}

	function toPlainObject(object) {
		return JSON.parse(JSON.stringify(object));
	}
});
