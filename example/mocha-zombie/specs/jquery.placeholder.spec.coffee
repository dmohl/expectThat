zombie = require("zombie")
require("expectThat.mocha")

browser = new zombie.Browser()

# Ported from Josh Bush's example at http://digitalbush.com/2011/03/29/testing-jquery-plugins-with-node-js-and-jasmine/
describe "Given a jquery.placholder with", ->
  input = ""
  describe "no value", ->

    describe "when calling placeholder plugin", ->
      expectThat "should have an input value of 'Start Typing'", ->
        browser.visit "http://127.0.0.1/~dmohl/mocha-zombie/specs.html", {debug: false}, (e, brwser, status) ->
          input = brwser.querySelector ".search"
          input.value.should equal "Start Typing"

    describe "when focusing input without user value", ->
      expectThat "should have an input value of ''", ->
        browser.visit "http://127.0.0.1/~dmohl/mocha-zombie/specs.html", {debug: false}, (e, brwser, status) ->
          brwser.evaluate "document.getElementById('search').focus()"
          input = brwser.querySelector ".search"
          brwser.querySelector(".search").value.should equal ""

    describe "when leaving input without user value", ->
      expectThat "should have an input value of 'Start Typing'", ->
        browser.visit "http://127.0.0.1/~dmohl/mocha-zombie/specs.html", {debug: false}, (e, brwser, status) ->
          brwser.evaluate "document.getElementById('search').focus().blur()"
          input = brwser.querySelector ".search"
          input.value.should equal "Start Type"

  describe "a user supplied value", ->

    describe "when calling placeholder plugin", ->
      expectThat "should have an input value of 'bacon'", ->
        browser.visit "http://127.0.0.1/~dmohl/mocha-zombie/specs.html", {debug: false}, (e, brwser, status) ->
          input = brwser.querySelector ".search"
          input.value.should equal "bacon"

    describe "when focusing input with user value", ->
      expectThat "should have an input value of 'bacon'", ->
        browser.visit "http://127.0.0.1/~dmohl/mocha-zombie/specs.html", {debug: false}, (e, brwser, status) ->
          brwser.evaluate "document.getElementById('search').focus()"
          input = brwser.querySelector ".search"
          input.value.should equal "bacon"

    describe "when leaving input without user value", ->
      expectThat "should have an input value of 'bacon'", ->
        browser.visit "http://127.0.0.1/~dmohl/mocha-zombie/specs.html", {debug: false}, (e, brwser, status) ->
          brwser.evaluate "document.getElementById('search').focus().blur()"
          input = brwser.querySelector ".search"
          input.value.should equal "bacon"
