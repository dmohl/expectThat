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
    extend: function(destintation, source) {
      var name;
      for (name in source) {
        if (source.hasOwnProperty(name)) {
          destintation[name] = source[name];
        }
      }
      return destintation;
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
  expectThatApi.api.jasmine = {};
  expectThatApi.assertionProvider = {};
  expectThatApi.assertionProvider = {
    assert: function(actual) {
      this.actual = actual;
      return this;
    },
    isEqualTo: function(expected) {
      if (typeof expected === "boolean") {
        return expect(this.actual == expected).toBeTruthy();
      } else {
        return expect(this.actual).toEqual(expected);
      }
    },
    isNotEqualTo: function(expected) {
      if (typeof expected === "boolean") {
        return expect(this.actual == expected).toBeFalsy();
      } else {
        return expect(this.actual).toNotEqual(expected);
      }
    },
    isTrue: function() {
      return expect(this.actual).toBeTruthy();
    },
    isFalse: function() {
      return expect(this.actual).toBeFalsy();
    },
    throwsException: function(message) {
      try {
        this.actual();
        return expect(true).toBeFalsy();
      } catch (ex) {
        if (typeof message !== "undefined" && message !== null && message !== ex) {
          return expect(true).toBeFalsy();
        } else {
          return expect(true).toBeTruthy();
        }
      }
    }
  };
  expectThatApi.util.extend(expectThatApi.api.jasmine, expectThatApi.assertionProvider);
  expectThatApi.api.jasmine = {
    expectThat: function(desc, fn) {
      var env, newFn, result, testDescription;
      result = expectThatApi.api.extendApi(fn, expectThatApi.assertionProvider, desc);
      newFn = result[0];
      testDescription = result[1];
      env = jasmine.getEnv();
      return env.it(testDescription, newFn);
    }
  };
  expectThatApi.util.extend(expectThatApi, expectThatApi.api.jasmine);
  exports.equal = expectThatApi.api.equal;
  exports.be = expectThatApi.api.be;
  exports.to = expectThatApi.api.to;
  exports.throwException = expectThatApi.api.throwException;
  exports.expectThat = expectThatApi.expectThat;
  exports.expectThatApi = expectThatApi;
  expectThatApi.util.extend(exports, expectThatApi.api.extendedMatchers);
  return this;
})(expectThatApi || (expectThatApi = {}), root);