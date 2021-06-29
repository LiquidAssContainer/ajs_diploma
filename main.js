/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 131);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var check = function (it) {
  return it && it.Math == Math && it;
}; // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028


module.exports = // eslint-disable-next-line es/no-global-this -- safe
check(typeof globalThis == 'object' && globalThis) || check(typeof window == 'object' && window) || // eslint-disable-next-line no-restricted-globals -- safe
check(typeof self == 'object' && self) || check(typeof global == 'object' && global) || // eslint-disable-next-line no-new-func -- fallback
function () {
  return this;
}() || Function('return this')();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(94)))

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);

var shared = __webpack_require__(49);

var has = __webpack_require__(5);

var uid = __webpack_require__(50);

var NATIVE_SYMBOL = __webpack_require__(54);

var USE_SYMBOL_AS_UID = __webpack_require__(78);

var WellKnownSymbolsStore = shared('wks');
var Symbol = global.Symbol;
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!has(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
    if (NATIVE_SYMBOL && has(Symbol, name)) {
      WellKnownSymbolsStore[name] = Symbol[name];
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
    }
  }

  return WellKnownSymbolsStore[name];
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);

var getOwnPropertyDescriptor = __webpack_require__(13).f;

var createNonEnumerableProperty = __webpack_require__(11);

var redefine = __webpack_require__(16);

var setGlobal = __webpack_require__(46);

var copyConstructorProperties = __webpack_require__(70);

var isForced = __webpack_require__(75);
/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
*/


module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;

  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }

  if (target) for (key in source) {
    sourceProperty = source[key];

    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];

    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced); // contained in target

    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty === typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    } // add a flag to not completely full polyfills


    if (options.sham || targetProperty && targetProperty.sham) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    } // extend global


    redefine(target, key, sourceProperty, options);
  }
};

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var toObject = __webpack_require__(10);

var hasOwnProperty = {}.hasOwnProperty;

module.exports = function hasOwn(it, key) {
  return hasOwnProperty.call(toObject(it), key);
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);

module.exports = function (it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object');
  }

  return it;
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(3); // Detect IE8's incomplete defineProperty implementation


module.exports = !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, {
    get: function () {
      return 7;
    }
  })[1] != 7;
});

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(7);

var IE8_DOM_DEFINE = __webpack_require__(69);

var anObject = __webpack_require__(6);

var toPrimitive = __webpack_require__(35); // eslint-disable-next-line es/no-object-defineproperty -- safe


var $defineProperty = Object.defineProperty; // `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty

exports.f = DESCRIPTORS ? $defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) {
    /* empty */
  }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__(68);

var requireObjectCoercible = __webpack_require__(34);

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var requireObjectCoercible = __webpack_require__(34); // `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject


module.exports = function (argument) {
  return Object(requireObjectCoercible(argument));
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(7);

var definePropertyModule = __webpack_require__(8);

var createPropertyDescriptor = __webpack_require__(27);

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(38);

var min = Math.min; // `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength

module.exports = function (argument) {
  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(7);

var propertyIsEnumerableModule = __webpack_require__(67);

var createPropertyDescriptor = __webpack_require__(27);

var toIndexedObject = __webpack_require__(9);

var toPrimitive = __webpack_require__(35);

var has = __webpack_require__(5);

var IE8_DOM_DEFINE = __webpack_require__(69); // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe


var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor; // `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor

exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) {
    /* empty */
  }
  if (has(O, P)) return createPropertyDescriptor(!propertyIsEnumerableModule.f.call(O, P), O[P]);
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__(72);

var global = __webpack_require__(0);

var aFunction = function (variable) {
  return typeof variable == 'function' ? variable : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global[namespace]) : path[namespace] && path[namespace][method] || global[namespace] && global[namespace][method];
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toIndexedObject = __webpack_require__(9);

var addToUnscopables = __webpack_require__(62);

var Iterators = __webpack_require__(30);

var InternalStateModule = __webpack_require__(29);

var defineIterator = __webpack_require__(82);

var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR); // `Array.prototype.entries` method
// https://tc39.es/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.es/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.es/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.es/ecma262/#sec-createarrayiterator

module.exports = defineIterator(Array, 'Array', function (iterated, kind) {
  setInternalState(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject(iterated),
    // target
    index: 0,
    // next index
    kind: kind // kind

  }); // `%ArrayIteratorPrototype%.next` method
  // https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState(this);
  var target = state.target;
  var kind = state.kind;
  var index = state.index++;

  if (!target || index >= target.length) {
    state.target = undefined;
    return {
      value: undefined,
      done: true
    };
  }

  if (kind == 'keys') return {
    value: index,
    done: false
  };
  if (kind == 'values') return {
    value: target[index],
    done: false
  };
  return {
    value: [index, target[index]],
    done: false
  };
}, 'values'); // argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.es/ecma262/#sec-createunmappedargumentsobject
// https://tc39.es/ecma262/#sec-createmappedargumentsobject

Iterators.Arguments = Iterators.Array; // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);

var createNonEnumerableProperty = __webpack_require__(11);

var has = __webpack_require__(5);

var setGlobal = __webpack_require__(46);

var inspectSource = __webpack_require__(47);

var InternalStateModule = __webpack_require__(29);

var getInternalState = InternalStateModule.get;
var enforceInternalState = InternalStateModule.enforce;
var TEMPLATE = String(String).split('String');
(module.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  var state;

  if (typeof value == 'function') {
    if (typeof key == 'string' && !has(value, 'name')) {
      createNonEnumerableProperty(value, 'name', key);
    }

    state = enforceInternalState(value);

    if (!state.source) {
      state.source = TEMPLATE.join(typeof key == 'string' ? key : '');
    }
  }

  if (O === global) {
    if (simple) O[key] = value;else setGlobal(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }

  if (simple) O[key] = value;else createNonEnumerableProperty(O, key, value); // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
});

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = false;

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function');
  }

  return it;
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var charAt = __webpack_require__(99).charAt;

var InternalStateModule = __webpack_require__(29);

var defineIterator = __webpack_require__(82);

var STRING_ITERATOR = 'String Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR); // `String.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-string.prototype-@@iterator

defineIterator(String, 'String', function (iterated) {
  setInternalState(this, {
    type: STRING_ITERATOR,
    string: String(iterated),
    index: 0
  }); // `%StringIteratorPrototype%.next` method
  // https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
}, function next() {
  var state = getInternalState(this);
  var string = state.string;
  var index = state.index;
  var point;
  if (index >= string.length) return {
    value: undefined,
    done: true
  };
  point = charAt(string, index);
  state.index += point.length;
  return {
    value: point,
    done: false
  };
});

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var TO_STRING_TAG_SUPPORT = __webpack_require__(56);

var redefine = __webpack_require__(16);

var toString = __webpack_require__(109); // `Object.prototype.toString` method
// https://tc39.es/ecma262/#sec-object.prototype.tostring


if (!TO_STRING_TAG_SUPPORT) {
  redefine(Object.prototype, 'toString', toString, {
    unsafe: true
  });
}

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(7);

var defineProperty = __webpack_require__(8).f;

var FunctionPrototype = Function.prototype;
var FunctionPrototypeToString = FunctionPrototype.toString;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name'; // Function instances `.name` property
// https://tc39.es/ecma262/#sec-function-instances-name

if (DESCRIPTORS && !(NAME in FunctionPrototype)) {
  defineProperty(FunctionPrototype, NAME, {
    configurable: true,
    get: function () {
      try {
        return FunctionPrototypeToString.call(this).match(nameRE)[1];
      } catch (error) {
        return '';
      }
    }
  });
}

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(2);

var global = __webpack_require__(0);

var getBuiltIn = __webpack_require__(14);

var IS_PURE = __webpack_require__(17);

var DESCRIPTORS = __webpack_require__(7);

var NATIVE_SYMBOL = __webpack_require__(54);

var USE_SYMBOL_AS_UID = __webpack_require__(78);

var fails = __webpack_require__(3);

var has = __webpack_require__(5);

var isArray = __webpack_require__(43);

var isObject = __webpack_require__(4);

var anObject = __webpack_require__(6);

var toObject = __webpack_require__(10);

var toIndexedObject = __webpack_require__(9);

var toPrimitive = __webpack_require__(35);

var createPropertyDescriptor = __webpack_require__(27);

var nativeObjectCreate = __webpack_require__(41);

var objectKeys = __webpack_require__(58);

var getOwnPropertyNamesModule = __webpack_require__(51);

var getOwnPropertyNamesExternal = __webpack_require__(110);

var getOwnPropertySymbolsModule = __webpack_require__(74);

var getOwnPropertyDescriptorModule = __webpack_require__(13);

var definePropertyModule = __webpack_require__(8);

var propertyIsEnumerableModule = __webpack_require__(67);

var createNonEnumerableProperty = __webpack_require__(11);

var redefine = __webpack_require__(16);

var shared = __webpack_require__(49);

var sharedKey = __webpack_require__(36);

var hiddenKeys = __webpack_require__(37);

var uid = __webpack_require__(50);

var wellKnownSymbol = __webpack_require__(1);

var wrappedWellKnownSymbolModule = __webpack_require__(88);

var defineWellKnownSymbol = __webpack_require__(89);

var setToStringTag = __webpack_require__(42);

var InternalStateModule = __webpack_require__(29);

var $forEach = __webpack_require__(32).forEach;

var HIDDEN = sharedKey('hidden');
var SYMBOL = 'Symbol';
var PROTOTYPE = 'prototype';
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(SYMBOL);
var ObjectPrototype = Object[PROTOTYPE];
var $Symbol = global.Symbol;
var $stringify = getBuiltIn('JSON', 'stringify');
var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
var nativeDefineProperty = definePropertyModule.f;
var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
var nativePropertyIsEnumerable = propertyIsEnumerableModule.f;
var AllSymbols = shared('symbols');
var ObjectPrototypeSymbols = shared('op-symbols');
var StringToSymbolRegistry = shared('string-to-symbol-registry');
var SymbolToStringRegistry = shared('symbol-to-string-registry');
var WellKnownSymbolsStore = shared('wks');
var QObject = global.QObject; // Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173

var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild; // fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687

var setSymbolDescriptor = DESCRIPTORS && fails(function () {
  return nativeObjectCreate(nativeDefineProperty({}, 'a', {
    get: function () {
      return nativeDefineProperty(this, 'a', {
        value: 7
      }).a;
    }
  })).a != 7;
}) ? function (O, P, Attributes) {
  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor(ObjectPrototype, P);
  if (ObjectPrototypeDescriptor) delete ObjectPrototype[P];
  nativeDefineProperty(O, P, Attributes);

  if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
    nativeDefineProperty(ObjectPrototype, P, ObjectPrototypeDescriptor);
  }
} : nativeDefineProperty;

var wrap = function (tag, description) {
  var symbol = AllSymbols[tag] = nativeObjectCreate($Symbol[PROTOTYPE]);
  setInternalState(symbol, {
    type: SYMBOL,
    tag: tag,
    description: description
  });
  if (!DESCRIPTORS) symbol.description = description;
  return symbol;
};

var isSymbol = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return Object(it) instanceof $Symbol;
};

var $defineProperty = function defineProperty(O, P, Attributes) {
  if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
  anObject(O);
  var key = toPrimitive(P, true);
  anObject(Attributes);

  if (has(AllSymbols, key)) {
    if (!Attributes.enumerable) {
      if (!has(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor(1, {}));
      O[HIDDEN][key] = true;
    } else {
      if (has(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
      Attributes = nativeObjectCreate(Attributes, {
        enumerable: createPropertyDescriptor(0, false)
      });
    }

    return setSymbolDescriptor(O, key, Attributes);
  }

  return nativeDefineProperty(O, key, Attributes);
};

var $defineProperties = function defineProperties(O, Properties) {
  anObject(O);
  var properties = toIndexedObject(Properties);
  var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
  $forEach(keys, function (key) {
    if (!DESCRIPTORS || $propertyIsEnumerable.call(properties, key)) $defineProperty(O, key, properties[key]);
  });
  return O;
};

var $create = function create(O, Properties) {
  return Properties === undefined ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
};

var $propertyIsEnumerable = function propertyIsEnumerable(V) {
  var P = toPrimitive(V, true);
  var enumerable = nativePropertyIsEnumerable.call(this, P);
  if (this === ObjectPrototype && has(AllSymbols, P) && !has(ObjectPrototypeSymbols, P)) return false;
  return enumerable || !has(this, P) || !has(AllSymbols, P) || has(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
};

var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
  var it = toIndexedObject(O);
  var key = toPrimitive(P, true);
  if (it === ObjectPrototype && has(AllSymbols, key) && !has(ObjectPrototypeSymbols, key)) return;
  var descriptor = nativeGetOwnPropertyDescriptor(it, key);

  if (descriptor && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) {
    descriptor.enumerable = true;
  }

  return descriptor;
};

var $getOwnPropertyNames = function getOwnPropertyNames(O) {
  var names = nativeGetOwnPropertyNames(toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (!has(AllSymbols, key) && !has(hiddenKeys, key)) result.push(key);
  });
  return result;
};

var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
  var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (has(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has(ObjectPrototype, key))) {
      result.push(AllSymbols[key]);
    }
  });
  return result;
}; // `Symbol` constructor
// https://tc39.es/ecma262/#sec-symbol-constructor


if (!NATIVE_SYMBOL) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor');
    var description = !arguments.length || arguments[0] === undefined ? undefined : String(arguments[0]);
    var tag = uid(description);

    var setter = function (value) {
      if (this === ObjectPrototype) setter.call(ObjectPrototypeSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
    };

    if (DESCRIPTORS && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, {
      configurable: true,
      set: setter
    });
    return wrap(tag, description);
  };

  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return getInternalState(this).tag;
  });
  redefine($Symbol, 'withoutSetter', function (description) {
    return wrap(uid(description), description);
  });
  propertyIsEnumerableModule.f = $propertyIsEnumerable;
  definePropertyModule.f = $defineProperty;
  getOwnPropertyDescriptorModule.f = $getOwnPropertyDescriptor;
  getOwnPropertyNamesModule.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
  getOwnPropertySymbolsModule.f = $getOwnPropertySymbols;

  wrappedWellKnownSymbolModule.f = function (name) {
    return wrap(wellKnownSymbol(name), name);
  };

  if (DESCRIPTORS) {
    // https://github.com/tc39/proposal-Symbol-description
    nativeDefineProperty($Symbol[PROTOTYPE], 'description', {
      configurable: true,
      get: function description() {
        return getInternalState(this).description;
      }
    });

    if (!IS_PURE) {
      redefine(ObjectPrototype, 'propertyIsEnumerable', $propertyIsEnumerable, {
        unsafe: true
      });
    }
  }
}

