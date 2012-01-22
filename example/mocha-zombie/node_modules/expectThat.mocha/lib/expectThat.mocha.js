var expectThatApi, root;
root = typeof exports !== "undefined" && exports !== null ? exports : window;
expectThatApi = (function(expectThatApi) {
  return {
    version: "0.2.2.2",
    init: function(assertProvider) {
      var _this;
      _this = this;
      Object.prototype.should = function(expected) {
        return _this.evaluateAssertion(assertProvider, true, this, expected);
      };
      Object.prototype.shouldnt = function(expected) {
        return _this.evaluateAssertion(assertProvider, false, this, expected);
      };
      return this;
    },
    executeThrowAssertion: function(assertionToEvaluate, expected, customAssertion) {
      if (typeof customAssertion.expected !== "undefined") {
        return assertionToEvaluate.throwsException(expected);
      } else {
        return assertionToEvaluate.throwsException();
      }
    },
    executeEqualToAssertion: function(isShould, assertionToEvaluate, expected) {
      if (isShould) {
        return assertionToEvaluate.isEqualTo(expected);
      } else {
        return assertionToEvaluate.isNotEqualTo(expected);
      }
    },
    executeBooleanAssertion: function(isShould, actual, expected, customAssertion, assertProvider) {
      var assertionToEvaluate;
      if (typeof customAssertion.expr !== "function") {
        throw "The provided custom assertion expression for " + customAssertion.assertionType + " is invalid.\nCustom assertion expressions should be defined as:\n(actual, expected) -> <some function using actual and expression>.";
      }
      assertionToEvaluate = assertProvider.assert(customAssertion.expr(actual, expected));
      if (isShould) {
        return assertionToEvaluate.isTrue();
      } else {
        return assertionToEvaluate.isFalse();
      }
    },
    executeAssertion: function(assertionToEvaluate, isShould, assertionType, actual, expected, customAssertion, assertProvider) {
      if (assertionToEvaluate === null || typeof assertionToEvaluate === "undefined") {
        return;
      }
      if (typeof assertionType !== "undefined") {
        if (assertionType === "throw") {
          return this.executeThrowAssertion(assertionToEvaluate, expected, customAssertion);
        } else {
          return this.executeBooleanAssertion(isShould, actual, expected, customAssertion, assertProvider);
        }
      } else {
        return this.executeEqualToAssertion(isShould, assertionToEvaluate, expected);
      }
    },
    evaluateAssertion: function(assertProvider, isShould, actual, expectedValueProvider) {
      var assertionToEvaluate, assertionType, customAssertion, expected;
      expected = expectedValueProvider;
      customAssertion = expectedValueProvider;
      if (typeof expectedValueProvider === "function") {
        customAssertion = expectedValueProvider();
      }
      if (typeof customAssertion !== "undefined" && customAssertion !== null) {
        assertionType = customAssertion.assertionType;
        if (typeof customAssertion.expected !== "undefined") {
          expected = customAssertion.expected;
        }
      }
      assertionToEvaluate = assertProvider.assert(actual);
      return this.executeAssertion(assertionToEvaluate, isShould, assertionType, actual, expected, customAssertion, assertProvider);
    }
  };
})(expectThatApi || (expectThatApi = {}));
(function(expectThatApi) {
  expectThatApi.util = {
    extend: function(destination, source) {
      var name;
      for (name in source) {
        if (source.hasOwnProperty(name) && destination) {
          destination[name] = source[name];
        }
      }
      return destination;
    }
  };
  return this;
})(expectThatApi || (expectThatApi = {}));
(function(expectThatApi) {
  expectThatApi.api = {
    be: function(expected) {
      return expected;
    },
    to: function(expected) {
      return expected;
    },
    equal: function(expected) {
      return expected;
    },
    throwException: function(expected) {
      return {
        "assertionType": "throw",
        "expected": expected
      };
    },
    extendApi: function(fn, assertProvder, desc) {
      var description;
      if (!Object.prototype.should) {
        expectThatApi.init(assertProvder);
      }
      if (typeof desc === "function" && typeof fn !== "function") {
        fn = desc;
        description = fn.toString().match(/^[^\{]*\{((.*\s*)*)\}/m)[1];
        description = description.replace(/\);/g, "").replace(/[(\^(?)]/g, " ").replace(/.should/g, " should").replace(/return/g, " ").replace(/shouldnt/g, "shouldn't").replace(/void 0/g, "null").replace(/!= null/g, "").replace(/typeof null !== "undefined" && null !== null/g, "undefined").replace(/^\s\s*/, '').replace(/\s\s*$/, '');
      } else {
        description = desc;
      }
      return [fn, description];
    }
  };
  return expectThatApi.util.extend(expectThatApi, expectThatApi.api);
})(expectThatApi || (expectThatApi = {}));
(function(expectThatApi) {
  expectThatApi.api.extendedMatchers = {
    greaterThan: function(expected) {
      return {
        "assertionType": "greaterThan",
        "expected": expected,
        "expr": function(actual, expected) {
          return actual > expected;
        }
      };
    },
    lessThan: function(expected) {
      return {
        "assertionType": "lessThan",
        "expected": expected,
        "expr": function(actual, expected) {
          return actual < expected;
        }
      };
    },
    greaterThanOrEqual: function(expected) {
      return {
        "assertionType": "greaterThanOrEqual",
        "expected": expected,
        "expr": function(actual, expected) {
          return actual >= expected;
        }
      };
    },
    lessThanOrEqual: function(expected) {
      return {
        "assertionType": "lessThanOrEqual",
        "expected": expected,
        "expr": function(actual, expected) {
          return actual <= expected;
        }
      };
    },
    strictlyEqual: function(expected) {
      return {
        "assertionType": "strictlyEqual",
        "expected": expected,
        "expr": function(actual, expected) {
          return actual === expected;
        }
      };
    }
  };
  return expectThatApi.util.extend(expectThatApi, expectThatApi.api.extendedMatchers);
})(expectThatApi || (expectThatApi = {}));
(function(expectThatApi, exports) {
  expectThatApi.api.Mocha = {};
  expectThatApi.assertionProvider = {};
  expectThatApi.assertionProvider = {
    assert: function(actual) {
      this.actual = actual;
      return this;
    },
    assertThat: function(expr, msg) {
      if (!expr) {
        throw new Error(msg || 'failed');
      }
    },
    isEqualTo: function(expected) {
      return this.assertThat(this.actual == expected, "The expected value was: '" + expected + "' and the actual value was: '" + this.actual + "'.");
    },
    isNotEqualTo: function(expected) {
      return this.assertThat(this.actual != expected, "The expected value was: '" + expected + "' and the actual value was: '" + this.actual + "'.");
    },
    isTrue: function() {
      return this.assertThat(this.actual, "The expected value was: '{expected}' and the actual value was: '" + this.actual + "'.");
    },
    isFalse: function() {
      return this.assertThat(!this.actual, "The expected value was: '{expected}' and the actual value was: '" + this.actual + "'.");
    },
    throwsException: function(message) {
      try {
        this.actual();
        return this.assertThat(false, "The function did not throw an exception");
      } catch (ex) {
        if (typeof message !== "undefined" && message !== null) {
          return this.assertThat(ex === message, "The function threw an exception, however, the error message did not match the provided\nexpected error message. The expected error message was '" + message + "' and the actual error message was\n'" + ex + "'.");
        } else {
          return this.assertThat(true, "The actual error message was '" + ex + "'.");
        }
      }
    }
  };
  expectThatApi.util.extend(expectThatApi.api.mocha, expectThatApi.assertionProvider);
  expectThatApi.api.mocha = {
    expectThat: function(desc, fn) {
      var newFn, result, testDescription;
      result = expectThatApi.api.extendApi(fn, expectThatApi.assertionProvider, desc);
      newFn = result[0];
      testDescription = result[1];
      return it(testDescription, newFn);
    }
  };
  expectThatApi.util.extend(expectThatApi, expectThatApi.api.mocha);
  exports.equal = expectThatApi.api.equal;
  exports.be = expectThatApi.api.be;
  exports.to = expectThatApi.api.to;
  exports.throwException = expectThatApi.api.throwException;
  exports.expectThat = expectThatApi.expectThat;
  exports.expectThatApi = expectThatApi;
  expectThatApi.util.extend(exports, expectThatApi.api.extendedMatchers);
  return this;
})(expectThatApi || (expectThatApi = {}), root);