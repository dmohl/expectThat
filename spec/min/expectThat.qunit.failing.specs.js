(function() {
  var foo, testFn, testFn2, testNull, testUndefined;

  module("expectThat QUnit Failing Tests");

  module("When testing should equal");

  foo = "bar";

  expectThat(function() {
    return foo.should(equal("barz"));
  });

  expectThat(function() {
    return (foo + "test").should(equal("bartestz"));
  });

  expectThat(function() {
    return 1..should(equal(2));
  });

  module("When testing shouldnt equal");

  expectThat(function() {
    return foo.shouldnt(equal("bar"));
  });

  expectThat(function() {
    return (foo + "test").shouldnt(equal("bartest"));
  });

  expectThat(function() {
    return 1..shouldnt(equal(1));
  });

  module("When testing to and be");

  expectThat(function() {
    return foo.should(be(equal(to("barz"))));
  });

  expectThat(function() {
    return foo.shouldnt(be(equal(to("bar"))));
  });

  expectThat(function() {
    return (foo + "test").should(be(equal(to("bartestz"))));
  });

  expectThat(function() {
    return (foo + "test").shouldnt(be(equal(to("bartest"))));
  });

  module("When testing for true");

  expectThat(function() {
    return true.should(be(false));
  });

  expectThat(function() {
    return false.shouldnt(be(false));
  });

  expectThat(function() {
    return (foo === "bar").should(be(false));
  });

  expectThat(function() {
    return (foo === "baz").shouldnt(be(false));
  });

  expectThat(function() {
    return ("b" + "ar" === "bar").should(be(false));
  });

  expectThat(function() {
    return ("foo" === "baz").shouldnt(be(false));
  });

  expectThat(function() {
    return ("b" + "ar" === "bar").shouldnt(be(!false));
  });

  expectThat(function() {
    return ("foo" === "baz").should(be(!false));
  });

  module("When testing for false");

  expectThat(function() {
    return false.should(be(true));
  });

  expectThat(function() {
    return true.shouldnt(be(true));
  });

  expectThat(function() {
    return (foo === "baz").should(be(true));
  });

  expectThat(function() {
    return (foo === "bar").shouldnt(be(true));
  });

  expectThat(function() {
    return ("b" + "az" === "bar").should(be(true));
  });

  expectThat(function() {
    return ("b" + "az" === "baz").shouldnt(be(true));
  });

  expectThat(function() {
    return (foo === "bar").should(be(!true));
  });

  expectThat(function() {
    return ("b" + "az" === "bar").shouldnt(be(!true));
  });

  module("When testing for null or undefined");

  testNull = null;

  testUndefined = void 0;

  expectThat(function() {
    return (testNull === null).should(be(false));
  });

  expectThat(function() {
    return (testNull === null).shouldnt(be(true));
  });

  expectThat(function() {
    return (testNull !== null).should(be(true));
  });

  expectThat(function() {
    return (testNull !== null).shouldnt(be(false));
  });

  expectThat(function() {
    return (testUndefined === void 0).should(be(false));
  });

  expectThat(function() {
    return (testUndefined === void 0).shouldnt(be(true));
  });

  expectThat(function() {
    return (testUndefined !== void 0).should(be(true));
  });

  expectThat(function() {
    return (testUndefined !== void 0).shouldnt(be(false));
  });

  expectThat(function() {
    return (null === null).should(be(false));
  });

  expectThat(function() {
    return ("" === null).should(be(true));
  });

  expectThat(function() {
    return (void 0 === void 0).should(be(false));
  });

  expectThat(function() {
    return ("" === void 0).should(be(true));
  });

  module("When testing for throw");

  expectThat(function() {
    return (function() {
      return 1 / 1;
    }).should(throwException);
  });

  expectThat(function() {
    return (function() {
      throw "test";
    }).should(throwException("test exception"));
  });

  module("When testing for greater than");

  expectThat(function() {
    return 10..should(be(greaterThan(11)));
  });

  expectThat(function() {
    return 10.1.should(be(greaterThan(10.2)));
  });

  expectThat(function() {
    return 11..shouldnt(be(greaterThan(10)));
  });

  expectThat(function() {
    return 11..shouldnt(be(greaterThan(10)));
  });

  module("When testing for less than");

  expectThat(function() {
    return 11..should(be(lessThan(11)));
  });

  expectThat(function() {
    return 10.3.should(be(lessThan(10.2)));
  });

  expectThat(function() {
    return 9.9.shouldnt(be(lessThan(10)));
  });

  expectThat(function() {
    return 9..shouldnt(be(lessThan(10)));
  });

  module("When testing for greater than or equal to");

  expectThat(function() {
    return 10..should(be(greaterThanOrEqual(to(10.1))));
  });

  expectThat(function() {
    return 10..should(be(greaterThanOrEqual(10.1)));
  });

  expectThat(function() {
    return 8..should(be(greaterThanOrEqual(to(9))));
  });

  expectThat(function() {
    return 9.9.should(be(greaterThanOrEqual(to(10))));
  });

  expectThat(function() {
    return 10.1.shouldnt(be(greaterThanOrEqual(to(10))));
  });

  expectThat(function() {
    return 11..shouldnt(be(greaterThanOrEqual(to(10))));
  });

  module("When testing for less than or equal to");

  expectThat(function() {
    return 11.1.should(be(lessThanOrEqual(to(11))));
  });

  expectThat(function() {
    return 10.3.should(be(lessThanOrEqual(to(10.2))));
  });

  expectThat(function() {
    return 9.9.shouldnt(be(lessThanOrEqual(to(10))));
  });

  expectThat(function() {
    return 10..shouldnt(be(lessThanOrEqual(to(10))));
  });

  expectThat(function() {
    return 9..shouldnt(be(lessThanOrEqual(to(10))));
  });

  module("When testing strictly equal to");

  testFn = function() {};

  testFn2 = function() {};

  expectThat(function() {
    return 1..should(be(strictlyEqual(to(1))));
  });

  expectThat(function() {
    return testFn.shouldnt(be(strictlyEqual(to(testFn))));
  });

  expectThat(function() {
    return testFn.should(be(strictlyEqual(to(testFn2))));
  });

  expectThat(function() {
    return testFn2.shouldnt(be(strictlyEqual(to(testFn2))));
  });

}).call(this);