$({
  global: true,
  wrap: true,
  forced: !NATIVE_SYMBOL,
  sham: !NATIVE_SYMBOL
}, {
  Symbol: $Symbol
});
$forEach(objectKeys(WellKnownSymbolsStore), function (name) {
  defineWellKnownSymbol(name);
});
$({
  target: SYMBOL,
  stat: true,
  forced: !NATIVE_SYMBOL
}, {
  // `Symbol.for` method
  // https://tc39.es/ecma262/#sec-symbol.for
  'for': function (key) {
    var string = String(key);
    if (has(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
    var symbol = $Symbol(string);
    StringToSymbolRegistry[string] = symbol;
    SymbolToStringRegistry[symbol] = string;
    return symbol;
  },
  // `Symbol.keyFor` method
  // https://tc39.es/ecma262/#sec-symbol.keyfor
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
    if (has(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
  },
  useSetter: function () {
    USE_SETTER = true;
  },
  useSimple: function () {
    USE_SETTER = false;
  }
});
$({
  target: 'Object',
  stat: true,
  forced: !NATIVE_SYMBOL,
  sham: !DESCRIPTORS
}, {
  // `Object.create` method
  // https://tc39.es/ecma262/#sec-object.create
  create: $create,
  // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty
  defineProperty: $defineProperty,
  // `Object.defineProperties` method
  // https://tc39.es/ecma262/#sec-object.defineproperties
  defineProperties: $defineProperties,
  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor
});
$({
  target: 'Object',
  stat: true,
  forced: !NATIVE_SYMBOL
}, {
  // `Object.getOwnPropertyNames` method
  // https://tc39.es/ecma262/#sec-object.getownpropertynames
  getOwnPropertyNames: $getOwnPropertyNames,
  // `Object.getOwnPropertySymbols` method
  // https://tc39.es/ecma262/#sec-object.getownpropertysymbols
  getOwnPropertySymbols: $getOwnPropertySymbols
}); // Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443

$({
  target: 'Object',
  stat: true,
  forced: fails(function () {
    getOwnPropertySymbolsModule.f(1);
  })
}, {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return getOwnPropertySymbolsModule.f(toObject(it));
  }
}); // `JSON.stringify` method behavior with symbols
// https://tc39.es/ecma262/#sec-json.stringify

if ($stringify) {
  var FORCED_JSON_STRINGIFY = !NATIVE_SYMBOL || fails(function () {
    var symbol = $Symbol(); // MS Edge converts symbol values to JSON as {}

    return $stringify([symbol]) != '[null]' // WebKit converts symbol values to JSON as null
    || $stringify({
      a: symbol
    }) != '{}' // V8 throws on boxed symbols
    || $stringify(Object(symbol)) != '{}';
  });
  $({
    target: 'JSON',
    stat: true,
    forced: FORCED_JSON_STRINGIFY
  }, {
    // eslint-disable-next-line no-unused-vars -- required for `.length`
    stringify: function stringify(it, replacer, space) {
      var args = [it];
      var index = 1;
      var $replacer;

      while (arguments.length > index) args.push(arguments[index++]);

      $replacer = replacer;
      if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined

      if (!isArray(replacer)) replacer = function (key, value) {
        if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
        if (!isSymbol(value)) return value;
      };
      args[1] = replacer;
      return $stringify.apply(null, args);
    }
  });
} // `Symbol.prototype[@@toPrimitive]` method
// https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive


if (!$Symbol[PROTOTYPE][TO_PRIMITIVE]) {
  createNonEnumerableProperty($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
} // `Symbol.prototype[@@toStringTag]` property
// https://tc39.es/ecma262/#sec-symbol.prototype-@@tostringtag


setToStringTag($Symbol, SYMBOL);
hiddenKeys[HIDDEN] = true;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// `Symbol.prototype.description` getter
// https://tc39.es/ecma262/#sec-symbol.prototype.description


var $ = __webpack_require__(2);

var DESCRIPTORS = __webpack_require__(7);

var global = __webpack_require__(0);

var has = __webpack_require__(5);

var isObject = __webpack_require__(4);

var defineProperty = __webpack_require__(8).f;

var copyConstructorProperties = __webpack_require__(70);

var NativeSymbol = global.Symbol;

if (DESCRIPTORS && typeof NativeSymbol == 'function' && (!('description' in NativeSymbol.prototype) || // Safari 12 bug
NativeSymbol().description !== undefined)) {
  var EmptyStringDescriptionStore = {}; // wrap Symbol constructor for correct work with undefined description

  var SymbolWrapper = function Symbol() {
    var description = arguments.length < 1 || arguments[0] === undefined ? undefined : String(arguments[0]);
    var result = this instanceof SymbolWrapper ? new NativeSymbol(description) // in Edge 13, String(Symbol(undefined)) === 'Symbol(undefined)'
    : description === undefined ? NativeSymbol() : NativeSymbol(description);
    if (description === '') EmptyStringDescriptionStore[result] = true;
    return result;
  };

  copyConstructorProperties(SymbolWrapper, NativeSymbol);
  var symbolPrototype = SymbolWrapper.prototype = NativeSymbol.prototype;
  symbolPrototype.constructor = SymbolWrapper;
  var symbolToString = symbolPrototype.toString;
  var native = String(NativeSymbol('test')) == 'Symbol(test)';
  var regexp = /^Symbol\((.*)\)[^)]+$/;
  defineProperty(symbolPrototype, 'description', {
    configurable: true,
    get: function description() {
      var symbol = isObject(this) ? this.valueOf() : this;
      var string = symbolToString.call(symbol);
      if (has(EmptyStringDescriptionStore, symbol)) return '';
      var desc = native ? string.slice(7, -1) : string.replace(regexp, '$1');
      return desc === '' ? undefined : desc;
    }
  });
  $({
    global: true,
    forced: true
  }, {
    Symbol: SymbolWrapper
  });
}

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var defineWellKnownSymbol = __webpack_require__(89); // `Symbol.iterator` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.iterator


defineWellKnownSymbol('iterator');

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);

var DOMIterables = __webpack_require__(87);

var ArrayIteratorMethods = __webpack_require__(15);

var createNonEnumerableProperty = __webpack_require__(11);

var wellKnownSymbol = __webpack_require__(1);

var ITERATOR = wellKnownSymbol('iterator');
var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var ArrayValues = ArrayIteratorMethods.values;

for (var COLLECTION_NAME in DOMIterables) {
  var Collection = global[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;

  if (CollectionPrototype) {
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype[ITERATOR] !== ArrayValues) try {
      createNonEnumerableProperty(CollectionPrototype, ITERATOR, ArrayValues);
    } catch (error) {
      CollectionPrototype[ITERATOR] = ArrayValues;
    }

    if (!CollectionPrototype[TO_STRING_TAG]) {
      createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
    }

    if (DOMIterables[COLLECTION_NAME]) for (var METHOD_NAME in ArrayIteratorMethods) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
        createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
      } catch (error) {
        CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
      }
    }
  }
}

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(2);

var from = __webpack_require__(97);

var checkCorrectnessOfIteration = __webpack_require__(81);

var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
  // eslint-disable-next-line es/no-array-from -- required for testing
  Array.from(iterable);
}); // `Array.from` method
// https://tc39.es/ecma262/#sec-array.from

$({
  target: 'Array',
  stat: true,
  forced: INCORRECT_ITERATION
}, {
  from: from
});

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

/***/ }),
/* 28 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var NATIVE_WEAK_MAP = __webpack_require__(95);

var global = __webpack_require__(0);

var isObject = __webpack_require__(4);

var createNonEnumerableProperty = __webpack_require__(11);

var objectHas = __webpack_require__(5);

var shared = __webpack_require__(48);

var sharedKey = __webpack_require__(36);

var hiddenKeys = __webpack_require__(37);

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;

    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    }

    return state;
  };
};

if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap());
  var wmget = store.get;
  var wmhas = store.has;
  var wmset = store.set;

  set = function (it, metadata) {
    if (wmhas.call(store, it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    wmset.call(store, it, metadata);
    return metadata;
  };

  get = function (it) {
    return wmget.call(store, it) || {};
  };

  has = function (it) {
    return wmhas.call(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;

  set = function (it, metadata) {
    if (objectHas(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };

  get = function (it) {
    return objectHas(it, STATE) ? it[STATE] : {};
  };

  has = function (it) {
    return objectHas(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};

/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = {};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toPrimitive = __webpack_require__(35);

var definePropertyModule = __webpack_require__(8);

var createPropertyDescriptor = __webpack_require__(27);

module.exports = function (object, key, value) {
  var propertyKey = toPrimitive(key);
  if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));else object[propertyKey] = value;
};

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var bind = __webpack_require__(39);

var IndexedObject = __webpack_require__(68);

var toObject = __webpack_require__(10);

var toLength = __webpack_require__(12);

var arraySpeciesCreate = __webpack_require__(60);

var push = [].push; // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterOut }` methods implementation

var createMethod = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var IS_FILTER_OUT = TYPE == 7;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject($this);
    var self = IndexedObject(O);
    var boundFunction = bind(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_OUT ? create($this, 0) : undefined;
    var value, result;

    for (; length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);

      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
            case 3:
              return true;
            // some

            case 5:
              return value;
            // find

            case 6:
              return index;
            // findIndex

            case 2:
              push.call(target, value);
            // filter
          } else switch (TYPE) {
            case 4:
              return false;
            // every

            case 7:
              push.call(target, value);
            // filterOut
          }
      }
    }

    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

module.exports = {
  // `Array.prototype.forEach` method
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  forEach: createMethod(0),
  // `Array.prototype.map` method
  // https://tc39.es/ecma262/#sec-array.prototype.map
  map: createMethod(1),
  // `Array.prototype.filter` method
  // https://tc39.es/ecma262/#sec-array.prototype.filter
  filter: createMethod(2),
  // `Array.prototype.some` method
  // https://tc39.es/ecma262/#sec-array.prototype.some
  some: createMethod(3),
  // `Array.prototype.every` method
  // https://tc39.es/ecma262/#sec-array.prototype.every
  every: createMethod(4),
  // `Array.prototype.find` method
  // https://tc39.es/ecma262/#sec-array.prototype.find
  find: createMethod(5),
  // `Array.prototype.findIndex` method
  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod(6),
  // `Array.prototype.filterOut` method
  // https://github.com/tc39/proposal-array-filtering
  filterOut: createMethod(7)
};

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(2);

var isObject = __webpack_require__(4);

var isArray = __webpack_require__(43);

var toAbsoluteIndex = __webpack_require__(52);

var toLength = __webpack_require__(12);

var toIndexedObject = __webpack_require__(9);

var createProperty = __webpack_require__(31);

var wellKnownSymbol = __webpack_require__(1);

var arrayMethodHasSpeciesSupport = __webpack_require__(44);

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('slice');
var SPECIES = wellKnownSymbol('species');
var nativeSlice = [].slice;
var max = Math.max; // `Array.prototype.slice` method
// https://tc39.es/ecma262/#sec-array.prototype.slice
// fallback for not array-like ES3 strings and DOM objects

$({
  target: 'Array',
  proto: true,
  forced: !HAS_SPECIES_SUPPORT
}, {
  slice: function slice(start, end) {
    var O = toIndexedObject(this);
    var length = toLength(O.length);
    var k = toAbsoluteIndex(start, length);
    var fin = toAbsoluteIndex(end === undefined ? length : end, length); // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible

    var Constructor, result, n;

    if (isArray(O)) {
      Constructor = O.constructor; // cross-realm fallback

      if (typeof Constructor == 'function' && (Constructor === Array || isArray(Constructor.prototype))) {
        Constructor = undefined;
      } else if (isObject(Constructor)) {
        Constructor = Constructor[SPECIES];
        if (Constructor === null) Constructor = undefined;
      }

      if (Constructor === Array || Constructor === undefined) {
        return nativeSlice.call(O, k, fin);
      }
    }

    result = new (Constructor === undefined ? Array : Constructor)(max(fin - k, 0));

    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);

    result.length = n;
    return result;
  }
});

/***/ }),
/* 34 */
/***/ (function(module, exports) {

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4); // `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string


module.exports = function (input, PREFERRED_STRING) {
  if (!isObject(input)) return input;
  var fn, val;
  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(49);

var uid = __webpack_require__(50);

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};

/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = {};

/***/ }),
/* 38 */
/***/ (function(module, exports) {

var ceil = Math.ceil;
var floor = Math.floor; // `ToInteger` abstract operation
// https://tc39.es/ecma262/#sec-tointeger

module.exports = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__(18); // optional / simple context binding


module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;

  switch (length) {
    case 0:
      return function () {
        return fn.call(that);
      };

    case 1:
      return function (a) {
        return fn.call(that, a);
      };

    case 2:
      return function (a, b) {
        return fn.call(that, a, b);
      };

    case 3:
      return function (a, b, c) {
        return fn.call(that, a, b, c);
      };
  }

  return function ()
  /* ...args */
  {
    return fn.apply(that, arguments);
  };
};

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);

var userAgent = __webpack_require__(55);

var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  version = match[0] < 4 ? 1 : match[0] + match[1];
} else if (userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);

  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = match[1];
  }
}

module.exports = version && +version;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(6);

var defineProperties = __webpack_require__(101);

var enumBugKeys = __webpack_require__(53);

var hiddenKeys = __webpack_require__(37);

var html = __webpack_require__(85);

var documentCreateElement = __webpack_require__(45);

var sharedKey = __webpack_require__(36);

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function () {
  /* empty */
};

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
}; // Create object with fake `null` prototype: use ActiveX Object with cleared prototype


var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak

  return temp;
}; // Create object with fake `null` prototype: use iframe Object with cleared prototype


var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe); // https://github.com/zloirock/core-js/issues/475

  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
}; // Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug


var activeXDocument;

var NullProtoObject = function () {
  try {
    /* global ActiveXObject -- old IE */
    activeXDocument = document.domain && new ActiveXObject('htmlfile');
  } catch (error) {
    /* ignore */
  }

  NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
  var length = enumBugKeys.length;

  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];

  return NullProtoObject();
};

hiddenKeys[IE_PROTO] = true; // `Object.create` method
// https://tc39.es/ecma262/#sec-object.create

module.exports = Object.create || function create(O, Properties) {
  var result;

  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null; // add "__proto__" for Object.getPrototypeOf polyfill

    result[IE_PROTO] = O;
  } else result = NullProtoObject();

  return Properties === undefined ? result : defineProperties(result, Properties);
};

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var defineProperty = __webpack_require__(8).f;

var has = __webpack_require__(5);

var wellKnownSymbol = __webpack_require__(1);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');

module.exports = function (it, TAG, STATIC) {
  if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
    defineProperty(it, TO_STRING_TAG, {
      configurable: true,
      value: TAG
    });
  }
};

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(28); // `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es/no-array-isarray -- safe


module.exports = Array.isArray || function isArray(arg) {
  return classof(arg) == 'Array';
};

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(3);

var wellKnownSymbol = __webpack_require__(1);

var V8_VERSION = __webpack_require__(40);

var SPECIES = wellKnownSymbol('species');

module.exports = function (METHOD_NAME) {
  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/677
  return V8_VERSION >= 51 || !fails(function () {
    var array = [];
    var constructor = array.constructor = {};

    constructor[SPECIES] = function () {
      return {
        foo: 1
      };
    };

    return array[METHOD_NAME](Boolean).foo !== 1;
  });
};

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);

var isObject = __webpack_require__(4);

var document = global.document; // typeof document.createElement is 'object' in old IE

var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);

var createNonEnumerableProperty = __webpack_require__(11);

module.exports = function (key, value) {
  try {
    createNonEnumerableProperty(global, key, value);
  } catch (error) {
    global[key] = value;
  }

  return value;
};

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(48);

var functionToString = Function.toString; // this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper

if (typeof store.inspectSource != 'function') {
  store.inspectSource = function (it) {
    return functionToString.call(it);
  };
}

module.exports = store.inspectSource;

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);

var setGlobal = __webpack_require__(46);

var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {});
module.exports = store;

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var IS_PURE = __webpack_require__(17);

var store = __webpack_require__(48);

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.12.1',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
});

/***/ }),
/* 50 */
/***/ (function(module, exports) {

var id = 0;
var postfix = Math.random();

module.exports = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__(73);

var enumBugKeys = __webpack_require__(53);

var hiddenKeys = enumBugKeys.concat('length', 'prototype'); // `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(38);

var max = Math.max;
var min = Math.min; // Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).

module.exports = function (index, length) {
  var integer = toInteger(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};

/***/ }),
/* 53 */
/***/ (function(module, exports) {

// IE8- don't enum bug keys
module.exports = ['constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf'];

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable es/no-symbol -- required for testing */
var V8_VERSION = __webpack_require__(40);

var fails = __webpack_require__(3); // eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing


module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  return !String(Symbol()) || // Chrome 38 Symbol has incorrect toString conversion
  // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
  !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(14);

module.exports = getBuiltIn('navigator', 'userAgent') || '';

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(1);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};
test[TO_STRING_TAG] = 'z';
module.exports = String(test) === '[object z]';

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(5);

var toObject = __webpack_require__(10);

var sharedKey = __webpack_require__(36);

var CORRECT_PROTOTYPE_GETTER = __webpack_require__(84);

var IE_PROTO = sharedKey('IE_PROTO');
var ObjectPrototype = Object.prototype; // `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof
// eslint-disable-next-line es/no-object-getprototypeof -- safe

module.exports = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];

  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  }

  return O instanceof Object ? ObjectPrototype : null;
};

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__(73);

var enumBugKeys = __webpack_require__(53); // `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es/no-object-keys -- safe


module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);

var DOMIterables = __webpack_require__(87);

var forEach = __webpack_require__(103);

var createNonEnumerableProperty = __webpack_require__(11);

for (var COLLECTION_NAME in DOMIterables) {
  var Collection = global[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype; // some Chrome versions have non-configurable methods on DOMTokenList

  if (CollectionPrototype && CollectionPrototype.forEach !== forEach) try {
    createNonEnumerableProperty(CollectionPrototype, 'forEach', forEach);
  } catch (error) {
    CollectionPrototype.forEach = forEach;
  }
}

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);

var isArray = __webpack_require__(43);

var wellKnownSymbol = __webpack_require__(1);

var SPECIES = wellKnownSymbol('species'); // `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate

module.exports = function (originalArray, length) {
  var C;

  if (isArray(originalArray)) {
    C = originalArray.constructor; // cross-realm fallback

    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  }

  return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
};

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(2);

var $filter = __webpack_require__(32).filter;

var arrayMethodHasSpeciesSupport = __webpack_require__(44);

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter'); // `Array.prototype.filter` method
// https://tc39.es/ecma262/#sec-array.prototype.filter
// with adding support of @@species

