# construct-map

Turns entries into a Map or other key-value collection.

Useful when you’re not sure ahead of time what type of collection it’ll be.

## Installation

Requires [Node.js](https://nodejs.org/) 6.0.0 or above.

```bash
npm i construct-map
```

## API

The module exports a single function.

### Parameters

1. `Cls` (object, function, or string): The class to construct, an instance of the desired class, or the global string name of the class. The class to which this argument refers can be just about any built-in collection (`Array`, `Map`, `Object`, `Set`, Typed Arrays, `WeakMap`, `WeakSet`), or any class that accepts an `entries` iterable as the first argument of its constructor.
2. `entries` (iterable): A collection of key-value pairs. (If constructing an `Array`, `Set`, `WeakSet`, or Typed Array, the keys will be ignored.)

### Return Value

A `Cls` object constructed with `entries`.

## Example

```javascript
const constructMap = require('construct-map')

const map = constructMap(Map, [['key', 'value']])
map.get('key') // 'value'

constructMap(Object, [['key', 'value']]) // {key: 'value'}

// The module is particularly useful for reassembling a collection
// after performing some operation on its entries.
const doSomething = x => x
const obj = {key: 'value'}
constructMap(obj, doSomething(Object.entries(obj))) // {key: 'value'}
```
