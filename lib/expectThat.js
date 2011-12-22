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
    evaluateAssertion: function(assertProvider, isShould, actual, expected) {
      var assertionToEvaluate, assertionType, expectedVal, expectedValue;
      expectedVal = expected;
      if (typeof expected === "function") {
        expectedVal = expected();
      }
      if (typeof expectedVal !== "undefined" && expectedVal !== null) {
        assertionType = expectedVal.assertionType;
        expectedValue = expectedVal.expected;
      }
      if (typeof assertionType !== "undefined") {
        assertionToEvaluate = null;
        switch (assertionType) {
          case "throw":
            if (typeof expectedVal !== "undefined") {
              assertProvider.assert(actual).throwsException(expectedValue);
            } else {
              assertProvider.assert(actual).throwsException();
            }
            break;
          case "greaterThan":
            assertionToEvaluate = assertProvider.assert(actual > expectedValue);
            break;
          case "lessThan":
            assertionToEvaluate = assertProvider.assert(actual < expectedValue);
        }
        if (isShould) {
          if (assertionToEvaluate !== null) {
            return assertionToEvaluate.isTrue();
          }
        } else {
          if (assertionToEvaluate !== null) {
            return assertionToEvaluate.isFalse();
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
    greaterThan: function(expected) {
      return {
        "assertionType": "greaterThan",
        "expected": expected
      };
    },
    lessThan: function(expected) {
      return {
        "assertionType": "lessThan",
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
(function(expectThat, pavlov) {
  expectThat.api.pavlov = {
    expectThat: function(fn) {
      var testDescription;
      testDescription = this.extendApi(fn, pavlov.api);
      return pavlov.api.it(testDescription, fn);
    }
  };
  pavlov.util.extend(expectThat, expectThat.api);
  pavlov.util.extend(expectThat, expectThat.api.pavlov);
  return pavlov.util.extend(pavlov.api, expectThat);
})(expectThat || (expectThat = {}), window.pavlov);