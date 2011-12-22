var expectThat;
expectThat = (function(expectThat) {
  return {
    init: function(assertProvider) {
      Object.prototype.should = function(expected) {
        if (expected === null || typeof expected === "undefined") {
          expected = !!expected;
        }
        return assertProvider.assert(this).isEqualTo(expected);
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