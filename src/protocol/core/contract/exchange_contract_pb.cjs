// source: core/contract/exchange_contract.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {missingRequire} reports error on implicit type usages.
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
// @ts-nocheck

var jspb = require('google-protobuf');
var goog = jspb;
var global =
  (typeof globalThis !== 'undefined' && globalThis) ||
  (typeof window !== 'undefined' && window) ||
  (typeof global !== 'undefined' && global) ||
  (typeof self !== 'undefined' && self) ||
  (function () { return this; }).call(null) ||
  Function('return this')();

goog.exportSymbol('TronWebProto.ExchangeCreateContract', null, global);
goog.exportSymbol('TronWebProto.ExchangeInjectContract', null, global);
goog.exportSymbol('TronWebProto.ExchangeTransactionContract', null, global);
goog.exportSymbol('TronWebProto.ExchangeWithdrawContract', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
TronWebProto.ExchangeCreateContract = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(TronWebProto.ExchangeCreateContract, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  TronWebProto.ExchangeCreateContract.displayName = 'TronWebProto.ExchangeCreateContract';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
TronWebProto.ExchangeInjectContract = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(TronWebProto.ExchangeInjectContract, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  TronWebProto.ExchangeInjectContract.displayName = 'TronWebProto.ExchangeInjectContract';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
TronWebProto.ExchangeWithdrawContract = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(TronWebProto.ExchangeWithdrawContract, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  TronWebProto.ExchangeWithdrawContract.displayName = 'TronWebProto.ExchangeWithdrawContract';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
TronWebProto.ExchangeTransactionContract = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(TronWebProto.ExchangeTransactionContract, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  TronWebProto.ExchangeTransactionContract.displayName = 'TronWebProto.ExchangeTransactionContract';
}



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
TronWebProto.ExchangeCreateContract.prototype.toObject = function(opt_includeInstance) {
  return TronWebProto.ExchangeCreateContract.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!TronWebProto.ExchangeCreateContract} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
TronWebProto.ExchangeCreateContract.toObject = function(includeInstance, msg) {
  var f, obj = {
    ownerAddress: msg.getOwnerAddress_asB64(),
    firstTokenId: msg.getFirstTokenId_asB64(),
    firstTokenBalance: jspb.Message.getFieldWithDefault(msg, 3, 0),
    secondTokenId: msg.getSecondTokenId_asB64(),
    secondTokenBalance: jspb.Message.getFieldWithDefault(msg, 5, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!TronWebProto.ExchangeCreateContract}
 */
TronWebProto.ExchangeCreateContract.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new TronWebProto.ExchangeCreateContract;
  return TronWebProto.ExchangeCreateContract.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!TronWebProto.ExchangeCreateContract} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!TronWebProto.ExchangeCreateContract}
 */
TronWebProto.ExchangeCreateContract.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setOwnerAddress(value);
      break;
    case 2:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setFirstTokenId(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setFirstTokenBalance(value);
      break;
    case 4:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setSecondTokenId(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setSecondTokenBalance(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
TronWebProto.ExchangeCreateContract.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  TronWebProto.ExchangeCreateContract.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!TronWebProto.ExchangeCreateContract} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
TronWebProto.ExchangeCreateContract.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getOwnerAddress_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      1,
      f
    );
  }
  f = message.getFirstTokenId_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      2,
      f
    );
  }
  f = message.getFirstTokenBalance();
  if (f !== 0) {
    writer.writeInt64(
      3,
      f
    );
  }
  f = message.getSecondTokenId_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      4,
      f
    );
  }
  f = message.getSecondTokenBalance();
  if (f !== 0) {
    writer.writeInt64(
      5,
      f
    );
  }
};


/**
 * optional bytes owner_address = 1;
 * @return {!(string|Uint8Array)}
 */
TronWebProto.ExchangeCreateContract.prototype.getOwnerAddress = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * optional bytes owner_address = 1;
 * This is a type-conversion wrapper around `getOwnerAddress()`
 * @return {string}
 */
