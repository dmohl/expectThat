(function() {
  var expectThat;

  expectThat = require('../../../lib/expectThat.jasmine.js');

  describe("Example Mocha Specifications", function() {
    var foo;
    foo = "bar";
    describe("When testing should equal", function() {
      console.log(expectThat.expectThatApi.version);
      return expectThat(function() {
        return foo.should(equal("bar"));
      });
    });
    describe("When testing shouldnt equal", function() {
      return expectThat(function() {
        return foo.shouldnt(equal("baz"));
      });
    });
    describe("When testing for true", function() {
      expectThat(function() {
        return (foo === "bar").should(be(true));
      });
      return expectThat(function() {
        return (foo === "baz").shouldnt(be(true));
      });
    });
    describe("When testing for false", function() {
      expectThat(function() {
        return (foo === "baz").should(be(false));
      });
      return expectThat(function() {
        return (foo === "bar").shouldnt(be(false));
      });
    });
    describe("When testing to and be", function() {
      expectThat(function() {
        return foo.should(be(equal(to("bar"))));
      });
      return expectThat(function() {
        return foo.shouldnt(be(equal(to("bah"))));
      });
    });
    describe("When testing for null or undefined", function() {
      var testNull, testUndefined;
      testNull = null;
      testUndefined = void 0;
      expectThat(function() {
        return (testNull === null).should(be(true));
      });
      expectThat(function() {
        return (testNull !== null).shouldnt(be(true));
      });
      expectThat(function() {
        return (testUndefined === void 0).should(be(true));
      });
      return expectThat(function() {
        return (testUndefined === void 0).shouldnt(be(false));
      });
    });
    describe("When testing for throw", function() {
      expectThat(function() {
        return (function() {
          throw "test exception";
        }).should(throwException);
      });
      return expectThat(function() {
        return (function() {
          throw "test exception";
        }).should(throwException("test exception"));
      });
    });
    describe("When testing for greater than", function() {
      expectThat(function() {
        return 10..should(be(greaterThan(9)));
      });
      return expectThat(function() {
        return 9.1.shouldnt(be(greaterThan(10)));
      });
    });
    return describe("When testing for less than", function() {
      expectThat(function() {
        return 10..should(be(lessThan(11)));
      });
      return expectThat(function() {
        return 10.1.shouldnt(be(lessThan(10)));
      });
    });
  });

}).call(this);
