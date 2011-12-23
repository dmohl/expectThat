var expectThat;
expectThat = (function(expectThat) {
  return {
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
})(expectThat || (expectThat = {}));
(function(expectThat) {
  expectThat.util = {
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
})(expectThat || (expectThat = {}));
(function(expectThat) {
  expectThat.api = {
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
    extendApi: function(fn, assertProvder) {
      var description;
      if (!Object.prototype.should) {
        this.init(assertProvder);
      }
      description = fn.toString().match(/^[^\{]*\{((.*\s*)*)\}/m)[1];
      return description.replace(/(\^\s+|\s)+$/g, "").replace(/[(\^(?)]/g, " ").replace(/.should/g, " should").replace(/return/g, " ").replace(/shouldnt/g, "shouldn't").replace(/void 0/g, "null").replace(/!= null/g, "").replace(/typeof null !== "undefined" && null !== null/g, "undefined");
    }
  };
  return expectThat.util.extend(expectThat, expectThat.api);
})(expectThat || (expectThat = {}));
(function(expectThat) {
  expectThat.api.extendedMatchers = {
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
  return expectThat.util.extend(expectThat, expectThat.api.extendedMatchers);
})(expectThat || (expectThat = {}));
(function(expectThat, pavlov) {
  expectThat.api.pavlov = {
    expectThat: function(fn) {
      var testDescription;
      testDescription = this.extendApi(fn, pavlov.api);
      return pavlov.api.it(testDescription, fn);
    }
  };
  expectThat.util.extend(expectThat, expectThat.api.pavlov);
  return expectThat.util.extend(pavlov.api, expectThat);
})(expectThat || (expectThat = {}), window.pavlov);