$({
  target: 'Array',
  proto: true,
  forced: !HAS_SPECIES_SUPPORT
}, {
  filter: function filter(callbackfn
  /* , thisArg */
  ) {
    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(1);

var create = __webpack_require__(41);

var definePropertyModule = __webpack_require__(8);

var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype = Array.prototype; // Array.prototype[@@unscopables]
// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables

if (ArrayPrototype[UNSCOPABLES] == undefined) {
  definePropertyModule.f(ArrayPrototype, UNSCOPABLES, {
    configurable: true,
    value: create(null)
  });
} // add a key to Array.prototype[@@unscopables]


module.exports = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var runtime = function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.

  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }

  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function (obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []); // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.

    generator._invoke = makeInvokeMethod(innerFn, self, context);
    return generator;
  }

  exports.wrap = wrap; // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.

  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed"; // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.

  var ContinueSentinel = {}; // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.

  function Generator() {}

  function GeneratorFunction() {}

  function GeneratorFunctionPrototype() {} // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.


  var IteratorPrototype = {};

  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));

  if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"); // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.

  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function (genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
    // do is to check its .name property.
    (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
  };

  exports.mark = function (genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }

    genFun.prototype = Object.create(Gp);
    return genFun;
  }; // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.


  exports.awrap = function (arg) {
    return {
      __await: arg
    };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);

      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;

        if (value && typeof value === "object" && hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function (value) {
            invoke("next", value, resolve, reject);
          }, function (err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function (unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function (error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function (resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise = // If enqueue has been called before, then we want to wait until
      // all previous Promises have been resolved before calling invoke,
      // so that results are always delivered in the correct order. If
      // enqueue has not been called before, then it is important to
      // call invoke immediately, without waiting on a callback to fire,
      // so that the async generator function has the opportunity to do
      // any necessary setup in a predictable way. This predictability
      // is why the Promise constructor synchronously invokes its
      // executor callback, and why async functions synchronously
      // execute code before the first await. Since we implement simple
      // async functions in terms of async generators, it is especially
      // important to get this right, even though it requires care.
      previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, // Avoid propagating failures to Promises returned by later
      // invocations of the iterator.
      callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
    } // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).


    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);

  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };

  exports.AsyncIterator = AsyncIterator; // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.

  exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
    : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;
    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        } // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume


        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;

        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);

          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;
        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);
        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;
        var record = tryCatch(innerFn, self, context);

        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done ? GenStateCompleted : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };
        } else if (record.type === "throw") {
          state = GenStateCompleted; // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.

          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  } // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.


  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];

    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError("The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (!info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value; // Resume execution at the desired location (see delegateYield).

      context.next = delegate.nextLoc; // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.

      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }
    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    } // The delegate iterator is finished, so forget it and continue with
    // the outer generator.


    context.delegate = null;
    return ContinueSentinel;
  } // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.


  defineIteratorMethods(Gp);
  define(Gp, toStringTagSymbol, "Generator"); // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.

  Gp[iteratorSymbol] = function () {
    return this;
  };

  Gp.toString = function () {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{
      tryLoc: "root"
    }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function (object) {
    var keys = [];

    for (var key in object) {
      keys.push(key);
    }

    keys.reverse(); // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.

    return function next() {
      while (keys.length) {
        var key = keys.pop();

        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      } // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.


      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];

      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1,
            next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;
          return next;
        };

        return next.next = next;
      }
    } // Return an iterator with no values.


    return {
      next: doneResult
    };
  }

  exports.values = values;

  function doneResult() {
    return {
      value: undefined,
      done: true
    };
  }

  Context.prototype = {
    constructor: Context,
    reset: function (skipTempReset) {
      this.prev = 0;
      this.next = 0; // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.

      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;
      this.method = "next";
      this.arg = undefined;
      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },
    stop: function () {
      this.done = true;
      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;

      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },
    dispatchException: function (exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;

      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }
          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },
    abrupt: function (type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },
    complete: function (record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" || record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },
    finish: function (finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },
    "catch": function (tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;

          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }

          return thrown;
        }
      } // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.


      throw new Error("illegal catch attempt");
    },
    delegateYield: function (iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  }; // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.

  return exports;
}( // If this script is executing as a CommonJS module, use module.exports
// as the regeneratorRuntime namespace. Otherwise create a new empty
// object. Either way, the resulting object will be used to initialize
// the regeneratorRuntime variable at the top of this file.
 true ? module.exports : undefined);

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(2);

var $findIndex = __webpack_require__(32).findIndex;

var addToUnscopables = __webpack_require__(62);

var FIND_INDEX = 'findIndex';
var SKIPS_HOLES = true; // Shouldn't skip holes

if (FIND_INDEX in []) Array(1)[FIND_INDEX](function () {
  SKIPS_HOLES = false;
}); // `Array.prototype.findIndex` method
// https://tc39.es/ecma262/#sec-array.prototype.findindex

$({
  target: 'Array',
  proto: true,
  forced: SKIPS_HOLES
}, {
  findIndex: function findIndex(callbackfn
  /* , that = undefined */
  ) {
    return $findIndex(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
}); // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables

addToUnscopables(FIND_INDEX);

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(2);

var toAbsoluteIndex = __webpack_require__(52);

var toInteger = __webpack_require__(38);

var toLength = __webpack_require__(12);

var toObject = __webpack_require__(10);

var arraySpeciesCreate = __webpack_require__(60);

var createProperty = __webpack_require__(31);

var arrayMethodHasSpeciesSupport = __webpack_require__(44);

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('splice');
var max = Math.max;
var min = Math.min;
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded'; // `Array.prototype.splice` method
// https://tc39.es/ecma262/#sec-array.prototype.splice
// with adding support of @@species

$({
  target: 'Array',
  proto: true,
  forced: !HAS_SPECIES_SUPPORT
}, {
  splice: function splice(start, deleteCount
  /* , ...items */
  ) {
    var O = toObject(this);
    var len = toLength(O.length);
    var actualStart = toAbsoluteIndex(start, len);
    var argumentsLength = arguments.length;
    var insertCount, actualDeleteCount, A, k, from, to;

    if (argumentsLength === 0) {
      insertCount = actualDeleteCount = 0;
    } else if (argumentsLength === 1) {
      insertCount = 0;
      actualDeleteCount = len - actualStart;
    } else {
      insertCount = argumentsLength - 2;
      actualDeleteCount = min(max(toInteger(deleteCount), 0), len - actualStart);
    }

    if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER) {
      throw TypeError(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
    }

    A = arraySpeciesCreate(O, actualDeleteCount);

    for (k = 0; k < actualDeleteCount; k++) {
      from = actualStart + k;
      if (from in O) createProperty(A, k, O[from]);
    }

    A.length = actualDeleteCount;

    if (insertCount < actualDeleteCount) {
      for (k = actualStart; k < len - actualDeleteCount; k++) {
        from = k + actualDeleteCount;
        to = k + insertCount;
        if (from in O) O[to] = O[from];else delete O[to];
      }

      for (k = len; k > len - actualDeleteCount + insertCount; k--) delete O[k - 1];
    } else if (insertCount > actualDeleteCount) {
      for (k = len - actualDeleteCount; k > actualStart; k--) {
        from = k + actualDeleteCount - 1;
        to = k + insertCount - 1;
        if (from in O) O[to] = O[from];else delete O[to];
      }
    }

    for (k = 0; k < insertCount; k++) {
      O[k + actualStart] = arguments[k + 2];
    }

    O.length = len - actualDeleteCount + insertCount;
    return A;
  }
});

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(28);

var global = __webpack_require__(0);

module.exports = classof(global.process) == 'process';

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $propertyIsEnumerable = {}.propertyIsEnumerable; // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe

var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor; // Nashorn ~ JDK8 bug

var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({
  1: 2
}, 1); // `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable

exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(3);

var classof = __webpack_require__(28);

var split = ''.split; // fallback for non-array-like ES3 and non-enumerable old V8 strings

module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(7);

var fails = __webpack_require__(3);

var createElement = __webpack_require__(45); // Thank's IE8 for his funny defineProperty


module.exports = !DESCRIPTORS && !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () {
      return 7;
    }
  }).a != 7;
});

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(5);

var ownKeys = __webpack_require__(71);

var getOwnPropertyDescriptorModule = __webpack_require__(13);

var definePropertyModule = __webpack_require__(8);

module.exports = function (target, source) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(14);

var getOwnPropertyNamesModule = __webpack_require__(51);

var getOwnPropertySymbolsModule = __webpack_require__(74);

var anObject = __webpack_require__(6); // all object keys, includes non-enumerable and symbols


module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);

module.exports = global;

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(5);

var toIndexedObject = __webpack_require__(9);

var indexOf = __webpack_require__(96).indexOf;

var hiddenKeys = __webpack_require__(37);

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;

  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key); // Don't enum bug & hidden keys


  while (names.length > i) if (has(O, key = names[i++])) {
    ~indexOf(result, key) || result.push(key);
  }

  return result;
};

/***/ }),
/* 74 */
/***/ (function(module, exports) {

// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
exports.f = Object.getOwnPropertySymbols;

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(3);

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true : value == NATIVE ? false : typeof detection == 'function' ? fails(detection) : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';
module.exports = isForced;

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(6);

module.exports = function (iterator) {
  var returnMethod = iterator['return'];

  if (returnMethod !== undefined) {
    return anObject(returnMethod.call(iterator)).value;
  }
};

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(1);

var Iterators = __webpack_require__(30);

var ITERATOR = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype; // check on default Array iterator

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable es/no-symbol -- required for testing */
var NATIVE_SYMBOL = __webpack_require__(54);

module.exports = NATIVE_SYMBOL && !Symbol.sham && typeof Symbol.iterator == 'symbol';

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(80);

var Iterators = __webpack_require__(30);

var wellKnownSymbol = __webpack_require__(1);

var ITERATOR = wellKnownSymbol('iterator');

module.exports = function (it) {
  if (it != undefined) return it[ITERATOR] || it['@@iterator'] || Iterators[classof(it)];
};

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

var TO_STRING_TAG_SUPPORT = __webpack_require__(56);

var classofRaw = __webpack_require__(28);

var wellKnownSymbol = __webpack_require__(1);

var TO_STRING_TAG = wellKnownSymbol('toStringTag'); // ES3 wrong here

var CORRECT_ARGUMENTS = classofRaw(function () {
  return arguments;
}()) == 'Arguments'; // fallback for IE11 Script Access Denied error

var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) {
    /* empty */
  }
}; // getting tag from ES6+ `Object.prototype.toString`


module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null' // @@toStringTag case
  : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag // builtinTag case
  : CORRECT_ARGUMENTS ? classofRaw(O) // ES3 arguments fallback
  : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
};

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(1);

var ITERATOR = wellKnownSymbol('iterator');
var SAFE_CLOSING = false;

try {
  var called = 0;
  var iteratorWithReturn = {
    next: function () {
      return {
        done: !!called++
      };
    },
    'return': function () {
      SAFE_CLOSING = true;
    }
  };

  iteratorWithReturn[ITERATOR] = function () {
    return this;
  }; // eslint-disable-next-line es/no-array-from, no-throw-literal -- required for testing


  Array.from(iteratorWithReturn, function () {
    throw 2;
  });
} catch (error) {
  /* empty */
}

module.exports = function (exec, SKIP_CLOSING) {
  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  var ITERATION_SUPPORT = false;

  try {
    var object = {};

    object[ITERATOR] = function () {
      return {
        next: function () {
          return {
            done: ITERATION_SUPPORT = true
          };
        }
      };
    };

    exec(object);
  } catch (error) {
    /* empty */
  }

  return ITERATION_SUPPORT;
};

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(2);

var createIteratorConstructor = __webpack_require__(100);

var getPrototypeOf = __webpack_require__(57);

var setPrototypeOf = __webpack_require__(86);

var setToStringTag = __webpack_require__(42);

var createNonEnumerableProperty = __webpack_require__(11);

var redefine = __webpack_require__(16);

var wellKnownSymbol = __webpack_require__(1);

var IS_PURE = __webpack_require__(17);

var Iterators = __webpack_require__(30);

var IteratorsCore = __webpack_require__(83);

var IteratorPrototype = IteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR = wellKnownSymbol('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis = function () {
  return this;
};

module.exports = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];

    switch (KIND) {
      case KEYS:
        return function keys() {
          return new IteratorConstructor(this, KIND);
        };

      case VALUES:
        return function values() {
          return new IteratorConstructor(this, KIND);
        };

      case ENTRIES:
        return function entries() {
          return new IteratorConstructor(this, KIND);
        };
    }

    return function () {
      return new IteratorConstructor(this);
    };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR] || IterablePrototype['@@iterator'] || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY; // fix native

  if (anyNativeIterator) {
    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));

    if (IteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
      if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
        if (setPrototypeOf) {
          setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
        } else if (typeof CurrentIteratorPrototype[ITERATOR] != 'function') {
          createNonEnumerableProperty(CurrentIteratorPrototype, ITERATOR, returnThis);
        }
      } // Set @@toStringTag to native iterators


      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
      if (IS_PURE) Iterators[TO_STRING_TAG] = returnThis;
    }
  } // fix Array#{values, @@iterator}.name in V8 / FF


  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    INCORRECT_VALUES_NAME = true;

    defaultIterator = function values() {
      return nativeIterator.call(this);
    };
  } // define iterator


  if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
    createNonEnumerableProperty(IterablePrototype, ITERATOR, defaultIterator);
  }

  Iterators[NAME] = defaultIterator; // export additional methods

  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        redefine(IterablePrototype, KEY, methods[KEY]);
      }
    } else $({
      target: NAME,
      proto: true,
      forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME
    }, methods);
  }

  return methods;
};

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var fails = __webpack_require__(3);

var getPrototypeOf = __webpack_require__(57);

var createNonEnumerableProperty = __webpack_require__(11);

var has = __webpack_require__(5);

var wellKnownSymbol = __webpack_require__(1);

var IS_PURE = __webpack_require__(17);

var ITERATOR = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS = false;

var returnThis = function () {
  return this;
}; // `%IteratorPrototype%` object
// https://tc39.es/ecma262/#sec-%iteratorprototype%-object


var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;
/* eslint-disable es/no-array-prototype-keys -- safe */

if ([].keys) {
  arrayIterator = [].keys(); // Safari 8 has buggy iterators w/o `next`

  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;else {
    PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
  }
}

var NEW_ITERATOR_PROTOTYPE = IteratorPrototype == undefined || fails(function () {
  var test = {}; // FF44- legacy iterators case

  return IteratorPrototype[ITERATOR].call(test) !== test;
});
if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype = {}; // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()

if ((!IS_PURE || NEW_ITERATOR_PROTOTYPE) && !has(IteratorPrototype, ITERATOR)) {
  createNonEnumerableProperty(IteratorPrototype, ITERATOR, returnThis);
}

