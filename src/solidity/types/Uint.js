'use strict'
var util = require('./util')
var ValueType = require('./ValueType')

class Uint extends ValueType {
  constructor (storageBytes) {
    super(1, storageBytes, 'uint')
  }
}

Uint.prototype.decodeFromStorage = function (location, storageContent) {
  return util.decodeInt(location, storageContent, this.storageBytes, false)
}

Uint.prototype.decodeFromStack = function (stackDepth, stack, memory) {
  if (stackDepth >= stack.length) {
    return '0'
  } else {
    return util.decodeIntFromHex(stack[stack.length - 1 - stackDepth].replace('0x', ''), this.storageBytes, false)
  }
}

Uint.prototype.decodeFromMemory = function (offset, memory) {
  var value = memory.substr(offset, 64)
  return util.decodeIntFromHex(value, this.storageBytes, false)
}

module.exports = Uint
