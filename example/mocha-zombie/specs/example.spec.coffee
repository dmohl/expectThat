zombie = require("zombie")
require("expectThat.mocha")

browser = new zombie.Browser()

describe "When populating two text boxes", ->
  expectThat "they should have values of foo and bar", (done) ->
    browser.visit "http://127.0.0.1/~dmohl/mocha-zombie/specs.html", ->
      browser
        .fill(".search", "foo")
        .fill("#test", "bar")
      input1 = browser.querySelector ".search"
      input2 = browser.querySelector "#test"
      input1.value.should equal "foo"
      input2.value.should equal "bar"
      done()