TronWebProto.ExchangeCreateContract.prototype.getOwnerAddress_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getOwnerAddress()));
};


/**
 * optional bytes owner_address = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getOwnerAddress()`
 * @return {!Uint8Array}
 */
TronWebProto.ExchangeCreateContract.prototype.getOwnerAddress_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getOwnerAddress()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!TronWebProto.ExchangeCreateContract} returns this
 */
TronWebProto.ExchangeCreateContract.prototype.setOwnerAddress = function(value) {
  return jspb.Message.setProto3BytesField(this, 1, value);
};


/**
 * optional bytes first_token_id = 2;
 * @return {!(string|Uint8Array)}
 */
TronWebProto.ExchangeCreateContract.prototype.getFirstTokenId = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * optional bytes first_token_id = 2;
 * This is a type-conversion wrapper around `getFirstTokenId()`
 * @return {string}
 */
TronWebProto.ExchangeCreateContract.prototype.getFirstTokenId_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getFirstTokenId()));
};


/**
 * optional bytes first_token_id = 2;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getFirstTokenId()`
 * @return {!Uint8Array}
 */
TronWebProto.ExchangeCreateContract.prototype.getFirstTokenId_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getFirstTokenId()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!TronWebProto.ExchangeCreateContract} returns this
 */
TronWebProto.ExchangeCreateContract.prototype.setFirstTokenId = function(value) {
  return jspb.Message.setProto3BytesField(this, 2, value);
};


/**
 * optional int64 first_token_balance = 3;
 * @return {number}
 */
TronWebProto.ExchangeCreateContract.prototype.getFirstTokenBalance = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!TronWebProto.ExchangeCreateContract} returns this
 */
TronWebProto.ExchangeCreateContract.prototype.setFirstTokenBalance = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};


/**
 * optional bytes second_token_id = 4;
 * @return {!(string|Uint8Array)}
 */
TronWebProto.ExchangeCreateContract.prototype.getSecondTokenId = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * optional bytes second_token_id = 4;
 * This is a type-conversion wrapper around `getSecondTokenId()`
 * @return {string}
 */
TronWebProto.ExchangeCreateContract.prototype.getSecondTokenId_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getSecondTokenId()));
};


/**
 * optional bytes second_token_id = 4;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getSecondTokenId()`
 * @return {!Uint8Array}
 */
TronWebProto.ExchangeCreateContract.prototype.getSecondTokenId_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getSecondTokenId()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!TronWebProto.ExchangeCreateContract} returns this
 */
TronWebProto.ExchangeCreateContract.prototype.setSecondTokenId = function(value) {
  return jspb.Message.setProto3BytesField(this, 4, value);
};


/**
 * optional int64 second_token_balance = 5;
 * @return {number}
 */
TronWebProto.ExchangeCreateContract.prototype.getSecondTokenBalance = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/**
 * @param {number} value
 * @return {!TronWebProto.ExchangeCreateContract} returns this
 */
TronWebProto.ExchangeCreateContract.prototype.setSecondTokenBalance = function(value) {
  return jspb.Message.setProto3IntField(this, 5, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
TronWebProto.ExchangeInjectContract.prototype.toObject = function(opt_includeInstance) {
  return TronWebProto.ExchangeInjectContract.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!TronWebProto.ExchangeInjectContract} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
TronWebProto.ExchangeInjectContract.toObject = function(includeInstance, msg) {
  var f, obj = {
    ownerAddress: msg.getOwnerAddress_asB64(),
    exchangeId: jspb.Message.getFieldWithDefault(msg, 2, 0),
    tokenId: msg.getTokenId_asB64(),
    quant: jspb.Message.getFieldWithDefault(msg, 4, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!TronWebProto.ExchangeInjectContract}
 */
TronWebProto.ExchangeInjectContract.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new TronWebProto.ExchangeInjectContract;
  return TronWebProto.ExchangeInjectContract.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!TronWebProto.ExchangeInjectContract} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!TronWebProto.ExchangeInjectContract}
 */
TronWebProto.ExchangeInjectContract.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setOwnerAddress(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setExchangeId(value);
      break;
    case 3:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setTokenId(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setQuant(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
TronWebProto.ExchangeInjectContract.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  TronWebProto.ExchangeInjectContract.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!TronWebProto.ExchangeInjectContract} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
TronWebProto.ExchangeInjectContract.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getOwnerAddress_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      1,
      f
    );
  }
  f = message.getExchangeId();
  if (f !== 0) {
    writer.writeInt64(
      2,
      f
    );
  }
  f = message.getTokenId_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      3,
      f
    );
  }
  f = message.getQuant();
  if (f !== 0) {
    writer.writeInt64(
      4,
      f
    );
  }
};


