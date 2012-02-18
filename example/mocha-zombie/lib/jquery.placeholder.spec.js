(function() {
  var browser, zombie;
  zombie = require("zombie");
  require("expectThat.mocha");
  browser = new zombie.Browser();
  describe("When populating two text boxes", function() {
    return expectThat("they should have values of foo and bar", function(done) {
      return browser.visit("http://127.0.0.1/~dmohl/mocha-zombie/specs.html", function() {
        var input1, input2;
        browser.fill(".search", "foo").fill("#test", "bar");
        input1 = browser.querySelector(".search");
        input2 = browser.querySelector("#test");
        input1.value.should(equal("foo"));
        input2.value.should(equal("bar"));
        return done();
      });
    });
  });
}).call(this);