module.exports = {
  IteratorPrototype: IteratorPrototype,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(3);

module.exports = !fails(function () {
  function F() {
    /* empty */
  }

  F.prototype.constructor = null; // eslint-disable-next-line es/no-object-getprototypeof -- required for testing

  return Object.getPrototypeOf(new F()) !== F.prototype;
});

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(14);

module.exports = getBuiltIn('document', 'documentElement');

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable no-proto -- safe */
var anObject = __webpack_require__(6);

var aPossiblePrototype = __webpack_require__(102); // `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
// eslint-disable-next-line es/no-object-setprototypeof -- safe


module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;

  try {
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
    setter.call(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) {
    /* empty */
  }

  return function setPrototypeOf(O, proto) {
    anObject(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter.call(O, proto);else O.__proto__ = proto;
    return O;
  };
}() : undefined);

/***/ }),
/* 87 */
/***/ (function(module, exports) {

// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
module.exports = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(1);

exports.f = wellKnownSymbol;

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__(72);

var has = __webpack_require__(5);

var wrappedWellKnownSymbolModule = __webpack_require__(88);

var defineProperty = __webpack_require__(8).f;

module.exports = function (NAME) {
  var Symbol = path.Symbol || (path.Symbol = {});
  if (!has(Symbol, NAME)) defineProperty(Symbol, NAME, {
    value: wrappedWellKnownSymbolModule.f(NAME)
  });
};

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(2);

var IS_PURE = __webpack_require__(17);

var global = __webpack_require__(0);

var getBuiltIn = __webpack_require__(14);

var NativePromise = __webpack_require__(113);

var redefine = __webpack_require__(16);

var redefineAll = __webpack_require__(114);

var setPrototypeOf = __webpack_require__(86);

var setToStringTag = __webpack_require__(42);

var setSpecies = __webpack_require__(115);

var isObject = __webpack_require__(4);

var aFunction = __webpack_require__(18);

var anInstance = __webpack_require__(116);

var inspectSource = __webpack_require__(47);

var iterate = __webpack_require__(117);

var checkCorrectnessOfIteration = __webpack_require__(81);

var speciesConstructor = __webpack_require__(118);

var task = __webpack_require__(91).set;

var microtask = __webpack_require__(119);

var promiseResolve = __webpack_require__(121);

var hostReportErrors = __webpack_require__(122);

var newPromiseCapabilityModule = __webpack_require__(93);

var perform = __webpack_require__(123);

var InternalStateModule = __webpack_require__(29);

var isForced = __webpack_require__(75);

var wellKnownSymbol = __webpack_require__(1);

var IS_BROWSER = __webpack_require__(124);

var IS_NODE = __webpack_require__(66);

var V8_VERSION = __webpack_require__(40);

var SPECIES = wellKnownSymbol('species');
var PROMISE = 'Promise';
var getInternalState = InternalStateModule.get;
var setInternalState = InternalStateModule.set;
var getInternalPromiseState = InternalStateModule.getterFor(PROMISE);
var NativePromisePrototype = NativePromise && NativePromise.prototype;
var PromiseConstructor = NativePromise;
var PromiseConstructorPrototype = NativePromisePrototype;
var TypeError = global.TypeError;
var document = global.document;
var process = global.process;
var newPromiseCapability = newPromiseCapabilityModule.f;
var newGenericPromiseCapability = newPromiseCapability;
var DISPATCH_EVENT = !!(document && document.createEvent && global.dispatchEvent);
var NATIVE_REJECTION_EVENT = typeof PromiseRejectionEvent == 'function';
var UNHANDLED_REJECTION = 'unhandledrejection';
var REJECTION_HANDLED = 'rejectionhandled';
var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;
var HANDLED = 1;
var UNHANDLED = 2;
var SUBCLASSING = false;
var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;
var FORCED = isForced(PROMISE, function () {
  var GLOBAL_CORE_JS_PROMISE = inspectSource(PromiseConstructor) !== String(PromiseConstructor); // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
  // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
  // We can't detect it synchronously, so just check versions

  if (!GLOBAL_CORE_JS_PROMISE && V8_VERSION === 66) return true; // We need Promise#finally in the pure version for preventing prototype pollution

  if (IS_PURE && !PromiseConstructorPrototype['finally']) return true; // We can't use @@species feature detection in V8 since it causes
  // deoptimization and performance degradation
  // https://github.com/zloirock/core-js/issues/679

  if (V8_VERSION >= 51 && /native code/.test(PromiseConstructor)) return false; // Detect correctness of subclassing with @@species support

  var promise = new PromiseConstructor(function (resolve) {
    resolve(1);
  });

  var FakePromise = function (exec) {
    exec(function () {
      /* empty */
    }, function () {
      /* empty */
    });
  };

  var constructor = promise.constructor = {};
  constructor[SPECIES] = FakePromise;
  SUBCLASSING = promise.then(function () {
    /* empty */
  }) instanceof FakePromise;
  if (!SUBCLASSING) return true; // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test

  return !GLOBAL_CORE_JS_PROMISE && IS_BROWSER && !NATIVE_REJECTION_EVENT;
});
var INCORRECT_ITERATION = FORCED || !checkCorrectnessOfIteration(function (iterable) {
  PromiseConstructor.all(iterable)['catch'](function () {
    /* empty */
  });
}); // helpers

var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};

var notify = function (state, isReject) {
  if (state.notified) return;
  state.notified = true;
  var chain = state.reactions;
  microtask(function () {
    var value = state.value;
    var ok = state.state == FULFILLED;
    var index = 0; // variable length - can't use forEach

    while (chain.length > index) {
      var reaction = chain[index++];
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;

      try {
        if (handler) {
          if (!ok) {
            if (state.rejection === UNHANDLED) onHandleUnhandled(state);
            state.rejection = HANDLED;
          }

          if (handler === true) result = value;else {
            if (domain) domain.enter();
            result = handler(value); // can throw

            if (domain) {
              domain.exit();
              exited = true;
            }
          }

          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (error) {
        if (domain && !exited) domain.exit();
        reject(error);
      }
    }

    state.reactions = [];
    state.notified = false;
    if (isReject && !state.rejection) onUnhandled(state);
  });
};

var dispatchEvent = function (name, promise, reason) {
  var event, handler;

  if (DISPATCH_EVENT) {
    event = document.createEvent('Event');
    event.promise = promise;
    event.reason = reason;
    event.initEvent(name, false, true);
    global.dispatchEvent(event);
  } else event = {
    promise: promise,
    reason: reason
  };

  if (!NATIVE_REJECTION_EVENT && (handler = global['on' + name])) handler(event);else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
};

var onUnhandled = function (state) {
  task.call(global, function () {
    var promise = state.facade;
    var value = state.value;
    var IS_UNHANDLED = isUnhandled(state);
    var result;

    if (IS_UNHANDLED) {
      result = perform(function () {
        if (IS_NODE) {
          process.emit('unhandledRejection', value, promise);
        } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
      }); // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should

      state.rejection = IS_NODE || isUnhandled(state) ? UNHANDLED : HANDLED;
      if (result.error) throw result.value;
    }
  });
};

var isUnhandled = function (state) {
  return state.rejection !== HANDLED && !state.parent;
};

var onHandleUnhandled = function (state) {
  task.call(global, function () {
    var promise = state.facade;

    if (IS_NODE) {
      process.emit('rejectionHandled', promise);
    } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
  });
};

var bind = function (fn, state, unwrap) {
  return function (value) {
    fn(state, value, unwrap);
  };
};

var internalReject = function (state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  state.value = value;
  state.state = REJECTED;
  notify(state, true);
};

var internalResolve = function (state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;

  try {
    if (state.facade === value) throw TypeError("Promise can't be resolved itself");
    var then = isThenable(value);

    if (then) {
      microtask(function () {
        var wrapper = {
          done: false
        };

        try {
          then.call(value, bind(internalResolve, wrapper, state), bind(internalReject, wrapper, state));
        } catch (error) {
          internalReject(wrapper, error, state);
        }
      });
    } else {
      state.value = value;
      state.state = FULFILLED;
      notify(state, false);
    }
  } catch (error) {
    internalReject({
      done: false
    }, error, state);
  }
}; // constructor polyfill


if (FORCED) {
  // 25.4.3.1 Promise(executor)
  PromiseConstructor = function Promise(executor) {
    anInstance(this, PromiseConstructor, PROMISE);
    aFunction(executor);
    Internal.call(this);
    var state = getInternalState(this);

    try {
      executor(bind(internalResolve, state), bind(internalReject, state));
    } catch (error) {
      internalReject(state, error);
    }
  };

  PromiseConstructorPrototype = PromiseConstructor.prototype; // eslint-disable-next-line no-unused-vars -- required for `.length`

  Internal = function Promise(executor) {
    setInternalState(this, {
      type: PROMISE,
      done: false,
      notified: false,
      parent: false,
      reactions: [],
      rejection: false,
      state: PENDING,
      value: undefined
    });
  };

  Internal.prototype = redefineAll(PromiseConstructorPrototype, {
    // `Promise.prototype.then` method
    // https://tc39.es/ecma262/#sec-promise.prototype.then
    then: function then(onFulfilled, onRejected) {
      var state = getInternalPromiseState(this);
      var reaction = newPromiseCapability(speciesConstructor(this, PromiseConstructor));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = IS_NODE ? process.domain : undefined;
      state.parent = true;
      state.reactions.push(reaction);
      if (state.state != PENDING) notify(state, false);
      return reaction.promise;
    },
    // `Promise.prototype.catch` method
    // https://tc39.es/ecma262/#sec-promise.prototype.catch
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });

  OwnPromiseCapability = function () {
    var promise = new Internal();
    var state = getInternalState(promise);
    this.promise = promise;
    this.resolve = bind(internalResolve, state);
    this.reject = bind(internalReject, state);
  };

  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === PromiseConstructor || C === PromiseWrapper ? new OwnPromiseCapability(C) : newGenericPromiseCapability(C);
  };

  if (!IS_PURE && typeof NativePromise == 'function' && NativePromisePrototype !== Object.prototype) {
    nativeThen = NativePromisePrototype.then;

    if (!SUBCLASSING) {
      // make `Promise#then` return a polyfilled `Promise` for native promise-based APIs
      redefine(NativePromisePrototype, 'then', function then(onFulfilled, onRejected) {
        var that = this;
        return new PromiseConstructor(function (resolve, reject) {
          nativeThen.call(that, resolve, reject);
        }).then(onFulfilled, onRejected); // https://github.com/zloirock/core-js/issues/640
      }, {
        unsafe: true
      }); // makes sure that native promise-based APIs `Promise#catch` properly works with patched `Promise#then`

      redefine(NativePromisePrototype, 'catch', PromiseConstructorPrototype['catch'], {
        unsafe: true
      });
    } // make `.constructor === Promise` work for native promise-based APIs


    try {
      delete NativePromisePrototype.constructor;
    } catch (error) {
      /* empty */
    } // make `instanceof Promise` work for native promise-based APIs


    if (setPrototypeOf) {
      setPrototypeOf(NativePromisePrototype, PromiseConstructorPrototype);
    }
  }
}

$({
  global: true,
  wrap: true,
  forced: FORCED
}, {
  Promise: PromiseConstructor
});
setToStringTag(PromiseConstructor, PROMISE, false, true);
setSpecies(PROMISE);
PromiseWrapper = getBuiltIn(PROMISE); // statics

$({
  target: PROMISE,
  stat: true,
  forced: FORCED
}, {
  // `Promise.reject` method
  // https://tc39.es/ecma262/#sec-promise.reject
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    capability.reject.call(undefined, r);
    return capability.promise;
  }
});
$({
  target: PROMISE,
  stat: true,
  forced: IS_PURE || FORCED
}, {
  // `Promise.resolve` method
  // https://tc39.es/ecma262/#sec-promise.resolve
  resolve: function resolve(x) {
    return promiseResolve(IS_PURE && this === PromiseWrapper ? PromiseConstructor : this, x);
  }
});
$({
  target: PROMISE,
  stat: true,
  forced: INCORRECT_ITERATION
}, {
  // `Promise.all` method
  // https://tc39.es/ecma262/#sec-promise.all
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aFunction(C.resolve);
      var values = [];
      var counter = 0;
      var remaining = 1;
      iterate(iterable, function (promise) {
        var index = counter++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        $promiseResolve.call(C, promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.error) reject(result.value);
    return capability.promise;
  },
  // `Promise.race` method
  // https://tc39.es/ecma262/#sec-promise.race
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aFunction(C.resolve);
      iterate(iterable, function (promise) {
        $promiseResolve.call(C, promise).then(capability.resolve, reject);
      });
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);

var fails = __webpack_require__(3);

var bind = __webpack_require__(39);

var html = __webpack_require__(85);

var createElement = __webpack_require__(45);

var IS_IOS = __webpack_require__(92);

var IS_NODE = __webpack_require__(66);

var location = global.location;
var set = global.setImmediate;
var clear = global.clearImmediate;
var process = global.process;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;

var run = function (id) {
  // eslint-disable-next-line no-prototype-builtins -- safe
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};

var runner = function (id) {
  return function () {
    run(id);
  };
};

var listener = function (event) {
  run(event.data);
};

var post = function (id) {
  // old engines have not location.origin
  global.postMessage(id + '', location.protocol + '//' + location.host);
}; // Node.js 0.9+ & IE10+ has setImmediate, otherwise:


if (!set || !clear) {
  set = function setImmediate(fn) {
    var args = [];
    var i = 1;

    while (arguments.length > i) args.push(arguments[i++]);

    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func -- spec requirement
      (typeof fn == 'function' ? fn : Function(fn)).apply(undefined, args);
    };

    defer(counter);
    return counter;
  };

  clear = function clearImmediate(id) {
    delete queue[id];
  }; // Node.js 0.8-


  if (IS_NODE) {
    defer = function (id) {
      process.nextTick(runner(id));
    }; // Sphere (JS game engine) Dispatch API

  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(runner(id));
    }; // Browsers with MessageChannel, includes WebWorkers
    // except iOS - https://github.com/zloirock/core-js/issues/624

  } else if (MessageChannel && !IS_IOS) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = bind(port.postMessage, port, 1); // Browsers with postMessage, skip WebWorkers
    // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts && location && location.protocol !== 'file:' && !fails(post)) {
    defer = post;
    global.addEventListener('message', listener, false); // IE8-
  } else if (ONREADYSTATECHANGE in createElement('script')) {
    defer = function (id) {
      html.appendChild(createElement('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run(id);
      };
    }; // Rest old browsers

  } else {
    defer = function (id) {
      setTimeout(runner(id), 0);
    };
  }
}

module.exports = {
  set: set,
  clear: clear
};

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

var userAgent = __webpack_require__(55);

module.exports = /(?:iphone|ipod|ipad).*applewebkit/i.test(userAgent);

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var aFunction = __webpack_require__(18);

var PromiseCapability = function (C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}; // 25.4.1.5 NewPromiseCapability(C)


module.exports.f = function (C) {
  return new PromiseCapability(C);
};

/***/ }),
/* 94 */
/***/ (function(module, exports) {

var g; // This works in non-strict mode

g = function () {
  return this;
}();

try {
  // This works if eval is allowed (see CSP)
  g = g || new Function("return this")();
} catch (e) {
  // This works if the window reference is available
  if (typeof window === "object") g = window;
} // g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}


module.exports = g;

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);

var inspectSource = __webpack_require__(47);

var WeakMap = global.WeakMap;
module.exports = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

var toIndexedObject = __webpack_require__(9);

var toLength = __webpack_require__(12);

var toAbsoluteIndex = __webpack_require__(52); // `Array.prototype.{ indexOf, includes }` methods implementation


var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value; // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check

    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++]; // eslint-disable-next-line no-self-compare -- NaN check

      if (value != value) return true; // Array#indexOf ignores holes, Array#includes - not
    } else for (; length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    }
    return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(39);

var toObject = __webpack_require__(10);

var callWithSafeIterationClosing = __webpack_require__(98);

var isArrayIteratorMethod = __webpack_require__(77);

var toLength = __webpack_require__(12);

var createProperty = __webpack_require__(31);

var getIteratorMethod = __webpack_require__(79); // `Array.from` method implementation
// https://tc39.es/ecma262/#sec-array.from


module.exports = function from(arrayLike
/* , mapfn = undefined, thisArg = undefined */
) {
  var O = toObject(arrayLike);
  var C = typeof this == 'function' ? this : Array;
  var argumentsLength = arguments.length;
  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  var mapping = mapfn !== undefined;
  var iteratorMethod = getIteratorMethod(O);
  var index = 0;
  var length, result, step, iterator, next, value;
  if (mapping) mapfn = bind(mapfn, argumentsLength > 2 ? arguments[2] : undefined, 2); // if the target is not iterable or it's an array with the default iterator - use a simple case

  if (iteratorMethod != undefined && !(C == Array && isArrayIteratorMethod(iteratorMethod))) {
    iterator = iteratorMethod.call(O);
    next = iterator.next;
    result = new C();

    for (; !(step = next.call(iterator)).done; index++) {
      value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
      createProperty(result, index, value);
    }
  } else {
    length = toLength(O.length);
    result = new C(length);

    for (; length > index; index++) {
      value = mapping ? mapfn(O[index], index) : O[index];
      createProperty(result, index, value);
    }
  }

  result.length = index;
  return result;
};

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(6);

var iteratorClose = __webpack_require__(76); // call something on iterator step with safe closing on error


module.exports = function (iterator, fn, value, ENTRIES) {
  try {
    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value); // 7.4.6 IteratorClose(iterator, completion)
  } catch (error) {
    iteratorClose(iterator);
    throw error;
  }
};

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(38);

var requireObjectCoercible = __webpack_require__(34); // `String.prototype.{ codePointAt, at }` methods implementation


var createMethod = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = String(requireObjectCoercible($this));
    var position = toInteger(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = S.charCodeAt(position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF ? CONVERT_TO_STRING ? S.charAt(position) : first : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

module.exports = {
  // `String.prototype.codePointAt` method
  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod(true)
};

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var IteratorPrototype = __webpack_require__(83).IteratorPrototype;

var create = __webpack_require__(41);

var createPropertyDescriptor = __webpack_require__(27);

var setToStringTag = __webpack_require__(42);

var Iterators = __webpack_require__(30);

var returnThis = function () {
  return this;
};

module.exports = function (IteratorConstructor, NAME, next) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = create(IteratorPrototype, {
    next: createPropertyDescriptor(1, next)
  });
  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
  Iterators[TO_STRING_TAG] = returnThis;
  return IteratorConstructor;
};

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(7);

var definePropertyModule = __webpack_require__(8);

var anObject = __webpack_require__(6);

var objectKeys = __webpack_require__(58); // `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es/no-object-defineproperties -- safe


module.exports = DESCRIPTORS ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;

  while (length > index) definePropertyModule.f(O, key = keys[index++], Properties[key]);

  return O;
};

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);

