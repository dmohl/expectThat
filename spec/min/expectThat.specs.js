
  pavlov.specify("expectThat Specifications", function() {
    return describe("", function() {
      var foo;
      foo = void 0;
      before(function() {
        return foo = "bar";
      });
      after(function() {
        return foo = "baz";
      });
      describe("When testing should equal", function() {
        expectThat(function() {
          return foo.should(equal("bar"));
        });
        expectThat(function() {
          return (foo + "test").should(equal("bartest"));
        });
        return expectThat(function() {
          return 1..should(equal(1));
        });
      });
      describe("When testing shouldnt equal", function() {
        expectThat(function() {
          return foo.shouldnt(equal("baz"));
        });
        expectThat(function() {
          return (foo + "test").shouldnt(equal("bartest2"));
        });
        return expectThat(function() {
          return 1..shouldnt(equal(2));
        });
      });
      describe("When testing to and be", function() {
        expectThat(function() {
          return foo.should(be(equal(to("bar"))));
        });
        expectThat(function() {
          return foo.shouldnt(be(equal(to("bah"))));
        });
        expectThat(function() {
          return (foo + "test").should(be(equal(to("bartest"))));
        });
        return expectThat(function() {
          return (foo + "test").shouldnt(be(equal(to("bartest2"))));
        });
      });
      describe("When testing for true", function() {
        expectThat(function() {
          return true.should(be(true));
        });
        expectThat(function() {
          return false.shouldnt(be(true));
        });
        expectThat(function() {
          return (foo === "bar").should(be(true));
        });
        expectThat(function() {
          return (foo === "baz").shouldnt(be(true));
        });
        expectThat(function() {
          return ("b" + "ar" === "bar").should(be(true));
        });
        expectThat(function() {
          return ("foo" === "baz").shouldnt(be(true));
        });
        expectThat(function() {
          return ("b" + "ar" === "bar").shouldnt(be(!true));
        });
        return expectThat(function() {
          return ("foo" === "baz").should(be(!true));
        });
      });
      describe("When testing for false", function() {
        expectThat(function() {
          return false.should(be(false));
        });
        expectThat(function() {
          return true.shouldnt(be(false));
        });
        expectThat(function() {
          return (foo === "baz").should(be(false));
        });
        expectThat(function() {
          return (foo === "bar").shouldnt(be(false));
        });
        expectThat(function() {
          return ("b" + "az" === "bar").should(be(false));
        });
        expectThat(function() {
          return ("b" + "az" === "baz").shouldnt(be(false));
        });
        expectThat(function() {
          return (foo === "bar").should(be(!false));
        });
        return expectThat(function() {
          return ("b" + "az" === "bar").shouldnt(be(!false));
        });
      });
      return describe("When testing for null or undefined", function() {
        var testNull, testUndefined;
        testNull = null;
        testUndefined = void 0;
        expectThat(function() {
          return (testNull != null).should(be(null));
        });
        expectThat(function() {
          return (typeof null !== "undefined" && null !== null).should(be(null));
        });
        expectThat(function() {
          return (void 0 != null).shouldnt(be(null));
        });
        expectThat(function() {
          return (void 0 != null).should(be(void 0));
        });
        expectThat(function() {
          return (testUndefined != null).should(be(void 0));
        });
        expectThat(function() {
          return (typeof null !== "undefined" && null !== null).shouldnt(be(void 0));
        });
        expectThat(function() {
          return ("" != null).shouldnt(be(null));
        });
        expectThat(function() {
          return ("" != null).shouldnt(be(void 0));
        });
        expectThat(function() {
          return (foo != null).shouldnt(be(void 0));
        });
        expectThat(function() {
          return (foo != null).shouldnt(be(null));
        });
        expectThat(function() {
          return (void 0 != null).shouldnt(be(!void 0));
        });
        expectThat(function() {
          return (typeof null !== "undefined" && null !== null).shouldnt(be(!null));
        });
        expectThat(function() {
          return (foo != null).should(be(!void 0));
        });
        return expectThat(function() {
          return (foo != null).should(be(!null));
        });
      });
    });
  });