/**
 * optional bytes owner_address = 1;
 * @return {!(string|Uint8Array)}
 */
TronWebProto.ExchangeInjectContract.prototype.getOwnerAddress = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * optional bytes owner_address = 1;
 * This is a type-conversion wrapper around `getOwnerAddress()`
 * @return {string}
 */
TronWebProto.ExchangeInjectContract.prototype.getOwnerAddress_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getOwnerAddress()));
};


/**
 * optional bytes owner_address = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getOwnerAddress()`
 * @return {!Uint8Array}
 */
TronWebProto.ExchangeInjectContract.prototype.getOwnerAddress_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getOwnerAddress()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!TronWebProto.ExchangeInjectContract} returns this
 */
TronWebProto.ExchangeInjectContract.prototype.setOwnerAddress = function(value) {
  return jspb.Message.setProto3BytesField(this, 1, value);
};


/**
 * optional int64 exchange_id = 2;
 * @return {number}
 */
TronWebProto.ExchangeInjectContract.prototype.getExchangeId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!TronWebProto.ExchangeInjectContract} returns this
 */
TronWebProto.ExchangeInjectContract.prototype.setExchangeId = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional bytes token_id = 3;
 * @return {!(string|Uint8Array)}
 */
TronWebProto.ExchangeInjectContract.prototype.getTokenId = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * optional bytes token_id = 3;
 * This is a type-conversion wrapper around `getTokenId()`
 * @return {string}
 */
TronWebProto.ExchangeInjectContract.prototype.getTokenId_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getTokenId()));
};


/**
 * optional bytes token_id = 3;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getTokenId()`
 * @return {!Uint8Array}
 */
TronWebProto.ExchangeInjectContract.prototype.getTokenId_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getTokenId()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!TronWebProto.ExchangeInjectContract} returns this
 */
TronWebProto.ExchangeInjectContract.prototype.setTokenId = function(value) {
  return jspb.Message.setProto3BytesField(this, 3, value);
};


/**
 * optional int64 quant = 4;
 * @return {number}
 */
TronWebProto.ExchangeInjectContract.prototype.getQuant = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {number} value
 * @return {!TronWebProto.ExchangeInjectContract} returns this
 */
TronWebProto.ExchangeInjectContract.prototype.setQuant = function(value) {
  return jspb.Message.setProto3IntField(this, 4, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
TronWebProto.ExchangeWithdrawContract.prototype.toObject = function(opt_includeInstance) {
  return TronWebProto.ExchangeWithdrawContract.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!TronWebProto.ExchangeWithdrawContract} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
TronWebProto.ExchangeWithdrawContract.toObject = function(includeInstance, msg) {
  var f, obj = {
    ownerAddress: msg.getOwnerAddress_asB64(),
    exchangeId: jspb.Message.getFieldWithDefault(msg, 2, 0),
    tokenId: msg.getTokenId_asB64(),
    quant: jspb.Message.getFieldWithDefault(msg, 4, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!TronWebProto.ExchangeWithdrawContract}
 */
TronWebProto.ExchangeWithdrawContract.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new TronWebProto.ExchangeWithdrawContract;
  return TronWebProto.ExchangeWithdrawContract.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!TronWebProto.ExchangeWithdrawContract} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!TronWebProto.ExchangeWithdrawContract}
 */
TronWebProto.ExchangeWithdrawContract.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setOwnerAddress(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setExchangeId(value);
      break;
    case 3:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setTokenId(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setQuant(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
TronWebProto.ExchangeWithdrawContract.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  TronWebProto.ExchangeWithdrawContract.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!TronWebProto.ExchangeWithdrawContract} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
TronWebProto.ExchangeWithdrawContract.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getOwnerAddress_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      1,
      f
    );
  }
  f = message.getExchangeId();
  if (f !== 0) {
    writer.writeInt64(
      2,
      f
    );
  }
  f = message.getTokenId_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      3,
      f
    );
  }
  f = message.getQuant();
  if (f !== 0) {
    writer.writeInt64(
      4,
      f
    );
  }
};