module.exports = function (it) {
  if (!isObject(it) && it !== null) {
    throw TypeError("Can't set " + String(it) + ' as a prototype');
  }

  return it;
};

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $forEach = __webpack_require__(32).forEach;

var arrayMethodIsStrict = __webpack_require__(104);

var STRICT_METHOD = arrayMethodIsStrict('forEach'); // `Array.prototype.forEach` method implementation
// https://tc39.es/ecma262/#sec-array.prototype.foreach

module.exports = !STRICT_METHOD ? function forEach(callbackfn
/* , thisArg */
) {
  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined); // eslint-disable-next-line es/no-array-prototype-foreach -- safe
} : [].forEach;

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var fails = __webpack_require__(3);

module.exports = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call,no-throw-literal -- required for testing
    method.call(null, argument || function () {
      throw 1;
    }, 1);
  });
};

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(2);

var getOwnPropertyDescriptor = __webpack_require__(13).f;

var toLength = __webpack_require__(12);

var notARegExp = __webpack_require__(106);

var requireObjectCoercible = __webpack_require__(34);

var correctIsRegExpLogic = __webpack_require__(108);

var IS_PURE = __webpack_require__(17); // eslint-disable-next-line es/no-string-prototype-startswith -- safe


var $startsWith = ''.startsWith;
var min = Math.min;
var CORRECT_IS_REGEXP_LOGIC = correctIsRegExpLogic('startsWith'); // https://github.com/zloirock/core-js/pull/702

var MDN_POLYFILL_BUG = !IS_PURE && !CORRECT_IS_REGEXP_LOGIC && !!function () {
  var descriptor = getOwnPropertyDescriptor(String.prototype, 'startsWith');
  return descriptor && !descriptor.writable;
}(); // `String.prototype.startsWith` method
// https://tc39.es/ecma262/#sec-string.prototype.startswith

$({
  target: 'String',
  proto: true,
  forced: !MDN_POLYFILL_BUG && !CORRECT_IS_REGEXP_LOGIC
}, {
  startsWith: function startsWith(searchString
  /* , position = 0 */
  ) {
    var that = String(requireObjectCoercible(this));
    notARegExp(searchString);
    var index = toLength(min(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = String(searchString);
    return $startsWith ? $startsWith.call(that, search, index) : that.slice(index, index + search.length) === search;
  }
});

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

var isRegExp = __webpack_require__(107);

module.exports = function (it) {
  if (isRegExp(it)) {
    throw TypeError("The method doesn't accept regular expressions");
  }

  return it;
};

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);

var classof = __webpack_require__(28);

var wellKnownSymbol = __webpack_require__(1);

var MATCH = wellKnownSymbol('match'); // `IsRegExp` abstract operation
// https://tc39.es/ecma262/#sec-isregexp

module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classof(it) == 'RegExp');
};

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(1);

var MATCH = wellKnownSymbol('match');

module.exports = function (METHOD_NAME) {
  var regexp = /./;

  try {
    '/./'[METHOD_NAME](regexp);
  } catch (error1) {
    try {
      regexp[MATCH] = false;
      return '/./'[METHOD_NAME](regexp);
    } catch (error2) {
      /* empty */
    }
  }

  return false;
};

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var TO_STRING_TAG_SUPPORT = __webpack_require__(56);

var classof = __webpack_require__(80); // `Object.prototype.toString` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.tostring


module.exports = TO_STRING_TAG_SUPPORT ? {}.toString : function toString() {
  return '[object ' + classof(this) + ']';
};

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable es/no-object-getownpropertynames -- safe */
var toIndexedObject = __webpack_require__(9);

var $getOwnPropertyNames = __webpack_require__(51).f;

var toString = {}.toString;
var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return $getOwnPropertyNames(it);
  } catch (error) {
    return windowNames.slice();
  }
}; // fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window


module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : $getOwnPropertyNames(toIndexedObject(it));
};

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(2);

var fails = __webpack_require__(3);

var isArray = __webpack_require__(43);

var isObject = __webpack_require__(4);

var toObject = __webpack_require__(10);

var toLength = __webpack_require__(12);

var createProperty = __webpack_require__(31);

var arraySpeciesCreate = __webpack_require__(60);

var arrayMethodHasSpeciesSupport = __webpack_require__(44);

var wellKnownSymbol = __webpack_require__(1);

var V8_VERSION = __webpack_require__(40);

var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded'; // We can't use this feature detection in V8 since it causes
// deoptimization and serious performance degradation
// https://github.com/zloirock/core-js/issues/679

var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails(function () {
  var array = [];
  array[IS_CONCAT_SPREADABLE] = false;
  return array.concat()[0] !== array;
});
var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

var isConcatSpreadable = function (O) {
  if (!isObject(O)) return false;
  var spreadable = O[IS_CONCAT_SPREADABLE];
  return spreadable !== undefined ? !!spreadable : isArray(O);
};

var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT; // `Array.prototype.concat` method
// https://tc39.es/ecma262/#sec-array.prototype.concat
// with adding support of @@isConcatSpreadable and @@species

$({
  target: 'Array',
  proto: true,
  forced: FORCED
}, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  concat: function concat(arg) {
    var O = toObject(this);
    var A = arraySpeciesCreate(O, 0);
    var n = 0;
    var i, k, length, len, E;

    for (i = -1, length = arguments.length; i < length; i++) {
      E = i === -1 ? O : arguments[i];

      if (isConcatSpreadable(E)) {
        len = toLength(E.length);
        if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);

        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
      } else {
        if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        createProperty(A, n++, E);
      }
    }

    A.length = n;
    return A;
  }
});

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(2);

var $find = __webpack_require__(32).find;

var addToUnscopables = __webpack_require__(62);

var FIND = 'find';
var SKIPS_HOLES = true; // Shouldn't skip holes

if (FIND in []) Array(1)[FIND](function () {
  SKIPS_HOLES = false;
}); // `Array.prototype.find` method
// https://tc39.es/ecma262/#sec-array.prototype.find

$({
  target: 'Array',
  proto: true,
  forced: SKIPS_HOLES
}, {
  find: function find(callbackfn
  /* , that = undefined */
  ) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
}); // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables

addToUnscopables(FIND);

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);

module.exports = global.Promise;

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__(16);

module.exports = function (target, src, options) {
  for (var key in src) redefine(target, key, src[key], options);

  return target;
};

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getBuiltIn = __webpack_require__(14);

var definePropertyModule = __webpack_require__(8);

var wellKnownSymbol = __webpack_require__(1);

var DESCRIPTORS = __webpack_require__(7);

var SPECIES = wellKnownSymbol('species');

module.exports = function (CONSTRUCTOR_NAME) {
  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
  var defineProperty = definePropertyModule.f;

  if (DESCRIPTORS && Constructor && !Constructor[SPECIES]) {
    defineProperty(Constructor, SPECIES, {
      configurable: true,
      get: function () {
        return this;
      }
    });
  }
};

/***/ }),
/* 116 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name) {
  if (!(it instanceof Constructor)) {
    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
  }

  return it;
};

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(6);

var isArrayIteratorMethod = __webpack_require__(77);

var toLength = __webpack_require__(12);

var bind = __webpack_require__(39);

var getIteratorMethod = __webpack_require__(79);

var iteratorClose = __webpack_require__(76);

var Result = function (stopped, result) {
  this.stopped = stopped;
  this.result = result;
};

module.exports = function (iterable, unboundFunction, options) {
  var that = options && options.that;
  var AS_ENTRIES = !!(options && options.AS_ENTRIES);
  var IS_ITERATOR = !!(options && options.IS_ITERATOR);
  var INTERRUPTED = !!(options && options.INTERRUPTED);
  var fn = bind(unboundFunction, that, 1 + AS_ENTRIES + INTERRUPTED);
  var iterator, iterFn, index, length, result, next, step;

  var stop = function (condition) {
    if (iterator) iteratorClose(iterator);
    return new Result(true, condition);
  };

  var callFn = function (value) {
    if (AS_ENTRIES) {
      anObject(value);
      return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
    }

    return INTERRUPTED ? fn(value, stop) : fn(value);
  };

  if (IS_ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod(iterable);
    if (typeof iterFn != 'function') throw TypeError('Target is not iterable'); // optimisation for array iterators

    if (isArrayIteratorMethod(iterFn)) {
      for (index = 0, length = toLength(iterable.length); length > index; index++) {
        result = callFn(iterable[index]);
        if (result && result instanceof Result) return result;
      }

      return new Result(false);
    }

    iterator = iterFn.call(iterable);
  }

  next = iterator.next;

  while (!(step = next.call(iterator)).done) {
    try {
      result = callFn(step.value);
    } catch (error) {
      iteratorClose(iterator);
      throw error;
    }

    if (typeof result == 'object' && result && result instanceof Result) return result;
  }

  return new Result(false);
};

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(6);

var aFunction = __webpack_require__(18);

var wellKnownSymbol = __webpack_require__(1);

var SPECIES = wellKnownSymbol('species'); // `SpeciesConstructor` abstract operation
// https://tc39.es/ecma262/#sec-speciesconstructor

module.exports = function (O, defaultConstructor) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? defaultConstructor : aFunction(S);
};

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);

var getOwnPropertyDescriptor = __webpack_require__(13).f;

var macrotask = __webpack_require__(91).set;

var IS_IOS = __webpack_require__(92);

var IS_WEBOS_WEBKIT = __webpack_require__(120);

var IS_NODE = __webpack_require__(66);

var MutationObserver = global.MutationObserver || global.WebKitMutationObserver;
var document = global.document;
var process = global.process;
var Promise = global.Promise; // Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`

var queueMicrotaskDescriptor = getOwnPropertyDescriptor(global, 'queueMicrotask');
var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;
var flush, head, last, notify, toggle, node, promise, then; // modern engines have queueMicrotask method

if (!queueMicrotask) {
  flush = function () {
    var parent, fn;
    if (IS_NODE && (parent = process.domain)) parent.exit();

    while (head) {
      fn = head.fn;
      head = head.next;

      try {
        fn();
      } catch (error) {
        if (head) notify();else last = undefined;
        throw error;
      }
    }

    last = undefined;
    if (parent) parent.enter();
  }; // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
  // also except WebOS Webkit https://github.com/zloirock/core-js/issues/898


  if (!IS_IOS && !IS_NODE && !IS_WEBOS_WEBKIT && MutationObserver && document) {
    toggle = true;
    node = document.createTextNode('');
    new MutationObserver(flush).observe(node, {
      characterData: true
    });

    notify = function () {
      node.data = toggle = !toggle;
    }; // environments with maybe non-completely correct, but existent Promise

  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    promise = Promise.resolve(undefined); // workaround of WebKit ~ iOS Safari 10.1 bug

    promise.constructor = Promise;
    then = promise.then;

    notify = function () {
      then.call(promise, flush);
    }; // Node.js without promises

  } else if (IS_NODE) {
    notify = function () {
      process.nextTick(flush);
    }; // for other environments - macrotask based on:
    // - setImmediate
    // - MessageChannel
    // - window.postMessag
    // - onreadystatechange
    // - setTimeout

  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }
}

module.exports = queueMicrotask || function (fn) {
  var task = {
    fn: fn,
    next: undefined
  };
  if (last) last.next = task;

  if (!head) {
    head = task;
    notify();
  }

  last = task;
};

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

var userAgent = __webpack_require__(55);

module.exports = /web0s(?!.*chrome)/i.test(userAgent);

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(6);

var isObject = __webpack_require__(4);

var newPromiseCapability = __webpack_require__(93);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);

module.exports = function (a, b) {
  var console = global.console;

  if (console && console.error) {
    arguments.length === 1 ? console.error(a) : console.error(a, b);
  }
};

/***/ }),
/* 123 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return {
      error: false,
      value: exec()
    };
  } catch (error) {
    return {
      error: true,
      value: error
    };
  }
};

/***/ }),
/* 124 */
/***/ (function(module, exports) {

module.exports = typeof window == 'object';

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(2);

var toObject = __webpack_require__(10);

var nativeKeys = __webpack_require__(58);

var fails = __webpack_require__(3);

var FAILS_ON_PRIMITIVES = fails(function () {
  nativeKeys(1);
}); // `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys

$({
  target: 'Object',
  stat: true,
  forced: FAILS_ON_PRIMITIVES
}, {
  keys: function keys(it) {
    return nativeKeys(toObject(it));
  }
});

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(2);

var fails = __webpack_require__(3);

var toIndexedObject = __webpack_require__(9);

var nativeGetOwnPropertyDescriptor = __webpack_require__(13).f;

var DESCRIPTORS = __webpack_require__(7);

var FAILS_ON_PRIMITIVES = fails(function () {
  nativeGetOwnPropertyDescriptor(1);
});
var FORCED = !DESCRIPTORS || FAILS_ON_PRIMITIVES; // `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor

$({
  target: 'Object',
  stat: true,
  forced: FORCED,
  sham: !DESCRIPTORS
}, {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(it, key) {
    return nativeGetOwnPropertyDescriptor(toIndexedObject(it), key);
  }
});

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(2);

var DESCRIPTORS = __webpack_require__(7);

var ownKeys = __webpack_require__(71);

var toIndexedObject = __webpack_require__(9);

var getOwnPropertyDescriptorModule = __webpack_require__(13);

var createProperty = __webpack_require__(31); // `Object.getOwnPropertyDescriptors` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptors


$({
  target: 'Object',
  stat: true,
  sham: !DESCRIPTORS
}, {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIndexedObject(object);
    var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
    var keys = ownKeys(O);
    var result = {};
    var index = 0;
    var key, descriptor;

    while (keys.length > index) {
      descriptor = getOwnPropertyDescriptor(O, key = keys[index++]);
      if (descriptor !== undefined) createProperty(result, key, descriptor);
    }

    return result;
  }
});

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(2);

var fails = __webpack_require__(3);

var toObject = __webpack_require__(10);

var nativeGetPrototypeOf = __webpack_require__(57);

var CORRECT_PROTOTYPE_GETTER = __webpack_require__(84);

var FAILS_ON_PRIMITIVES = fails(function () {
  nativeGetPrototypeOf(1);
}); // `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof

$({
  target: 'Object',
  stat: true,
  forced: FAILS_ON_PRIMITIVES,
  sham: !CORRECT_PROTOTYPE_GETTER
}, {
  getPrototypeOf: function getPrototypeOf(it) {
    return nativeGetPrototypeOf(toObject(it));
  }
});

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(2);

var getBuiltIn = __webpack_require__(14);

var aFunction = __webpack_require__(18);

var anObject = __webpack_require__(6);

var isObject = __webpack_require__(4);

var create = __webpack_require__(41);

var bind = __webpack_require__(130);

var fails = __webpack_require__(3);

var nativeConstruct = getBuiltIn('Reflect', 'construct'); // `Reflect.construct` method
// https://tc39.es/ecma262/#sec-reflect.construct
// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it

var NEW_TARGET_BUG = fails(function () {
  function F() {
    /* empty */
  }

  return !(nativeConstruct(function () {
    /* empty */
  }, [], F) instanceof F);
});
var ARGS_BUG = !fails(function () {
  nativeConstruct(function () {
    /* empty */
  });
});
var FORCED = NEW_TARGET_BUG || ARGS_BUG;
$({
  target: 'Reflect',
  stat: true,
  forced: FORCED,
  sham: FORCED
}, {
  construct: function construct(Target, args
  /* , newTarget */
  ) {
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if (ARGS_BUG && !NEW_TARGET_BUG) return nativeConstruct(Target, args, newTarget);

    if (Target == newTarget) {
      // w/o altered newTarget, optimization for 0-4 arguments
      switch (args.length) {
        case 0:
          return new Target();

        case 1:
          return new Target(args[0]);

        case 2:
          return new Target(args[0], args[1]);

        case 3:
          return new Target(args[0], args[1], args[2]);

        case 4:
          return new Target(args[0], args[1], args[2], args[3]);
      } // w/o altered newTarget, lot of arguments case


      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args))();
    } // with altered newTarget, not support built-in constructors


    var proto = newTarget.prototype;
    var instance = create(isObject(proto) ? proto : Object.prototype);
    var result = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var aFunction = __webpack_require__(18);

var isObject = __webpack_require__(4);

var slice = [].slice;
var factories = {};

var construct = function (C, argsLength, args) {
  if (!(argsLength in factories)) {
    for (var list = [], i = 0; i < argsLength; i++) list[i] = 'a[' + i + ']'; // eslint-disable-next-line no-new-func -- we have no proper alternatives, IE8- only


    factories[argsLength] = Function('C,a', 'return new C(' + list.join(',') + ')');
  }

  return factories[argsLength](C, args);
}; // `Function.prototype.bind` method implementation
// https://tc39.es/ecma262/#sec-function.prototype.bind


module.exports = Function.bind || function bind(that
/* , ...args */
) {
  var fn = aFunction(this);
  var partArgs = slice.call(arguments, 1);

  var boundFunction = function bound()
  /* args... */
  {
    var args = partArgs.concat(slice.call(arguments));
    return this instanceof boundFunction ? construct(fn, args.length, args) : fn.apply(that, args);
  };

  if (isObject(fn.prototype)) boundFunction.prototype = fn.prototype;
  return boundFunction;
};

/***/ }),
/* 131 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./src/css/style.css
// extracted by mini-css-extract-plugin

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.from.js
var es_array_from = __webpack_require__(26);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.iterator.js
var es_string_iterator = __webpack_require__(19);

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.for-each.js
var web_dom_collections_for_each = __webpack_require__(59);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.filter.js
var es_array_filter = __webpack_require__(61);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.starts-with.js
var es_string_starts_with = __webpack_require__(105);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.slice.js
var es_array_slice = __webpack_require__(33);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__(20);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__(21);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.js
var es_symbol = __webpack_require__(22);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.description.js
var es_symbol_description = __webpack_require__(23);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.iterator.js
var es_symbol_iterator = __webpack_require__(24);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.iterator.js
var es_array_iterator = __webpack_require__(15);

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.iterator.js
var web_dom_collections_iterator = __webpack_require__(25);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.concat.js
var es_array_concat = __webpack_require__(111);

// CONCATENATED MODULE: ./src/js/utils.js

function calcTileType(index, boardSize) {
  // TODO АВТОТЕСТИК
  if (index === 0) {
    return 'top-left';
  }

  if (index === boardSize - 1) {
    return 'top-right';
  }

  if (index < boardSize - 1) {
    return 'top';
  }

  if (index === Math.pow(boardSize, 2) - boardSize) {
    return 'bottom-left';
  }

  if (index === Math.pow(boardSize, 2) - 1) {
    return 'bottom-right';
  }

  if (Math.pow(boardSize, 2) - index < boardSize) {
    return 'bottom';
  }

  if (index % boardSize === 0) {
    return 'left';
  }

  if (index % boardSize === boardSize - 1) {
    return 'right';
  }

  return 'center';
}
function calcHealthLevel(health) {
  if (health < 15) {
    return 'critical';
  }

  if (health < 50) {
    return 'normal';
  }

  return 'high';
}
function createCharacterTooltip(char) {
  return "\uD83C\uDF96".concat(char.level, " \u2694").concat(char.attack, " \uD83D\uDEE1").concat(char.defence, " \u2764").concat(char.health);
}
// CONCATENATED MODULE: ./src/js/constants/themes.js
var themes = {
  1: 'prairie',
  2: 'desert',
  3: 'arctic',
  4: 'mountain'
};
/* harmony default export */ var constants_themes = (themes);
// CONCATENATED MODULE: ./src/js/constants/cursors.js
var cursors = {
  auto: 'auto',
  pointer: 'pointer',
  crosshair: 'crosshair',
  notallowed: 'not-allowed'
};
/* harmony default export */ var constants_cursors = (cursors);
// CONCATENATED MODULE: ./src/js/models/GamePlay.js
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }















