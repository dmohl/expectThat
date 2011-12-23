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
      if (typeof assertionType !== "undefined") {
        if (assertionType === "throw") {
          if (typeof customAssertion.expected !== "undefined") {
            return assertProvider.assert(actual).throwsException(expected);
          } else {
            return assertProvider.assert(actual).throwsException();
          }
        } else {
          assertionToEvaluate = assertProvider.assert(customAssertion.expr(actual, expected));
          if (isShould) {
            if (assertionToEvaluate !== null) {
              return assertionToEvaluate.isTrue();
            }
          } else {
            if (assertionToEvaluate !== null) {
              return assertionToEvaluate.isFalse();
            }
          }
        }
      } else if (isShould) {
        return assertProvider.assert(actual).isEqualTo(expected);
      } else if (!isShould) {
        return assertProvider.assert(actual).isNotEqualTo(expected);
      }
    }
  };
})(expectThat || (expectThat = {}));
(function(expectThat) {
  expectThat.util = {
    extend: function(destintation, source) {
      var method, name;
      for (name in source) {
        method = source[name];
        destintation[name] = method;
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
  return this;
})(expectThat || (expectThat = {}));
(function(expectThat) {
  expectThat.api.customMatchers = {
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
    }
  };
  return this;
})(expectThat || (expectThat = {}));(function(expectThat) {
  expectThat.util.extend(expectThat, expectThat.api);
  return expectThat.util.extend(expectThat, expectThat.api.customMatchers);
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