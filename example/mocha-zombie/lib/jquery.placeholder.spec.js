(function() {
  var browser, zombie;
  zombie = require("zombie");
  require("expectThat.mocha");
  browser = new zombie.Browser();
  describe("Given a jquery.placholder with", function() {
    var input;
    input = "";
    describe("no value", function() {
      describe("when calling placeholder plugin", function() {
        return expectThat("should have an input value of 'Start Typing'", function(done) {
          browser.visit("http://127.0.0.1/~dmohl/mocha-zombie/specs.html");
          return browser.wait(function() {
            input = browser.querySelector(".search");
            input.value.should(equal("Start Typing"));
            return done();
          });
        });
      });
      /* TODO: Identify why this is failing
      describe "when focusing input without user value",  ->
        expectThat "should have an input value of ''", (done) ->
          browser.visit "http://127.0.0.1/~dmohl/mocha-zombie/specs.html"
          browser.wait ->
            browser.evaluate "document.getElementById('search').focus()"
            input = browser.querySelector ".search"
            input.value.should equal ""
            done()
      */
      return describe("when leaving input without user value", function() {
        return expectThat("should have an input value of 'Start Typing'", function(done) {
          browser.visit("http://127.0.0.1/~dmohl/mocha-zombie/specs.html");
          return browser.wait(function() {
            browser.evaluate("document.getElementById('test').focus()");
            input = browser.querySelector(".search");
            input.value.should(equal("Start Typing"));
            return done();
          });
        });
      });
    });
    return describe("a user supplied value", function() {
      describe("when calling placeholder plugin", function() {
        return expectThat("should have an input value of 'bacon'", function(done) {
          browser.visit("http://127.0.0.1/~dmohl/mocha-zombie/specs.html");
          return browser.wait(function() {
            browser.fill(".search", "bacon");
            input = browser.querySelector(".search");
            input.value.should(equal("bacon"));
            return done();
          });
        });
      });
      describe("when focusing input with user value", function() {
        return expectThat("should have an input value of 'bacon'", function(done) {
          browser.visit("http://127.0.0.1/~dmohl/mocha-zombie/specs.html");
          return browser.wait(function() {
            browser.fill(".search", "bacon");
            browser.evaluate("document.getElementById('search').focus()");
            input = browser.querySelector(".search");
            input.value.should(equal("bacon"));
            return done();
          });
        });
      });
      return describe("when leaving input without user value", function() {
        return expectThat("should have an input value of 'bacon'", function(done) {
          browser.visit("http://127.0.0.1/~dmohl/mocha-zombie/specs.html");
          return browser.wait(function() {
            browser.fill(".search", "bacon");
            browser.evaluate("document.getElementById('test').focus()");
            input = browser.querySelector(".search");
            input.value.should(equal("bacon"));
            return done();
          });
        });
      });
    });
  });
}).call(this);