function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }





var GamePlay_GamePlay = /*#__PURE__*/function () {
  function GamePlay() {
    _classCallCheck(this, GamePlay);

    this.boardSize = 8;
    this.container = null;
    this.boardEl = null;
    this.cells = [];
    this.cellClickListeners = [];
    this.cellEnterListeners = [];
    this.cellLeaveListeners = [];
    this.newGameListeners = [];
    this.saveGameListeners = [];
    this.loadGameListeners = [];
    this.isPlayerFrozen = false;
  }

  _createClass(GamePlay, [{
    key: "bindToDOM",
    value: function bindToDOM(container) {
      if (!(container instanceof HTMLElement)) {
        throw new Error('container is not HTMLElement');
      }

      this.container = container;
    }
    /**
     * Draws boardEl with specific theme
     *
     * @param theme
     */

  }, {
    key: "drawUi",
    value: function drawUi(theme) {
      var _this = this;

      this.checkBinding();
      this.container.innerHTML = "\n      <div class=\"controls\">\n        <button data-id=\"action-restart\" class=\"btn\">New Game</button>\n        <button data-id=\"action-save\" class=\"btn\">Save Game</button>\n        <button data-id=\"action-load\" class=\"btn\">Load Game</button>\n      </div>\n      <div class=\"board-container\">\n        <div data-id=\"board\" class=\"board\"></div>\n      </div>\n      <div class=\"game-info\">\n        <div class=\"player-points\">\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0431\u0430\u043B\u043B\u043E\u0432: 0</div>\n      </div>\n    ";
      this.newGameEl = this.container.querySelector('[data-id=action-restart]');
      this.saveGameEl = this.container.querySelector('[data-id=action-save]');
      this.loadGameEl = this.container.querySelector('[data-id=action-load]');
      this.newGameEl.addEventListener('click', function (event) {
        return _this.onNewGameClick(event);
      });
      this.saveGameEl.addEventListener('click', function (event) {
        return _this.onSaveGameClick(event);
      });
      this.loadGameEl.addEventListener('click', function (event) {
        return _this.onLoadGameClick(event);
      });
      this.boardEl = this.container.querySelector('[data-id=board]');
      this.boardEl.classList.add(theme);

      for (var i = 0; i < Math.pow(this.boardSize, 2); i += 1) {
        var cellEl = document.createElement('div');
        cellEl.classList.add('cell', 'map-tile', "map-tile-".concat(calcTileType(i, this.boardSize)));
        cellEl.addEventListener('mouseenter', function (event) {
          return _this.onCellEnter(event);
        });
        cellEl.addEventListener('mouseleave', function (event) {
          return _this.onCellLeave(event);
        });
        cellEl.addEventListener('click', function (event) {
          return _this.onCellClick(event);
        });
        this.boardEl.appendChild(cellEl);
      }

      this.cells = Array.from(this.boardEl.querySelectorAll('.cell'));
    }
  }, {
    key: "changeTheme",
    value: function changeTheme(levelNumber) {
      for (var theme in constants_themes) {
        this.boardEl.classList.remove(constants_themes[theme]);
      }

      this.boardEl.classList.add(constants_themes[levelNumber]);
    }
    /**
     * Draws positions (with chars) on boardEl
     *
     * @param positions array of PositionedCharacter objects
     */

  }, {
    key: "redrawPositions",
    value: function redrawPositions(positions) {
      var _iterator = _createForOfIteratorHelper(this.cells),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var cell = _step.value;
          cell.innerHTML = '';
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      var _iterator2 = _createForOfIteratorHelper(positions),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var positionedChar = _step2.value;
          var position = positionedChar.position,
              character = positionedChar.character; // const cellEl = this.boardEl.children[position.position];

          var cellEl = this.cells[position];
          var charEl = document.createElement('div');
          charEl.classList.add('character', character.type, character.side);
          var healthEl = document.createElement('div');
          healthEl.classList.add('health-level');
          var healthIndicatorEl = document.createElement('div');
          healthIndicatorEl.classList.add('health-level-indicator', "health-level-indicator-".concat(calcHealthLevel(character.health)));
          healthIndicatorEl.style.width = "".concat(character.health, "%");
          healthEl.appendChild(healthIndicatorEl);
          charEl.appendChild(healthEl);
          cellEl.appendChild(charEl);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
    /**
     * Add listener to mouse enter for cell
     *
     * @param callback
     */

  }, {
    key: "addCellEnterListener",
    value: function addCellEnterListener(callback) {
      this.cellEnterListeners.push(callback);
    }
    /**
     * Add listener to mouse leave for cell
     *
     * @param callback
     */

  }, {
    key: "addCellLeaveListener",
    value: function addCellLeaveListener(callback) {
      this.cellLeaveListeners.push(callback);
    }
    /**
     * Add listener to mouse click for cell
     *
     * @param callback
     */

  }, {
    key: "addCellClickListener",
    value: function addCellClickListener(callback) {
      this.cellClickListeners.push(callback);
    }
    /**
     * Add listener to "New Game" button click
     *
     * @param callback
     */

  }, {
    key: "addNewGameListener",
    value: function addNewGameListener(callback) {
      this.newGameListeners.push(callback);
    }
    /**
     * Add listener to "Save Game" button click
     *
     * @param callback
     */

  }, {
    key: "addSaveGameListener",
    value: function addSaveGameListener(callback) {
      this.saveGameListeners.push(callback);
    }
    /**
     * Add listener to "Load Game" button click
     *
     * @param callback
     */

  }, {
    key: "addLoadGameListener",
    value: function addLoadGameListener(callback) {
      this.loadGameListeners.push(callback);
    }
  }, {
    key: "onCellEnter",
    value: function onCellEnter(event) {
      event.preventDefault();
      var index = this.cells.indexOf(event.currentTarget);
      this.lastEnteredCellIndex = index;
      if (this.isPlayerFrozen) return;
      this.cellEnterListeners.forEach(function (o) {
        return o.call(null, index);
      });
    }
  }, {
    key: "onCellLeave",
    value: function onCellLeave(event) {
      event.preventDefault();
      if (this.isPlayerFrozen) return;
      var index = this.cells.indexOf(event.currentTarget);
      this.cellLeaveListeners.forEach(function (o) {
        return o.call(null, index);
      });
    }
  }, {
    key: "onCellClick",
    value: function onCellClick(event) {
      if (this.isPlayerFrozen) return;
      var index = this.cells.indexOf(event.currentTarget);
      this.cellClickListeners.forEach(function (o) {
        return o.call(null, index);
      });
    }
  }, {
    key: "onNewGameClick",
    value: function onNewGameClick(event) {
      event.preventDefault();
      this.newGameListeners.forEach(function (o) {
        return o.call(null);
      });
    }
  }, {
    key: "onSaveGameClick",
    value: function onSaveGameClick(event) {
      event.preventDefault();
      this.saveGameListeners.forEach(function (o) {
        return o.call(null);
      });
    }
  }, {
    key: "onLoadGameClick",
    value: function onLoadGameClick(event) {
      event.preventDefault();
      this.loadGameListeners.forEach(function (o) {
        return o.call(null);
      });
    }
  }, {
    key: "showError",
    value: function showError(message) {
      alert(message);
    }
  }, {
    key: "showMessage",
    value: function showMessage(message) {
      alert(message);
    }
  }, {
    key: "selectCell",
    value: function selectCell(index) {
      var color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yellow';
      this.deselectCell(index);
      this.cells[index].classList.add('selected', "selected-".concat(color));
    }
  }, {
    key: "deselectCell",
    value: function deselectCell(index) {
      var _cell$classList;

      var cell = this.cells[index];

      (_cell$classList = cell.classList).remove.apply(_cell$classList, _toConsumableArray(Array.from(cell.classList).filter(function (o) {
        return o.startsWith('selected');
      })));
    }
  }, {
    key: "showCellTooltip",
    value: function showCellTooltip(message, index) {
      this.cells[index].title = message;
    }
  }, {
    key: "hideCellTooltip",
    value: function hideCellTooltip(index) {
      this.cells[index].title = '';
    }
  }, {
    key: "showDamage",
    value: function showDamage(index, damage) {
      // return new Promise((resolve) => {
      var cell = this.cells[index];
      var offsetTop = cell.offsetTop,
          offsetLeft = cell.offsetLeft;
      var damageEl = document.createElement('span');
      damageEl.textContent = damage;
      damageEl.classList.add('damage');
      damageEl.style.top = "".concat(offsetTop, "px");
      damageEl.style.left = "".concat(offsetLeft, "px");
      cell.insertAdjacentElement('afterend', damageEl);
      damageEl.addEventListener('animationend', function () {
        damageEl.remove(); // resolve();
      }); // });
    }
  }, {
    key: "setCursor",
    value: function setCursor(cursor) {
      this.boardEl.style.cursor = cursor;
    }
  }, {
    key: "checkBinding",
    value: function checkBinding() {
      if (this.container === null) {
        throw new Error('GamePlay not bind to DOM');
      }
    }
  }]);

  return GamePlay;
}();


// EXTERNAL MODULE: ./node_modules/regenerator-runtime/runtime.js
var runtime = __webpack_require__(63);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.find.js
var es_array_find = __webpack_require__(112);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.find-index.js
var es_array_find_index = __webpack_require__(64);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.splice.js
var es_array_splice = __webpack_require__(65);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.promise.js
var es_promise = __webpack_require__(90);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.keys.js
var es_object_keys = __webpack_require__(125);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.get-own-property-descriptor.js
var es_object_get_own_property_descriptor = __webpack_require__(126);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.get-own-property-descriptors.js
var es_object_get_own_property_descriptors = __webpack_require__(127);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.get-prototype-of.js
var es_object_get_prototype_of = __webpack_require__(128);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.reflect.construct.js
var es_reflect_construct = __webpack_require__(129);

// CONCATENATED MODULE: ./src/js/models/characters.js
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }












function characters_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function characters_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function characters_createClass(Constructor, protoProps, staticProps) { if (protoProps) characters_defineProperties(Constructor.prototype, protoProps); if (staticProps) characters_defineProperties(Constructor, staticProps); return Constructor; }

var Character = /*#__PURE__*/function () {
  function Character(level) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'generic';

    characters_classCallCheck(this, Character);

    if ((this instanceof Character ? this.constructor : void 0).name === 'Character') {
      throw new Error('НИЗЯ СОЗДАТЬ ПРОСТО ПЕРСА');
    }

    this.level = level;
    this.attack = 0;
    this.defence = 0;
    this._health = 50;
    this.type = type;
  }

  characters_createClass(Character, [{
    key: "levelUpNewCharacter",
    value: function levelUpNewCharacter() {
      for (var i = 1; i < this.level; i++) {
        this.increaseStat('attack');
        this.increaseStat('defence');
      }
    }
  }, {
    key: "levelUp",
    value: function levelUp() {
      this.level += 1;
      this.increaseStat('attack');
      this.increaseStat('defence');
      this.health += 80;
    }
  }, {
    key: "increaseStat",
    value: function increaseStat(stat) {
      var newValue = Math.max(this[stat], this[stat] * (80 + this.health) / 100);
      this[stat] = Math.floor(newValue);
    }
  }, {
    key: "health",
    get: function get() {
      return this._health;
    },
    set: function set(points) {
      this._health = points;

      if (this._health > 100) {
        this._health = 100;
      }

      if (this._health <= 0) {
        this._health = 0;
      }
    }
  }, {
    key: "calculateDamage",
    value: function calculateDamage(target) {
      var damage = Math.max(this.attack - target.defence, this.attack * 0.1);
      return Math.ceil(damage);
    }
  }]);

  return Character;
}();
var Swordsman = /*#__PURE__*/function (_Character) {
  _inherits(Swordsman, _Character);

  var _super = _createSuper(Swordsman);

  function Swordsman(level) {
    var _this;

    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'swordsman';

    characters_classCallCheck(this, Swordsman);

    _this = _super.call(this, level, type);
    _this.attack = 40;
    _this.defence = 10;
    _this.attackRange = 1;
    _this.moveRange = 4;
    _this.side = 'player';

    _this.levelUpNewCharacter();

    return _this;
  }

  return Swordsman;
}(Character);
var Bowman = /*#__PURE__*/function (_Character2) {
  _inherits(Bowman, _Character2);

  var _super2 = _createSuper(Bowman);

  function Bowman(level) {
    var _this2;

    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'bowman';

    characters_classCallCheck(this, Bowman);

    _this2 = _super2.call(this, level, type);
    _this2.attack = 25;
    _this2.defence = 25;
    _this2.attackRange = 2;
    _this2.moveRange = 2;
    _this2.side = 'player';

    _this2.levelUpNewCharacter();

    return _this2;
  }

  return Bowman;
}(Character);
var Magician = /*#__PURE__*/function (_Character3) {
  _inherits(Magician, _Character3);

  var _super3 = _createSuper(Magician);

  function Magician(level) {
    var _this3;

    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'magician';

    characters_classCallCheck(this, Magician);

    _this3 = _super3.call(this, level, type);
    _this3.attack = 10;
    _this3.defence = 40;
    _this3.attackRange = 4;
    _this3.moveRange = 1;
    _this3.side = 'player';

    _this3.levelUpNewCharacter();

    return _this3;
  }

  return Magician;
}(Character);
var Daemon = /*#__PURE__*/function (_Character4) {
  _inherits(Daemon, _Character4);

  var _super4 = _createSuper(Daemon);

  function Daemon(level) {
    var _this4;

    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'daemon';

    characters_classCallCheck(this, Daemon);

    _this4 = _super4.call(this, level, type);
    _this4.attack = 10;
    _this4.defence = 40;
    _this4.attackRange = 4;
    _this4.moveRange = 1;
    _this4.side = 'enemy';

    _this4.levelUpNewCharacter();

    return _this4;
  }

  return Daemon;
}(Character);
var Undead = /*#__PURE__*/function (_Character5) {
  _inherits(Undead, _Character5);

  var _super5 = _createSuper(Undead);

  function Undead(level) {
    var _this5;

    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'undead';

    characters_classCallCheck(this, Undead);

    _this5 = _super5.call(this, level, type);
    _this5.attack = 40;
    _this5.defence = 10;
    _this5.attackRange = 1;
    _this5.moveRange = 4;
    _this5.side = 'enemy';

    _this5.levelUpNewCharacter();

    return _this5;
  }

  return Undead;
}(Character);
var Vampire = /*#__PURE__*/function (_Character6) {
  _inherits(Vampire, _Character6);

  var _super6 = _createSuper(Vampire);

  function Vampire(level) {
    var _this6;

    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'vampire';

    characters_classCallCheck(this, Vampire);

    _this6 = _super6.call(this, level, type);
    _this6.attack = 25;
    _this6.defence = 25;
    _this6.attackRange = 2;
    _this6.moveRange = 2;
    _this6.side = 'enemy';

    _this6.levelUpNewCharacter();

    return _this6;
  }

  return Vampire;
}(Character);
// CONCATENATED MODULE: ./src/js/models/PositionedCharacter.js
function PositionedCharacter_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var PositionedCharacter_PositionedCharacter = function PositionedCharacter(character, position) {
  PositionedCharacter_classCallCheck(this, PositionedCharacter);

  if (!(character instanceof Character)) {
    throw new Error('character must be instance of Character or its children');
  }

  if (typeof position !== 'number') {
    throw new Error('position must be a number');
  }

  this.character = character;
  this.position = position;
};


