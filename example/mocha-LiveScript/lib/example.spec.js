(function(){
  describe("Example Mocha Specifications", function(){
    var foo;
    foo = "bar";
    describe("When testing should equal", function(){
      return expectThat(function(){
        return foo.should(equal("bar"));
      });
    });
    describe("When testing shouldnt equal", function(){
      return expectThat(function(){
        return foo.shouldnt(equal("baz"));
      });
    });
    describe("When testing for true", function(){
      expectThat(function(){
        return (foo === "bar").should(be(true));
      });
      return expectThat(function(){
        return (foo === "baz").shouldnt(be(true));
      });
    });
    describe("When testing for false", function(){
      expectThat(function(){
        return (foo === "baz").should(be(false));
      });
      return expectThat(function(){
        return (foo === "bar").shouldnt(be(false));
      });
    });
    describe("When testing to and be", function(){
      expectThat(function(){
        return foo.should(be(equal(to("bar"))));
      });
      return expectThat(function(){
        return foo.shouldnt(be(equal(to("bah"))));
      });
    });
    describe("When testing for null or undefined", function(){
      var testNull, testUndefined;
      testNull = null;
      testUndefined = void 8;
      expectThat(function(){
        return (testNull === null).should(be(true));
      });
      expectThat(function(){
        return (testNull !== null).shouldnt(be(true));
      });
      expectThat(function(){
        return (testUndefined === void 8).should(be(true));
      });
      return expectThat(function(){
        return (testUndefined === void 8).shouldnt(be(false));
      });
    });
    describe("When testing for throw", function(){
      expectThat(function(){
        return function(){
          throw "test exception";
        }.should(throwException);
      });
      return expectThat(function(){
        return function(){
          throw "test exception";
        }.should(throwException("test exception"));
      });
    });
    describe("When testing for greater than", function(){
      expectThat(function(){
        return 10 .should(be(greaterThan(9)));
      });
      return expectThat(function(){
        return 9.1.shouldnt(be(greaterThan(10)));
      });
    });
    describe("When testing for less than", function(){
      expectThat(function(){
        return 10 .should(be(lessThan(11)));
      });
      return expectThat(function(){
        return 10.1.shouldnt(be(lessThan(10)));
      });
    });
    describe("When testing for the weekend", function(){
      var weekend, isWeekend;
      weekend = ['sat', 'sun'];
      isWeekend = function(dayOfWeek){
        switch (false) {
        case !__in(dayOfWeek, weekend):
          return true;
        default:
          return false;
        }
      };
      return expectThat(function(){
        return isWeekend(
        'sun').should(equal(true));
      });
    });
    return describe("When testing for a weekday", function(){
      var weekend, isWeekend;
      weekend = ['sat', 'sun'];
      isWeekend = function(dayOfWeek){
        switch (false) {
        case !__in(dayOfWeek, weekend):
          return true;
        default:
          return false;
        }
      };
      return expectThat(function(){
        return isWeekend(
        'mon').shouldnt(equal(true));
      });
    });
  });
  function __in(x, arr){
    var i = 0, l = arr.length >>> 0;
    while (i < l) if (x === arr[i++]) return true;
    return false;
  }
}).call(this);
