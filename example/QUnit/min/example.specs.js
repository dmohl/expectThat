(function() {
  var foo, testNull, testUndefined;

  module("Example QUnit Specifications");

  foo = "bar";

  module("When testing should equal");

  expectThat(function() {
    return foo.should(equal("bar"));
  });

  module("When testing shouldnt equal");

  expectThat(function() {
    return foo.shouldnt(equal("baz"));
  });

  module("When testing to and be");

  expectThat(function() {
    return foo.should(be(equal(to("bar"))));
  });

  expectThat(function() {
    return foo.shouldnt(be(equal(to("bah"))));
  });

  module("When testing for true");

  expectThat(function() {
    return (foo === "bar").should(be(true));
  });

  expectThat(function() {
    return (foo === "baz").shouldnt(be(true));
  });

  module("When testing for false");

  expectThat(function() {
    return (foo === "baz").should(be(false));
  });

  expectThat(function() {
    return (foo === "bar").shouldnt(be(false));
  });

  module("When testing for null or undefined");

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

  expectThat(function() {
    return (testUndefined === void 0).shouldnt(be(false));
  });

  module("When testing for throw");

  expectThat(function() {
    return (function() {
      throw "test exception";
    }).should(throwException);
  });

  expectThat(function() {
    return (function() {
      throw "test exception";
    }).should(throwException("test exception"));
  });

  module("When testing for greater than");

  expectThat(function() {
    return 10..should(be(greaterThan(9)));
  });

  expectThat(function() {
    return 9.1.shouldnt(be(greaterThan(10)));
  });

  module("When testing for less than");

  expectThat(function() {
    return 10..should(be(lessThan(11)));
  });

  expectThat(function() {
    return 10.1.shouldnt(be(lessThan(10)));
  });

  module("When testing with the example custom matcher");

  expectThat(function() {
    return 10..should(be(atleastTwoGreaterThan(8)));
  });

  expectThat(function() {
    return 10..shouldnt(be(atleastTwoGreaterThan(9)));
  });

}).call(this);