// CONCATENATED MODULE: ./src/js/models/GameState.js
















function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function GameState_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = GameState_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function GameState_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return GameState_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return GameState_arrayLikeToArray(o, minLen); }

function GameState_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function GameState_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function GameState_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function GameState_createClass(Constructor, protoProps, staticProps) { if (protoProps) GameState_defineProperties(Constructor.prototype, protoProps); if (staticProps) GameState_defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var GameState_GameState = /*#__PURE__*/function () {
  function GameState() {
    GameState_classCallCheck(this, GameState);
  }

  GameState_createClass(GameState, null, [{
    key: "from",
    value: // иначе не получалось создавать экземпляры классов
    function from(_ref) {
      var positions = _ref.positions,
          currentTurn = _ref.currentTurn,
          currentLevel = _ref.currentLevel,
          points = _ref.points;
      var savedPositions = [];

      var _iterator = GameState_createForOfIteratorHelper(positions),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var positionedChar = _step.value;
          var character = positionedChar.character,
              position = positionedChar.position;

          var properties = _objectSpread({}, character);

          var formattedPositionedChar = {
            position: position,
            properties: properties,
            constructorName: character.type
          };
          savedPositions.push(formattedPositionedChar);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return {
        currentTurn: currentTurn,
        currentLevel: currentLevel,
        points: points,
        savedPositions: savedPositions
      };
    }
  }, {
    key: "getSavedData",
    value: function getSavedData(_ref2) {
      var currentTurn = _ref2.currentTurn,
          currentLevel = _ref2.currentLevel,
          points = _ref2.points,
          savedPositions = _ref2.savedPositions;
      var playerCharacters = [];
      var enemyCharacters = [];
      var positions = [];

      var _iterator2 = GameState_createForOfIteratorHelper(savedPositions),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var savedChar = _step2.value;
          var position = savedChar.position,
              properties = savedChar.properties,
              constructorName = savedChar.constructorName;
          var Constructor = this.characterClasses[constructorName];
          var newChar = new Constructor(1);

          for (var prop in properties) {
            newChar[prop] = properties[prop];
          }

          var positionedChar = new PositionedCharacter_PositionedCharacter(newChar, position);
          positions.push(positionedChar);

          if (newChar.side === 'player') {
            playerCharacters.push(newChar);
          } else {
            enemyCharacters.push(newChar);
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      return {
        playerCharacters: playerCharacters,
        enemyCharacters: enemyCharacters,
        gameControllerProperties: {
          currentTurn: currentTurn,
          currentLevel: currentLevel,
          points: points,
          positions: positions
        }
      };
    }
  }]);

  return GameState;
}();

_defineProperty(GameState_GameState, "characterClasses", {
  daemon: Daemon,
  swordsman: Swordsman,
  magician: Magician,
  bowman: Bowman,
  undead: Undead,
  vampire: Vampire
});


// CONCATENATED MODULE: ./src/js/models/Team.js
function Team_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = Team_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }



function Team_toConsumableArray(arr) { return Team_arrayWithoutHoles(arr) || Team_iterableToArray(arr) || Team_unsupportedIterableToArray(arr) || Team_nonIterableSpread(); }

function Team_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function Team_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return Team_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Team_arrayLikeToArray(o, minLen); }

function Team_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function Team_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return Team_arrayLikeToArray(arr); }

function Team_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }














function Team_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Team_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Team_createClass(Constructor, protoProps, staticProps) { if (protoProps) Team_defineProperties(Constructor.prototype, protoProps); if (staticProps) Team_defineProperties(Constructor, staticProps); return Constructor; }



var Team = /*#__PURE__*/function () {
  function Team(_ref) {
    var side = _ref.side,
        allowedTypes = _ref.allowedTypes,
        maxLevel = _ref.maxLevel,
        characterCount = _ref.characterCount;

    Team_classCallCheck(this, Team);

    this.side = side;
    this.characters = [];
    this.addNewCharacters(allowedTypes, maxLevel, characterCount);
  }

  Team_createClass(Team, [{
    key: Symbol.iterator,
    value: /*#__PURE__*/regeneratorRuntime.mark(function value() {
      var characters, length, i;
      return regeneratorRuntime.wrap(function value$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              characters = this.characters;
              length = characters.length;
              i = 0;

            case 3:
              if (!(i < length)) {
                _context.next = 9;
                break;
              }

              _context.next = 6;
              return Team_toConsumableArray(characters)[i];

            case 6:
              i++;
              _context.next = 3;
              break;

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, value, this);
    })
  }, {
    key: "length",
    get: function get() {
      return this.characters.length;
    }
  }, {
    key: "generateCharacter",
    value: function generateCharacter(allowedTypes, maxLevel) {
      var index = Math.floor(Math.random() * allowedTypes.length);
      var CharacterConstructor = allowedTypes[index];
      var level = Math.floor(Math.random() * maxLevel + 1);
      return new CharacterConstructor(level);
    }
  }, {
    key: "addNewCharacters",
    value: function addNewCharacters(allowedTypes, maxLevel, characterCount) {
      for (var i = 1; i <= characterCount; i++) {
        var newChar = this.generateCharacter(allowedTypes, maxLevel, this);
        this.characters.push(newChar);
      }
    }
  }, {
    key: "removeChar",
    value: function removeChar(character) {
      var index = this.characters.findIndex(function (char) {
        return char === character;
      });

      if (index !== -1) {
        this.characters.splice(index, 1);
      }
    }
  }, {
    key: "charsLevelUp",
    value: function charsLevelUp() {
      var _iterator = Team_createForOfIteratorHelper(this.characters),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var char = _step.value;
          char.levelUp();
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }]);

  return Team;
}();


// CONCATENATED MODULE: ./src/js/models/EnemyAI.js


function EnemyAI_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = EnemyAI_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function EnemyAI_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return EnemyAI_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return EnemyAI_arrayLikeToArray(o, minLen); }

function EnemyAI_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }















function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function EnemyAI_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function EnemyAI_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function EnemyAI_createClass(Constructor, protoProps, staticProps) { if (protoProps) EnemyAI_defineProperties(Constructor.prototype, protoProps); if (staticProps) EnemyAI_defineProperties(Constructor, staticProps); return Constructor; }

var EnemyAI = /*#__PURE__*/function () {
  function EnemyAI(gameController) {
    EnemyAI_classCallCheck(this, EnemyAI);

    this.gameController = gameController;
    this.movement = gameController.movement;
    this.potentialActions = [];
    this.delay = 100;
  }

  EnemyAI_createClass(EnemyAI, [{
    key: "doAction",
    value: function () {
      var _doAction = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _this = this;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", new Promise(function (resolve) {
                  _this.potentialActions = [];

                  var enemyChars = _this.gameController.getTeamPositions('enemy');

                  _this.playerChars = _this.gameController.getTeamPositions('player');

                  var _iterator = EnemyAI_createForOfIteratorHelper(enemyChars),
                      _step;

                  try {
                    for (_iterator.s(); !(_step = _iterator.n()).done;) {
                      var char = _step.value;

                      _this.pushCharActions(char);
                    }
                  } catch (err) {
                    _iterator.e(err);
                  } finally {
                    _iterator.f();
                  }

                  var action = _this.findBestAction(_this.potentialActions);

                  var promise = _this.performBestAction(action);

                  promise.then(function () {
                    setTimeout(function () {
                      _this.gameController.deselectEnemyCharacter();
                    }, _this.delay);
                    resolve();
                  });
                }));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function doAction() {
        return _doAction.apply(this, arguments);
      }

      return doAction;
    }()
  }, {
    key: "performBestAction",
    value: function performBestAction(action) {
      var _this2 = this;

      return new Promise(function (resolve) {
        var actor = action.actor,
            target = action.target;

        _this2.gameController.selectEnemyCharacter(actor.position);

        if (_this2.gameController.isCellAvailableForAttack(actor, target.position)) {
          setTimeout( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    _this2.gameController.performAttack(actor, target);

                    resolve();

                  case 2:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2);
          })), _this2.delay);
        } else {
          var promise = _this2.moveToTarget(actor, target);

          promise.then(function () {
            resolve();
          }).catch( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
            var actionIndex, nextAction;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    // удаление действия из списка и попытка выполнить другое действие
                    actionIndex = _this2.potentialActions.findIndex(function (elem) {
                      return elem === action;
                    });

                    _this2.potentialActions.splice(actionIndex, 1);

                    nextAction = _this2.findBestAction(_this2.potentialActions);

                    if (!nextAction) {
                      _context3.next = 9;
                      break;
                    }

                    _context3.next = 6;
                    return _this2.performBestAction(nextAction);

                  case 6:
                    resolve();
                    _context3.next = 11;
                    break;

                  case 9:
                    console.log('Тупик! Ну вообще странно');
                    resolve();

                  case 11:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee3);
          })));
        }
      });
    }
  }, {
    key: "calculatePriority",
    value: function calculatePriority(enemy, player) {
      var character = enemy.character,
          position = enemy.position;
      var moveRange = character.moveRange,
          attackRange = character.attackRange;

      var _this$movement$calcul = this.movement.calculateDistance(position, player.position),
          distance = _this$movement$calcul.distance;

      var turnsNumber = Math.ceil((distance - 1) / (moveRange + attackRange - 1));
      var potentialDamage = character.calculateDamage(player.character);
      var hitsToKill = Math.ceil(player.character.health / potentialDamage);
      return 1 / (hitsToKill + turnsNumber);
    }
  }, {
    key: "pushCharActions",
    value: function pushCharActions(enemyChar) {
      var _iterator2 = EnemyAI_createForOfIteratorHelper(this.playerChars),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var playerChar = _step2.value;
          var priority = this.calculatePriority(enemyChar, playerChar);
          var target = playerChar;
          var action = {
            actor: enemyChar,
            target: target,
            priority: priority
          };
          this.potentialActions.push(action);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  }, {
    key: "findBestAction",
    value: function findBestAction(actionsArr) {
      var mostEffectiveAction;
      var highestPriority = 0;

      var _iterator3 = EnemyAI_createForOfIteratorHelper(actionsArr),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var action = _step3.value;

          if (action.priority > highestPriority) {
            highestPriority = action.priority;
            mostEffectiveAction = action;
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      return mostEffectiveAction;
    } // вообще не самый удачный и понятный метод получился...

  }, {
    key: "moveToTarget",
    value: function moveToTarget(actor, target) {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        if (_this3.actionIsDone) return;
        var moveRange = actor.character.moveRange,
            index = actor.position;

        var _this3$movement$calcu = _this3.movement.calculateDistance(index, target.position),
            verticalDiff = _this3$movement$calcu.verticalDiff,
            horizontalDiff = _this3$movement$calcu.horizontalDiff;

        var isVerticalDiffNegative = verticalDiff < 0;
        var isHorizontalDiffNegative = horizontalDiff < 0;

        if (Math.abs(verticalDiff) > moveRange - 1) {
          verticalDiff = moveRange;
        } else if (verticalDiff !== 0) {
          verticalDiff = Math.abs(verticalDiff) - 1;
        }

        if (Math.abs(horizontalDiff) > moveRange - 1) {
          horizontalDiff = moveRange;
        } else if (horizontalDiff !== 0) {
          horizontalDiff = Math.abs(horizontalDiff) - 1;
        }

        if (isVerticalDiffNegative) verticalDiff *= -1;
        if (isHorizontalDiffNegative) horizontalDiff *= -1;

        var indexToMove = _this3.movement.calculatePositionByCoordsDifference(index, {
          verticalDiff: verticalDiff,
          horizontalDiff: horizontalDiff
        }); // перерасчёт indexToMove, если ячейка занята другим персонажем


        while (!_this3.gameController.isCellEmpty(indexToMove) && (Math.abs(verticalDiff) > 0 || Math.abs(horizontalDiff) > 0)) {
          if (Math.abs(verticalDiff) > Math.abs(horizontalDiff)) {
            verticalDiff += isVerticalDiffNegative ? 1 : -1;
          } else {
            horizontalDiff += isHorizontalDiffNegative ? 1 : -1;
          }

          indexToMove = _this3.movement.calculatePositionByCoordsDifference(index, {
            verticalDiff: verticalDiff,
            horizontalDiff: horizontalDiff
          });
        }

        if (indexToMove !== index) {
          setTimeout(function () {
            _this3.movement.moveChar(actor, indexToMove);

            resolve();
          }, _this3.delay);
        } else {
          reject(new Error('Нет очевидного пути'));
        }
      });
    }
  }]);

  return EnemyAI;
}();


// CONCATENATED MODULE: ./src/js/models/GameMovement.js
function GameMovement_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function GameMovement_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function GameMovement_createClass(Constructor, protoProps, staticProps) { if (protoProps) GameMovement_defineProperties(Constructor.prototype, protoProps); if (staticProps) GameMovement_defineProperties(Constructor, staticProps); return Constructor; }

var GameMovement = /*#__PURE__*/function () {
  function GameMovement(gamePlay, gameController) {
    GameMovement_classCallCheck(this, GameMovement);

    this.gamePlay = gamePlay;
    this.gameController = gameController;
  }

  GameMovement_createClass(GameMovement, [{
    key: "calculatePositionByCoordsDifference",
    value: function calculatePositionByCoordsDifference(index, _ref) {
      var verticalDiff = _ref.verticalDiff,
          horizontalDiff = _ref.horizontalDiff;
      return index + horizontalDiff + verticalDiff * this.gamePlay.boardSize;
    }
  }, {
    key: "calculateDistance",
    value: function calculateDistance(charPosition, cellIndex) {
      var boardSize = this.gamePlay.boardSize;
      var verticalDiff = Math.floor(cellIndex / boardSize) - Math.floor(charPosition / boardSize);
      var horizontalDiff = cellIndex % boardSize - charPosition % boardSize;
      var distance = Math.max(Math.abs(verticalDiff), Math.abs(horizontalDiff));
      return {
        distance: distance,
        verticalDiff: verticalDiff,
        horizontalDiff: horizontalDiff
      };
    }
  }, {
    key: "moveChar",
    value: function moveChar(char, index) {
      this.gamePlay.deselectCell(char.position);
      char.position = index;
      this.gameController.redrawPositions();
    }
  }, {
    key: "isCellAvailableForMove",
    value: function isCellAvailableForMove(_ref2, targetIndex) {
      var character = _ref2.character,
          position = _ref2.position;

      var _this$calculateDistan = this.calculateDistance(position, targetIndex),
          distance = _this$calculateDistan.distance;

      var isEmpty = this.gameController.isCellEmpty(targetIndex);
      return isEmpty && character.moveRange >= distance;
    }
  }]);

  return GameMovement;
}();


