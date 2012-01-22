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
        return expectThat("should have an input value of 'Start Typing'", function() {
          return browser.visit("http://127.0.0.1/~dmohl/mocha-zombie/Index.html", {
            debug: false
          }, function(e, brwser, status) {
            input = brwser.querySelector(".search");
            return input.value.should(equal("Start Typing"));
          });
        });
      });
      describe("when focusing input without user value", function() {
        return expectThat("should have an input value of ''", function() {
          return browser.visit("http://127.0.0.1/~dmohl/mocha-zombie/Index.html", {
            debug: false
          }, function(e, brwser, status) {
            brwser.evaluate("document.getElementById('search').focus()");
            input = brwser.querySelector(".search");
            return brwser.querySelector(".search").value.should(equal(""));
          });
        });
      });
      return describe("when leaving input without user value", function() {
        return expectThat("should have an input value of 'Start Typing'", function() {
          return browser.visit("http://127.0.0.1/~dmohl/mocha-zombie/Index.html", {
            debug: false
          }, function(e, brwser, status) {
            brwser.evaluate("document.getElementById('search').focus().blur()");
            input = brwser.querySelector(".search");
            return input.value.should(equal("Start Type"));
          });
        });
      });
    });
    return describe("a user supplied value", function() {
      describe("when calling placeholder plugin", function() {
        return expectThat("should have an input value of 'bacon'", function() {
          return browser.visit("http://127.0.0.1/~dmohl/mocha-zombie/Index.html", {
            debug: false
          }, function(e, brwser, status) {
            input = brwser.querySelector(".search");
            return input.value.should(equal("bacon"));
          });
        });
      });
      describe("when focusing input with user value", function() {
        return expectThat("should have an input value of 'bacon'", function() {
          return browser.visit("http://127.0.0.1/~dmohl/mocha-zombie/Index.html", {
            debug: false
          }, function(e, brwser, status) {
            brwser.evaluate("document.getElementById('search').focus()");
            input = brwser.querySelector(".search");
            return input.value.should(equal("bacon"));
          });
        });
      });
      return describe("when leaving input without user value", function() {
        return expectThat("should have an input value of 'bacon'", function() {
          return browser.visit("http://127.0.0.1/~dmohl/mocha-zombie/Index.html", {
            debug: false
          }, function(e, brwser, status) {
            brwser.evaluate("document.getElementById('search').focus().blur()");
            input = brwser.querySelector(".search");
            return input.value.should(equal("bacon"));
          });
        });
      });
    });
  });
}).call(this);
