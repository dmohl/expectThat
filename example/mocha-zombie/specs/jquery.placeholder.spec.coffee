zombie = require("zombie")
require("expectThat.mocha")

browser = new zombie.Browser()

# Ported from Josh Bush's example at http://digitalbush.com/2011/03/29/testing-jquery-plugins-with-node-js-and-jasmine/
describe "Given a jquery.placholder with", ->
  input = ""
  describe "no value", ->
    describe "when calling placeholder plugin", ->
      expectThat "should have an input value of 'Start Typing'", (done) ->
        browser.visit "http://127.0.0.1/~dmohl/mocha-zombie/specs.html"
        browser.wait ->
          input = browser.querySelector ".search"
          input.value.should equal "Start Typing"
          done()

    ### TODO: Identify why this is failing
    describe "when focusing input without user value",  ->
      expectThat "should have an input value of ''", (done) ->
        browser.visit "http://127.0.0.1/~dmohl/mocha-zombie/specs.html"
        browser.wait ->
          browser.evaluate "document.getElementById('search').focus()"
          input = browser.querySelector ".search"
          input.value.should equal ""
          done()
    ###
    describe "when leaving input without user value", ->
      expectThat "should have an input value of 'Start Typing'", (done) ->
        browser.visit "http://127.0.0.1/~dmohl/mocha-zombie/specs.html"
        browser.wait ->
          browser.evaluate "document.getElementById('test').focus()"
          input = browser.querySelector ".search"
          input.value.should equal "Start Typing"
          done()

  describe "a user supplied value", ->

    describe "when calling placeholder plugin", ->
      expectThat "should have an input value of 'bacon'",  (done) ->
        browser.visit "http://127.0.0.1/~dmohl/mocha-zombie/specs.html"
        browser.wait ->
          browser.fill ".search", "bacon"
          input = browser.querySelector ".search"
          input.value.should equal "bacon"
          done()

    describe "when focusing input with user value", ->
      expectThat "should have an input value of 'bacon'", (done) ->
        browser.visit "http://127.0.0.1/~dmohl/mocha-zombie/specs.html"
        browser.wait ->
          browser.fill ".search", "bacon"
          browser.evaluate "document.getElementById('search').focus()"
          input = browser.querySelector ".search"
          input.value.should equal "bacon"
          done()

    describe "when leaving input without user value", ->
      expectThat "should have an input value of 'bacon'", (done) ->
        browser.visit "http://127.0.0.1/~dmohl/mocha-zombie/specs.html"
        browser.wait ->
          browser.fill ".search", "bacon"
          browser.evaluate "document.getElementById('test').focus()"
          input = browser.querySelector ".search"
          input.value.should equal "bacon"
          done()