// CONCATENATED MODULE: ./src/js/models/GameController.js


function GameController_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function GameController_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { GameController_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { GameController_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }


















function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || GameController_unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function GameController_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = GameController_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function GameController_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return GameController_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return GameController_arrayLikeToArray(o, minLen); }

function GameController_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function GameController_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function GameController_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function GameController_createClass(Constructor, protoProps, staticProps) { if (protoProps) GameController_defineProperties(Constructor.prototype, protoProps); if (staticProps) GameController_defineProperties(Constructor, staticProps); return Constructor; }











var GameController_GameController = /*#__PURE__*/function () {
  function GameController(gamePlay, stateService) {
    GameController_classCallCheck(this, GameController);

    this.gamePlay = gamePlay;
    this.stateService = stateService;
    this.movement = new GameMovement(gamePlay, this);
    this.playerCharacterTypes = [Swordsman, Magician, Bowman];
    this.currentLevel = 0;
    this.currentTurn = 'player';
    this.enemyAI = new EnemyAI(this);
    this.selectedChar = null;
    this.playerOptions = {
      side: 'player',
      allowedTypes: [Swordsman, Magician, Bowman],
      maxLevel: 1,
      characterCount: 2
    };
  }

  GameController_createClass(GameController, [{
    key: "init",
    value: function init() {
      var _this = this;

      this.gamePlay.addCellEnterListener(function (index) {
        return _this.onCellEnter(index);
      });
      this.gamePlay.addCellClickListener(function (index) {
        return _this.onCellClick(index);
      });
      this.gamePlay.addCellLeaveListener(function (index) {
        return _this.onCellLeave(index);
      });
      this.gamePlay.addSaveGameListener(function () {
        var data = GameState_GameState.from(_this);

        _this.stateService.save(data);
      });
      this.gamePlay.addLoadGameListener(function () {
        return _this.loadHandler();
      });
      this.gamePlay.addNewGameListener(function () {
        return _this.startNewGame();
      });
      this.startNewGame(); // this.stateService.load();
    }
  }, {
    key: "loadHandler",
    value: function loadHandler() {
      var data; // console.log(1)

      try {
        // console.log(2)
        data = this.stateService.load(); // console.log(2);
      } catch (e) {
        this.gamePlay.showMessage(e.message);
        return;
      } // console.log(3)


      var savedData = GameState_GameState.getSavedData(data);
      var properties = savedData.gameControllerProperties,
          playerCharacters = savedData.playerCharacters,
          enemyCharacters = savedData.enemyCharacters;

      for (var prop in properties) {
        this[prop] = properties[prop];
      }

      this.playerTeam.characters = playerCharacters;
      this.enemyTeam.characters = enemyCharacters;
      this.gamePlay.changeTheme(this.currentLevel);
      this.redrawPositions();

      if (this.currentTurn === 'enemy') {
        this.handleEnemyTurn();
      }
    }
  }, {
    key: "startNewGame",
    value: function startNewGame() {
      this.points = 0;
      this.playerTeam = new Team(this.playerOptions);
      this.enemyTeam = this.generateEnemyTeam();
      this.positions = [];
      this.positionChars(this.playerTeam, this.enemyTeam);
      this.currentLevel = 0;
      this.startNextLevel();
      this.redrawPositions();
    }
  }, {
    key: "startNextLevel",
    value: function startNextLevel() {
      this.currentLevel += 1;

      if (this.currentLevel > 4) {
        this.gamePlay.showMessage('Вы победили, вы круты!');
        this.startNewGame();
      }

      this.isLevelStart = true;
      this.currentTurn = 'player';
      this.selectedChar = null;
      this.gamePlay.drawUi(constants_themes[this.currentLevel]);

      if (this.currentLevel > 1) {
        this.positions = [];
        this.recalculatePoints();
        this.playerTeam.charsLevelUp();
        var maxLevel = this.currentLevel - 1;
        this.playerTeam.addNewCharacters(this.playerCharacterTypes, maxLevel, maxLevel);
        this.enemyTeam = this.generateEnemyTeam();
        this.positionChars(this.playerTeam, this.enemyTeam);
        this.redrawPositions();
      }
    }
  }, {
    key: "generateEnemyTeam",
    value: function generateEnemyTeam() {
      var options = {
        side: 'enemy',
        allowedTypes: [Daemon, Undead, Vampire],
        maxLevel: this.currentLevel,
        characterCount: this.playerTeam.length
      };
      return new Team(options, this);
    }
  }, {
    key: "generatePosition",
    value: function generatePosition(side) {
      var boardSize = this.gamePlay.boardSize;
      var rowStart = Math.floor(Math.random() * boardSize) * boardSize;
      var randomOffset = Math.floor(Math.random() * 2);
      var teamOffset = side === 'enemy' ? boardSize - 2 : 0;
      return rowStart + randomOffset + teamOffset;
    }
  }, {
    key: "positionChars",
    value: function positionChars() {
      for (var _len = arguments.length, teams = new Array(_len), _key = 0; _key < _len; _key++) {
        teams[_key] = arguments[_key];
      }

      for (var _i = 0, _teams = teams; _i < _teams.length; _i++) {
        var team = _teams[_i];

        var _iterator = GameController_createForOfIteratorHelper(team),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var char = _step.value;
            var position = void 0;

            do {
              position = this.generatePosition(team.side);
            } while (this.getCharByPosition(position));

            var positionedChar = new PositionedCharacter_PositionedCharacter(char, position);
            this.positions.push(positionedChar);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
    }
  }, {
    key: "isCellAvailableForAttack",
    value: function isCellAvailableForAttack(actor, targetPosition) {
      var character = actor.character,
          position = actor.position;
      var target = this.getCharByPosition(targetPosition);

      var _this$movement$calcul = this.movement.calculateDistance(position, targetPosition),
          distance = _this$movement$calcul.distance;

      return target && character.attackRange >= distance;
    }
  }, {
    key: "recalculatePoints",
    value: function recalculatePoints() {
      var sum = 0;

      var _iterator2 = GameController_createForOfIteratorHelper(this.playerTeam),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var char = _step2.value;
          sum += char.health;
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      this.points += sum;

      var _document$getElements = document.getElementsByClassName('player-points'),
          _document$getElements2 = _slicedToArray(_document$getElements, 1),
          pointsDiv = _document$getElements2[0];

      pointsDiv.textContent = "\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0431\u0430\u043B\u043B\u043E\u0432: ".concat(this.points);
    }
  }, {
    key: "getTeamPositions",
    value: function getTeamPositions(side) {
      var positions = this.positions.filter(function (char) {
        return char.character.side === side;
      });
      return positions;
    }
  }, {
    key: "getCharByPosition",
    value: function getCharByPosition(index) {
      var positionedChar = this.positions.find(function (char) {
        return char.position === index;
      });
      return positionedChar || null;
    }
  }, {
    key: "removePositionedChar",
    value: function removePositionedChar(positionedChar) {
      var index = this.positions.findIndex(function (elem) {
        return elem === positionedChar;
      });

      if (index !== -1) {
        this.positions.splice(index, 1);
      } else {
        throw new Error('Невозможно удалить несуществующего персонажа');
      }

      if (this.selectedChar === positionedChar) {
        this.selectedChar = null;
      }
    }
  }, {
    key: "redrawPositions",
    value: function redrawPositions() {
      this.gamePlay.redrawPositions(this.positions);

      if (this.selectedChar) {
        var index = this.selectedChar.position;
        this.gamePlay.selectCell(index, 'yellow');
      }
    }
  }, {
    key: "selectEnemyCharacter",
    value: function selectEnemyCharacter(index) {
      this.gamePlay.selectCell(index, 'red');
    }
  }, {
    key: "deselectEnemyCharacter",
    value: function deselectEnemyCharacter(index) {
      if (index) {
        this.gamePlay.deselectCell(index);
      } else {
        var selected = document.getElementsByClassName('selected-red');
        selected.forEach(function (elem) {
          return elem.classList.remove('selected-red');
        });
      }
    }
  }, {
    key: "switchTurn",
    value: function switchTurn() {
      var _this2 = this;

      var delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      return new Promise(function (resolve) {
        // костыльное решение проблемы, когда в начале следующего уровня ходит противник
        if (_this2.isLevelStart) {
          _this2.gamePlay.isPlayerFrozen = false;
          _this2.currentTurn = 'player';
          return;
        }

        _this2.currentTurn = _this2.currentTurn === 'player' ? 'enemy' : 'player';
        setTimeout(function () {
          if (_this2.currentTurn === 'enemy') {
            _this2.handleEnemyTurn();
          } else {
            _this2.handlePlayerTurn();
          }

          resolve();
        }, delay);
      });
    }
  }, {
    key: "handleEnemyTurn",
    value: function () {
      var _handleEnemyTurn = GameController_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.gamePlay.isPlayerFrozen = true;
                this.gamePlay.setCursor(constants_cursors.notallowed);
                _context.next = 4;
                return this.enemyAI.doAction();

              case 4:
                _context.next = 6;
                return this.switchTurn(100);

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function handleEnemyTurn() {
        return _handleEnemyTurn.apply(this, arguments);
      }

      return handleEnemyTurn;
    }()
  }, {
    key: "handlePlayerTurn",
    value: function handlePlayerTurn() {
      this.gamePlay.isPlayerFrozen = false;
      this.onCellEnter(this.gamePlay.lastEnteredCellIndex);
    }
  }, {
    key: "commitTeamDefeat",
    value: function commitTeamDefeat(side) {
      if (side === 'player') {
        this.gamePlay.showMessage('Вы проиграли =( Попробуйте заново');
        this.startNewGame();
      } else {
        this.startNextLevel();
      }
    }
  }, {
    key: "removeCharacter",
    value: function removeCharacter(positionedChar, side) {
      var team = side === 'player' ? this.playerTeam : this.enemyTeam;
      this.removePositionedChar(positionedChar);
      team.removeChar(positionedChar.character);

      if (!team.length) {
        this.commitTeamDefeat(side);
      }
    }
  }, {
    key: "performPlayerAction",
    value: function performPlayerAction(actionType, index) {
      this.isLevelStart = false;

      if (actionType === 'attack') {
        var enemy = this.getCharByPosition(index);
        this.performAttack(this.selectedChar, enemy);
      } else {
        this.movement.moveChar(this.selectedChar, index);
      }
    }
  }, {
    key: "performAttack",
    value: function performAttack(actor, target) {
      var actorChar = actor.character;
      var targetChar = target.character;
      var damage = actorChar.calculateDamage(targetChar);
      targetChar.health -= damage;
      this.gamePlay.showDamage(target.position, damage);

      if (targetChar.health <= 0) {
        this.removeCharacter(target, targetChar.side);
      }

      if (targetChar.side === 'player') {
        this.gamePlay.deselectCell(target.position);
      }

      this.redrawPositions();
    }
  }, {
    key: "onCellClick",
    value: function () {
      var _onCellClick = GameController_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(index) {
        var selectedCell;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                selectedCell = document.getElementsByClassName('selected')[0];

                if (selectedCell) {
                  selectedCell.classList.remove('selected', 'selected-yellow');
                }

                if (!(this.selectedChar && this.movement.isCellAvailableForMove(this.selectedChar, index))) {
                  _context2.next = 7;
                  break;
                }

                this.performPlayerAction('move', index);
                _context2.next = 6;
                return this.switchTurn();

              case 6:
                return _context2.abrupt("return");

              case 7:
                if (this.isCellOfPlayer(index)) {
                  this.gamePlay.selectCell(index);
                  this.selectedChar = this.getCharByPosition(index);
                }

                if (!this.isCellOfEnemy(index)) {
                  _context2.next = 13;
                  break;
                }

                if (!(this.selectedChar && this.isCellAvailableForAttack(this.selectedChar, index))) {
                  _context2.next = 13;
                  break;
                }

                this.performPlayerAction('attack', index);
                _context2.next = 13;
                return this.switchTurn();

              case 13:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function onCellClick(_x) {
        return _onCellClick.apply(this, arguments);
      }

      return onCellClick;
    }()
  }, {
    key: "onCellEnter",
    value: function onCellEnter(index) {
      if (!this.isCellEmpty(index)) {
        var positionedChar = this.positions.find(function (elem) {
          return elem.position === index;
        });
        var character = positionedChar.character;
        var message = createCharacterTooltip(character);
        this.gamePlay.showCellTooltip(message, index);
      } else if (this.selectedChar) {
        this.handleAimAtEmptyCell(this.selectedChar, index);
      }

      if (this.isCellOfPlayer(index)) {
        this.gamePlay.setCursor(constants_cursors.pointer);
      }

      if (this.selectedChar && this.isCellOfEnemy(index)) {
        this.handleAimAtEnemy(this.selectedChar, index);
      }
    }
  }, {
    key: "onCellLeave",
    value: function onCellLeave(index) {
      var _this$selectedChar;

      if (((_this$selectedChar = this.selectedChar) === null || _this$selectedChar === void 0 ? void 0 : _this$selectedChar.position) !== index) {
        this.gamePlay.deselectCell(index);
      }

      this.gamePlay.setCursor(constants_cursors.auto);
      var cell = this.gamePlay.cells[index];

      if (cell.classList.contains('character')) {
        this.gamePlay.hideCellTooltip(index);
      }
    }
  }, {
    key: "getCellChildByIndex",
    value: function getCellChildByIndex(index) {
      var cell = this.gamePlay.cells[index];
      return cell.firstChild;
    }
  }, {
    key: "isCellOfPlayer",
    value: function isCellOfPlayer(index) {
      var cellChild = this.getCellChildByIndex(index);
      return cellChild === null || cellChild === void 0 ? void 0 : cellChild.classList.contains('player');
    }
  }, {
    key: "isCellOfEnemy",
    value: function isCellOfEnemy(index) {
      var cellChild = this.getCellChildByIndex(index);
      return cellChild === null || cellChild === void 0 ? void 0 : cellChild.classList.contains('enemy');
    }
  }, {
    key: "isCellEmpty",
    value: function isCellEmpty(index) {
      var cellChild = this.getCellChildByIndex(index);
      return !cellChild;
    }
  }, {
    key: "handleAimAtEnemy",
    value: function handleAimAtEnemy(playerChar, index) {
      if (this.isCellAvailableForAttack(playerChar, index)) {
        this.gamePlay.setCursor(constants_cursors.crosshair);
        this.gamePlay.selectCell(index, 'red-dashed');
      } else {
        this.gamePlay.setCursor(constants_cursors.notallowed);
      }
    }
  }, {
    key: "handleAimAtEmptyCell",
    value: function handleAimAtEmptyCell(playerChar, index) {
      if (this.movement.isCellAvailableForMove(playerChar, index)) {
        this.gamePlay.setCursor(constants_cursors.pointer);
        this.gamePlay.selectCell(index, 'green');
      } else {
        this.gamePlay.setCursor(constants_cursors.notallowed);
      }
    }
  }]);

  return GameController;
}();


// CONCATENATED MODULE: ./src/js/models/GameStateService.js
function GameStateService_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function GameStateService_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function GameStateService_createClass(Constructor, protoProps, staticProps) { if (protoProps) GameStateService_defineProperties(Constructor.prototype, protoProps); if (staticProps) GameStateService_defineProperties(Constructor, staticProps); return Constructor; }

var GameStateService = /*#__PURE__*/function () {
  function GameStateService(storage) {
    GameStateService_classCallCheck(this, GameStateService);

    this.storage = storage;
  }

  GameStateService_createClass(GameStateService, [{
    key: "save",
    value: function save(state) {
      this.storage.setItem('state', JSON.stringify(state));
    }
  }, {
    key: "load",
    value: function load() {
      var parsed;

      try {
        parsed = JSON.parse(this.storage.getItem('state'));
      } catch (e) {
        throw new Error('Invalid state');
      }

      if (!parsed) throw new Error('No saved data');
      return parsed;
    }
  }]);

  return GameStateService;
}();


// CONCATENATED MODULE: ./src/js/app.js
/**
 * Entry point of app: don't change this
 */



var app_gamePlay = new GamePlay_GamePlay();
app_gamePlay.bindToDOM(document.querySelector('#game-container'));
var app_stateService = new GameStateService(localStorage);
var gameCtrl = new GameController_GameController(app_gamePlay, app_stateService);
gameCtrl.init(); // don't write your code here
// CONCATENATED MODULE: ./src/index.js

 // entry point for webpack
// don't write your code here

/***/ })
/******/ ]);