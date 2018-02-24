'use strict'

const assert = require('assert')
const constructMap = require('.')

describe('constructMap()', function () {
  it('should construct a Map if a Map is provided', function () {
    assert.strictEqual(constructMap(new Map()).constructor, Map)
  })

  it('should construct with the Map subclass of the object provided', function () {
    class XMap extends Map {}
    assert.strictEqual(constructMap(new XMap()).constructor, XMap)
  })

  it('should construct an Object if an Object is provided', function () {
    assert.strictEqual(constructMap({}).constructor, Object)
  })

  it('should construct an Array containing the given entries, ignoring indexes', function () {
    const arr = constructMap([], [[1, 1]])
    assert.strictEqual(arr.length, 1)
    assert.strictEqual(arr[0], 1)
  })

  it('should construct with the Array subclass of the object provided', function () {
    class XArray extends Array {}
    const xarr1 = new XArray('a', 'b')
    const xarr2 = constructMap(xarr1, xarr1[Symbol.iterator]())
    assert.strictEqual(xarr2.constructor, XArray)
    assert.strictEqual(xarr2.length, 2)
    assert.strictEqual(xarr2[0], 'a')
    assert.strictEqual(xarr2[1], 'b')
  })

  it('should construct a Map containing the given entries', function () {
    const map1 = new Map([['a', 1]])
    const map2 = constructMap(map1, map1.entries())
    assert.notStrictEqual(map1, map2)
    assert.strictEqual(map2.size, 1)
    assert.strictEqual(map2.get('a'), 1)
  })

  it('should construct an Object containing the given entries', function () {
    const obj1 = {a: 1}
    const obj2 = constructMap(obj1, Object.entries(obj1))
    assert.notStrictEqual(obj1, obj2)
    assert.strictEqual(Object.keys(obj2).length, 1)
    assert.strictEqual(obj2.a, 1)
  })

  it('should construct a Set containing the given entries, ignoring indexes', function () {
    const set = constructMap(Set, [[1, 'a']])
    assert.strictEqual(set.size, 1)
    assert.strictEqual(set.values().next().value, 'a')
  })

  it('should construct a WeakMap containing the given entries', function () {
    const key = {}
    const wm = constructMap(WeakMap, [[key, 'value']])
    assert.strictEqual(wm.get(key), 'value')
  })
})
