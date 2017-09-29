The main ExpectThat page can be found at http://dmohl.github.com/expectThat/.

ExpectThat
=======

**ExpectThat** is a CoffeeScript library that helps you write expressive, self-documenting unit tests.
ExpectThat currently supports Mocha, Pavlov, QUnit, and Jasmine.

The goals of ExpectThat are:

* to make the unit test code speak for itself (no need to write the same thing in a comment or test name).
* to provide human readable unit test assertions.
* to leverage existing test frameworks, while at the same time adapting them to CoffeScript in new ways.

Syntax
=======

With ExpectThat, you can write unit tests like this:

One object equals or does not equal another:

    expectThat -> 1.should equal 1

    expectThat -> 1.shouldnt equal 2

An object is true or false

    expectThat -> ("b"+"ar" is "bar").should be true

    expectThat -> ("foo" is "baz").shouldnt be true

    expectThat -> ("b"+"az" is "bar").should be false

    expectThat -> ("b" + "az" is "baz").shouldnt be false

    expectThat -> (null is null).should be true

    expectThat -> ("" is null).should be false

    expectThat -> (undefined is undefined).should be true

    expectThat -> ("" is undefined).should be false

A number is or is not greater than or less than another

    expectThat -> 10.1.should be greaterThan 10

    expectThat -> 9.shouldnt be greaterThan 10

    expectThat -> 10.1.should be lessThan 10.2

    expectThat -> 10.1.shouldnt be lessThan 10

A number is or is not greater than or equal to or less than or equal to another

    expectThat -> 10.should be greaterThanOrEqual to 10

    expectThat -> 9.9.shouldnt be greaterThanOrEqual to 10

    expectThat -> (10.0).should be lessThanOrEqual to 10

    expectThat -> 10.1.shouldnt be lessThanOrEqual to 10

An object is strictly equal (i.e. is or ===) to another

    testFn = ->
    testFn2 = ->

    expectThat -> testFn.should be strictlyEqual to testFn

    expectThat -> testFn.shouldnt be strictlyEqual to testFn2

A function throws an exception

    expectThat -> (-> throw "test exception").should throwException

A function throws an exception with a specific exception message (Note: The exception message must match exactly.)

    expectThat -> (-> throw "test exception").should throwException "test exception"

Most assertions can be created using the `be` and/or `to` keywords:

    expectThat -> 1.shouldnt be equal to 2

    expectThat -> ("b"+"ar" is "bar").should be true

    expectThat -> ("b" + "az" is "baz").shouldnt be false

While most of the time it is desirable to allow the code to dictate the test name, there may be times when you wish to
have more control. Because of this, version 0.2.1.0+ provides a way to explicitly state the test name. Here's an example:

    expectThat "Some Test Name", -> foo.should equal "bar"

How To Get It
=======

For Node.js + Jasmine-Node use NPM

    npm install expectThat.jasmine-node

Once installed, the following command can be run

    expectThat.jasmine-node '<relative path to spec files>'

or see the jasmine-node example in the expectThat solution and test it out by running the following command

    node runspecs.js

For Node.js + Mocha use NPM

    npm install expectThat.mocha

Once installed, add require('expectThat.mocha'); to the top of the spec files and run mocha as you normally would. i.e.

    mocha '<spec file>' --reporter spec

For Visual Studio use NuGet

    install-package expectThat.Pavlov

    install-package expectThat.QUnit

    install-package expectThat.Jasmine

    install-package expectThat.Mocha

Examples
=======

