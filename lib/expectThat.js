var expectThat;
expectThat = (function(expectThat) {
  return {
    init: function(assertProvider) {
      Object.prototype.should = function(expected) {
        var assertionType, expectedExceptionMessage, expectedVal;
        if (expected === null || typeof expected === "undefined") {
          expected = !!expected;
        }
        expectedVal = expected;
        if (typeof expected === "function") {
          expectedVal = expected();
        }
        assertionType = expectedVal.assertionType;
        expectedExceptionMessage = expectedVal.expected;
        if (typeof assertionType !== "undefined") {
          if (typeof expectedVal !== "undefined") {
            return assertProvider.assert(this).throwsException(expectedExceptionMessage);
          } else {
            return assertProvider.assert(this).throwsException;
          }
        } else {
          return assertProvider.assert(this).isEqualTo(expected);
        }
      };
      Object.prototype.shouldnt = function(expected) {
        return assertProvider.assert(this).isNotEqualTo(expected);
      };
      return this;
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
        "expected": typeof expected === "undefined" ? "" : expected
      };
    },
    extendApi: function(fn, assertProvder) {
      var description;
      if (!Object.prototype.should) {
        this.init(assertProvder);
      }
      description = fn.toString().match(/^[^\{]*\{((.*\s*)*)\}/m)[1];
      return description.replace(/(\^\s+|\s)+$/g, "").replace(/[(\^.(?)]/g, " ").replace(/return/g, " ").replace(/shouldnt/g, "shouldn't").replace(/void 0/g, "null").replace(/!= null/g, "").replace(/typeof null !== "undefined" && null !== null/g, "undefined");
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