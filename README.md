# map-dom
Traverse a DOM node and build up a tree of JS objects for it and its children

`map-dom` doesn't make any assumptions about your output and gives you full flexability for constructing the resulting tree. All that is assumes is that you pass it an object that contains a `children` property which is an `array-like` that contains other objects with `children` properties. Note that this fits perfectly with DOM elements, but doesn't necessarily have to rely on the DOM.

## Use
`npm install --save map-dom`

```javascript
var mapDom = require("map-dom");

var element = document.getElementById("example");

var data = mapDom(element, map);

// {
//     something: "something",
//     children: [
//         {anotherOne:"1"},
//         {hello: "world"}
//     ]
// }

function map(element, children) {
    var data = toPlainObject(element.dataset);
    data.children = children();
    return data;
}

function toPlainObject(object) {
    return JSON.parse(JSON.stringify(object));
}
```

```html
<div id="example" data-something="something">
    <div data-another-one="1">
        Text gets ignored
    </div>
    <div data-hello="world">
    </div>
</div>
```

## API
### mapDom(element, fn(element, children()))
The element gets traversed and `fn` gets called on it, and all of its children.

`fn` gets invoked with the current element in the tree, and a function that will generate the results for the children. **Make sure to invoke children, otherwise traversal will stop**

## Test
At the moment there's just a simple test to see that everything work. More fine-grained unit tests would be nice.
- clone the repo
- `npm install`
- `npm run test`
