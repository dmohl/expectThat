ExpectThat
=======

**ExpectThat** is CoffeeScript library that helps you write expressive, self-documenting unit tests.
ExpectThat currently supports Pavlov.js.

The goals of ExpectThat are:

* to make the code of CoffeeScript unit tests speak for itself (no need to write the same thing in a comment or unit test name).
* to provide human readable unit test assertions.
* to leverage existing test frameworks, while at the same time adapting them to CoffeScript in new ways.

**Syntax**

With ExpectThat, you can write unit tests like this:

One object equals or does not equal another:

    expectThat -> 1.should equal 1

    expectThat -> 1.shouldnt equal 1

A number of assertions can be created using the `be` and/or `to` keywords:

    expectThat -> 1.should be equal to 1

    expectThat -> 1.shouldnt be equal to 1

    expectThat -> ("b"+"ar" is "bar").should be true

    expectThat -> ("foo" is "baz").shouldnt be true

    expectThat -> ("b"+"az" is "bar").should be false

    expectThat -> ("b" + "az" is "baz").shouldnt be false

**Examples**

The following is example of ExpectThat with Pavlov.js ( https://github.com/mmonteleone/pavlov ):

Pavlov:

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

**Roadmap**

* Add a number of additional assertions.
* Add support for additional test frameworks.