/**
 * optional bytes owner_address = 1;
 * @return {!(string|Uint8Array)}
 */
TronWebProto.ExchangeWithdrawContract.prototype.getOwnerAddress = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * optional bytes owner_address = 1;
 * This is a type-conversion wrapper around `getOwnerAddress()`
 * @return {string}
 */
TronWebProto.ExchangeWithdrawContract.prototype.getOwnerAddress_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getOwnerAddress()));
};


/**
 * optional bytes owner_address = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getOwnerAddress()`
 * @return {!Uint8Array}
 */
TronWebProto.ExchangeWithdrawContract.prototype.getOwnerAddress_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getOwnerAddress()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!TronWebProto.ExchangeWithdrawContract} returns this
 */
TronWebProto.ExchangeWithdrawContract.prototype.setOwnerAddress = function(value) {
  return jspb.Message.setProto3BytesField(this, 1, value);
};


/**
 * optional int64 exchange_id = 2;
 * @return {number}
 */
TronWebProto.ExchangeWithdrawContract.prototype.getExchangeId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!TronWebProto.ExchangeWithdrawContract} returns this
 */
TronWebProto.ExchangeWithdrawContract.prototype.setExchangeId = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional bytes token_id = 3;
 * @return {!(string|Uint8Array)}
 */
TronWebProto.ExchangeWithdrawContract.prototype.getTokenId = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * optional bytes token_id = 3;
 * This is a type-conversion wrapper around `getTokenId()`
 * @return {string}
 */
TronWebProto.ExchangeWithdrawContract.prototype.getTokenId_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getTokenId()));
};


/**
 * optional bytes token_id = 3;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getTokenId()`
 * @return {!Uint8Array}
 */
TronWebProto.ExchangeWithdrawContract.prototype.getTokenId_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getTokenId()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!TronWebProto.ExchangeWithdrawContract} returns this
 */
TronWebProto.ExchangeWithdrawContract.prototype.setTokenId = function(value) {
  return jspb.Message.setProto3BytesField(this, 3, value);
};


/**
 * optional int64 quant = 4;
 * @return {number}
 */
TronWebProto.ExchangeWithdrawContract.prototype.getQuant = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {number} value
 * @return {!TronWebProto.ExchangeWithdrawContract} returns this
 */
