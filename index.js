'use strict'

const is = require('is-instance-of')
const isArrayOfLength = require('is-array-of-length')
const isObject = require('is-object')
const newObject = require('new-object')
const typedArrays = require('typed-arrays').names()

module.exports = function constructMap (Cls, entries = []) {
  if (isObject(Cls)) Cls = Cls.constructor
  if (typeof Cls !== 'function') throw new TypeError('construct-map argument 1 must be object or function')

  if (Cls.name === 'Object') return newObject(entries)

  entries = Array.from(entries)
  if (is(Cls, ['Array', 'Set', typedArrays, 'WeakSet']) && entries.every(entry => isArrayOfLength(entry, 2))) {
    entries = entries.map(entry => entry[1])
  }

  if (Cls.name === 'Array') return entries

  if (is(Cls, 'Array')) {
    const arr = new Cls()
    arr.push(...entries)
    return arr
  }

  return new Cls(entries)
}
