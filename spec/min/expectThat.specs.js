pavlov.specify("expectThat Specifications",function(){describe("When testing should equal",function(){var a;a=void 0;before(function(){return a="bar"});after(function(){return a="baz"});expectThat(function(){return a.should(equal("bar"))});expectThat(function(){return a.should(equal("bar"))});expectThat(function(){return(a+"test").should(equal("bartest"))});return expectThat(function(){return 1..should(equal(1))})});describe("When testing shouldnt equal",function(){var a;a=void 0;before(function(){return a="bar"});after(function(){return a="baz"});expectThat(function(){return a.shouldnt(equal("baz"))});expectThat(function(){return a.shouldnt(equal("baz"))});expectThat(function(){return(a+"test").shouldnt(equal("bartest2"))});return expectThat(function(){return 1..shouldnt(equal(2))})});return describe("When testing to and be",function(){var a;a=void 0;before(function(){return a="bar"});after(function(){return a="baz"});expectThat(function(){return a.should(be(equal(to("bar"))))});expectThat(function(){return a.shouldnt(be(equal(to("bah"))))});expectThat(function(){return(a+"test").should(be(equal(to("bartest"))))});return expectThat(function(){return(a+"test").shouldnt(be(equal(to("bartest2"))))})})});