The following are examples of ExpectThat in use with Pavlov.js (https://github.com/mmonteleone/pavlov),
QUnit (https://github.com/jquery/qunit), and Jasmine (https://github.com/pivotal/jasmine/) as well as Mocha (http://mochajs.org/) respectively.
Note: More extensive examples can be found in the example folder ( https://github.com/dmohl/expectThat/tree/master/example ).

**Pavlov:**

    pavlov.specify "expectThat Specifications", ->
        describe "When testing should equal", ->
            foo = undefined
            before ->
                foo = "bar"
            after ->
                foo = "baz"
            expectThat -> foo.should equal "bar"
            expectThat -> foo.shouldnt equal "baz"
            expectThat -> (foo + "test").shouldnt equal "bartest2"
            expectThat -> foo.should be equal to "bar"
            expectThat -> foo.shouldnt be equal to "bah"

**QUnit:**

    module "When testing should equal"

    foo = "bar"

    expectThat -> foo.should equal "bar"
    expectThat -> foo.shouldnt equal "baz"
    expectThat -> (foo + "test").shouldnt equal "bartest2"
    expectThat -> foo.should be equal to "bar"
    expectThat -> foo.shouldnt be equal to "bah"

**Jasmine and Mocha (BDD):**

    describe "Example Specifications", ->
        foo = "bar"
        describe "When testing should equal", ->
            expectThat -> foo.should equal "bar"
        describe "When testing shouldnt equal", ->
            expectThat -> foo.shouldnt equal "baz"
        describe "When testing for true", ->
            expectThat -> (foo is "bar").should be true
            expectThat -> (foo is "baz").shouldnt be true
        describe "When testing for false", ->
            expectThat -> (foo is "baz").should be false
            expectThat -> (foo is "bar").shouldnt be false

ExpectThat also supports custom matchers. Any matcher that evaluates to true/false can be created. Here's an example of
a custom matcher for Pavlov. Examples for QUnit and Jasmine are available in the example folder of this project - https://github.com/dmohl/expectThat/tree/master/example ):

    ((expectThat) ->
        myCustomMatchers =
            atleastTwoGreaterThan: (expected) ->
                "assertionType": "atleastTwoGreaterThan"
                "expected": expected
                "expr": (actual, expected) -> actual >= expected + 2

        expectThat.util.extend pavlov.api, myCustomMatchers
    ) expectThat

Using ExpectThat with JavaScript
=======

While the syntax of ExpectThat is especially well suited and specifically designed for CoffeeScript, it can also be used
in JavaScript. Here's a Pavlov example:

    pavlov.specify("expectThat Specifications", function() {
        describe("When testing should equal", function() {
            var foo = "bar";
            expectThat(function() {
                foo.should(equal("bar"));
            });
            expectThat(function() {
                (foo + "test").should(equal("bartest"));
            });
        });
    });

Known Issues and/or Comments
=======

* QUnit places all of its associated functions in the global namespace. To allow seamless integration, ExpectThat for QUnit
follows this approach as well. Because of this, the QUnit "equal" function is overwritten with the ExpectThis "equal" function.
If for whatever reason you require access to the QUnit "equal" function, it can be access via qunitEqual. ExpectThat for
QUnit also adds "expectThat", "be", "to", "throwException", "greaterThan", "greaterThanOrEqual", "lessThan",
"lessThanOrEqual", "strictlyEqual", "qunitNotEqual", "qunitRaises", "qunitOk", and any custom matchers that you implement,
to the global namespace, though these do not currently cause direct conflicts with QUnit.

* The Jasmine and Mocha implementations also pollute the global namespace by adding everything mentioned above for QUnit (except the
QUnit specific functions). It is expected that a future version of ExpectThat will eliminate this pollution.

Getting Involved
=======

GitHub makes collaboration very easy. To get involved with ExpectThat, simply follow the directions provided by GitHub to
fork this repository, then implement lots of cool stuff, and finally send a pull request.

There are a couple of things that you will need in order to hack on ExpectThat:

* To compile, build, and validate this project use Anvil ( https://github.com/arobson/anvil.js ). The Anvil GitHub site
includes all that you need to quickly get it up and running.

* Tests are run with the test framework that the specific version of ExpectThat is targeting. Since the tests are written
with the same library that is under test, I like to run a suite of failing tests in addition to the passing test suites
and example test suites. This helps ensure that false positive related bugs do not sneak in.

The HTML files currently used to run the in-browser test suites are below:

Pavlov:

* https://github.com/dmohl/expectThat/blob/master/spec/pavlov.failing.specs.html

* https://github.com/dmohl/expectThat/blob/master/spec/pavlov.specs.html

* https://github.com/dmohl/expectThat/blob/master/example/pavlov/example.specs.html

QUnit:

* https://github.com/dmohl/expectThat/blob/master/spec/qunit.failing.specs.html

* https://github.com/dmohl/expectThat/blob/master/spec/qunit.specs.html

* https://github.com/dmohl/expectThat/blob/master/example/QUnit/example.specs.html

Jasmine:

* https://github.com/dmohl/expectThat/blob/master/spec/jasmine.failing.specs.html

* https://github.com/dmohl/expectThat/blob/master/spec/jasmine.specs.html

* https://github.com/dmohl/expectThat/blob/master/example/Jasmine/example.specs.html

Mocha:

* https://github.com/dmohl/expectThat/blob/master/spec/mocha.failing.specs.html

* https://github.com/dmohl/expectThat/blob/master/spec/mocha.specs.html

* https://github.com/dmohl/expectThat/blob/master/example/mocha-browser/example.specs.html

Release Notes
=======

* 0.2.2.2 - Made a few changes to support Node.js, Jasmine-Node, and Mocha. Added an NPM package and example for Jasmine-node and Mocha (browser and Node).
* 0.2.1.0 - Added functionality to allow an optional, explicit test name to be provided.
* 0.2.0.2 - Added several new assertions and support for QUnit and Jasmine.
* 0.1.0.0 - Initial version with support for Pavlov.

Roadmap
=======

* Fix the failing tests in the Zombie.js example
* Add support for Vows
* Add support for Screw.Unit
* Add example with Sinon.js
* Fix global namespace pollution in the Jasmine implementation.
