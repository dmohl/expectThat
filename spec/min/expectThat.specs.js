
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
        return expectThat(function() {
          return (foo === "baz").shouldnt(be(true));
        });
      });
      return describe("When testing for false", function() {
        expectThat(function() {
          return false.should(be(false));
        });
        expectThat(function() {
          return true.shouldnt(be(false));
        });
        expectThat(function() {
          return (foo === "baz").should(be(false));
        });
        return expectThat(function() {
          return (foo === "bar").shouldnt(be(false));
        });
      });
    });
  });
