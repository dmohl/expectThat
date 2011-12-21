
  pavlov.specify("expectThat Specifications", function() {
    describe("When testing should equal", function() {
      var foo;
      foo = void 0;
      before(function() {
        return foo = "bar";
      });
      after(function() {
        return foo = "baz";
      });
      expectThat(function() {
        return foo.should(equal("bar"));
      });
      expectThat(function() {
        return foo.should(equal("bar"));
      });
      return expectThat(function() {
        return (foo + "test").should(equal("bartest"));
      });
    });
    describe("When testing shouldnt equal", function() {
      var foo;
      foo = void 0;
      before(function() {
        return foo = "bar";
      });
      after(function() {
        return foo = "baz";
      });
      expectThat(function() {
        return foo.shouldnt(equal("baz"));
      });
      expectThat(function() {
        return foo.shouldnt(equal("baz"));
      });
      return expectThat(function() {
        return (foo + "test").shouldnt(equal("bartest2"));
      });
    });
    return describe("When testing to and be", function() {
      var foo;
      foo = void 0;
      before(function() {
        return foo = "bar";
      });
      after(function() {
        return foo = "baz";
      });
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
  });