TronWebProto.ExchangeWithdrawContract.prototype.setQuant = function(value) {
  return jspb.Message.setProto3IntField(this, 4, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
TronWebProto.ExchangeTransactionContract.prototype.toObject = function(opt_includeInstance) {
  return TronWebProto.ExchangeTransactionContract.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!TronWebProto.ExchangeTransactionContract} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
TronWebProto.ExchangeTransactionContract.toObject = function(includeInstance, msg) {
  var f, obj = {
    ownerAddress: msg.getOwnerAddress_asB64(),
    exchangeId: jspb.Message.getFieldWithDefault(msg, 2, 0),
    tokenId: msg.getTokenId_asB64(),
    quant: jspb.Message.getFieldWithDefault(msg, 4, 0),
    expected: jspb.Message.getFieldWithDefault(msg, 5, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!TronWebProto.ExchangeTransactionContract}
 */
TronWebProto.ExchangeTransactionContract.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new TronWebProto.ExchangeTransactionContract;
  return TronWebProto.ExchangeTransactionContract.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!TronWebProto.ExchangeTransactionContract} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!TronWebProto.ExchangeTransactionContract}
 */
TronWebProto.ExchangeTransactionContract.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setOwnerAddress(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setExchangeId(value);
      break;
    case 3:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setTokenId(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setQuant(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setExpected(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
TronWebProto.ExchangeTransactionContract.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  TronWebProto.ExchangeTransactionContract.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!TronWebProto.ExchangeTransactionContract} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
TronWebProto.ExchangeTransactionContract.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getOwnerAddress_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      1,
      f
    );
  }
  f = message.getExchangeId();
  if (f !== 0) {
    writer.writeInt64(
      2,
      f
    );
  }
  f = message.getTokenId_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      3,
      f
    );
  }
  f = message.getQuant();
  if (f !== 0) {
    writer.writeInt64(
      4,
      f
    );
  }
  f = message.getExpected();
  if (f !== 0) {
    writer.writeInt64(
      5,
      f
    );
  }
};


/**
 * optional bytes owner_address = 1;
 * @return {!(string|Uint8Array)}
 */
TronWebProto.ExchangeTransactionContract.prototype.getOwnerAddress = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * optional bytes owner_address = 1;
 * This is a type-conversion wrapper around `getOwnerAddress()`
 * @return {string}
 */
TronWebProto.ExchangeTransactionContract.prototype.getOwnerAddress_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getOwnerAddress()));
};


/**
 * optional bytes owner_address = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getOwnerAddress()`
 * @return {!Uint8Array}
 */
TronWebProto.ExchangeTransactionContract.prototype.getOwnerAddress_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getOwnerAddress()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!TronWebProto.ExchangeTransactionContract} returns this
 */
TronWebProto.ExchangeTransactionContract.prototype.setOwnerAddress = function(value) {
  return jspb.Message.setProto3BytesField(this, 1, value);
};


/**
 * optional int64 exchange_id = 2;
 * @return {number}
 */
TronWebProto.ExchangeTransactionContract.prototype.getExchangeId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!TronWebProto.ExchangeTransactionContract} returns this
 */
TronWebProto.ExchangeTransactionContract.prototype.setExchangeId = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional bytes token_id = 3;
 * @return {!(string|Uint8Array)}
 */
TronWebProto.ExchangeTransactionContract.prototype.getTokenId = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * optional bytes token_id = 3;
 * This is a type-conversion wrapper around `getTokenId()`
 * @return {string}
 */
TronWebProto.ExchangeTransactionContract.prototype.getTokenId_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getTokenId()));
};


/**
 * optional bytes token_id = 3;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getTokenId()`
 * @return {!Uint8Array}
 */
TronWebProto.ExchangeTransactionContract.prototype.getTokenId_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getTokenId()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!TronWebProto.ExchangeTransactionContract} returns this
 */
TronWebProto.ExchangeTransactionContract.prototype.setTokenId = function(value) {
  return jspb.Message.setProto3BytesField(this, 3, value);
};


/**
 * optional int64 quant = 4;
 * @return {number}
 */
TronWebProto.ExchangeTransactionContract.prototype.getQuant = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {number} value
 * @return {!TronWebProto.ExchangeTransactionContract} returns this
 */
TronWebProto.ExchangeTransactionContract.prototype.setQuant = function(value) {
  return jspb.Message.setProto3IntField(this, 4, value);
};


/**
 * optional int64 expected = 5;
 * @return {number}
 */
TronWebProto.ExchangeTransactionContract.prototype.getExpected = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/**
 * @param {number} value
 * @return {!TronWebProto.ExchangeTransactionContract} returns this
 */
TronWebProto.ExchangeTransactionContract.prototype.setExpected = function(value) {
  return jspb.Message.setProto3IntField(this, 5, value);
};


goog.object.extend(exports, TronWebProto);
