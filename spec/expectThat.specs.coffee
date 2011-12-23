pavlov.specify "expectThat Specifications", ->
    describe "", ->
        foo = undefined
        before ->
            foo = "bar"
        after ->
            foo = "baz"
        describe "When testing should equal", ->
            expectThat -> foo.should equal "bar"
            expectThat -> (foo + "test").should equal "bartest"
            expectThat -> 1.should equal 1
        describe "When testing shouldnt equal", ->
            expectThat -> foo.shouldnt equal "baz"
            expectThat -> (foo + "test").shouldnt equal "bartest2"
            expectThat -> 1.shouldnt equal 2
        describe "When testing to and be", ->
            expectThat -> foo.should be equal to "bar"
            expectThat -> foo.shouldnt be equal to "bah"
            expectThat -> (foo + "test").should be equal to "bartest"
            expectThat -> (foo + "test").shouldnt be equal to "bartest2"
        describe "When testing for true", ->
            expectThat -> true.should be true
            expectThat -> false.shouldnt be true
            expectThat -> (foo is "bar").should be true
            expectThat -> (foo is "baz").shouldnt be true
            expectThat -> ("b"+"ar" is "bar").should be true
            expectThat -> ("foo" is "baz").shouldnt be true
            expectThat -> ("b"+"ar" is "bar").shouldnt be (not true)
            expectThat -> ("foo" is "baz").should be (not true)
        describe "When testing for false", ->
            expectThat -> false.should be false
            expectThat -> true.shouldnt be false
            expectThat -> (foo is "baz").should be false
            expectThat -> (foo is "bar").shouldnt be false
            expectThat -> ("b"+"az" is "bar").should be false
            expectThat -> ("b" + "az" is "baz").shouldnt be false
            expectThat -> (foo is "bar").should be (not false)
            expectThat -> ("b"+"az" is "bar").shouldnt be (not false)
        describe "When testing for null or undefined", ->
            testNull = null
            testUndefined = undefined
            expectThat -> (testNull is null).should be true
            expectThat -> (testNull is null).shouldnt be false
            expectThat -> (testNull isnt null).should be false
            expectThat -> (testNull isnt null).shouldnt be true
            expectThat -> (testUndefined is undefined).should be true
            expectThat -> (testUndefined is undefined).shouldnt be false
            expectThat -> (testUndefined isnt undefined).should be false
            expectThat -> (testUndefined isnt undefined).shouldnt be true
            expectThat -> (null is null).should be true
            expectThat -> ("" is null).should be false
            expectThat -> (undefined is undefined).should be true
            expectThat -> ("" is undefined).should be false
        describe "When testing for throw", ->
            expectThat -> (-> throw "test exception").should throwException
            expectThat -> (-> throw "test exception").should throwException "test exception"
        describe "When testing for greater than", ->
            expectThat -> 10.should be greaterThan 9
            expectThat -> 10.1.should be greaterThan 10
            expectThat -> 9.shouldnt be greaterThan 10
            expectThat -> 10.shouldnt be greaterThan 10
        describe "When testing for less than", ->
            expectThat -> 10.should be lessThan 11
            expectThat -> 10.1.should be lessThan 10.2
            expectThat -> 10.1.shouldnt be lessThan 10
            expectThat -> 10.shouldnt be lessThan 10
        describe "When testing for greater than or equal to", ->
            expectThat -> 10.1.should be greaterThanOrEqual to 10.1
            expectThat -> 10.should be greaterThanOrEqual 10
            expectThat -> 10.should be greaterThanOrEqual to 9
            expectThat -> 9.9.shouldnt be greaterThanOrEqual to 10
            expectThat -> 9.shouldnt be greaterThanOrEqual to 10
        describe "When testing for less than or equal to", ->
            expectThat -> 11.0.should be lessThanOrEqual to 11
            expectThat -> (10.1).should be lessThanOrEqual to 10.2
            expectThat -> 10.0.should be lessThanOrEqual to 10
            expectThat -> 10.1.shouldnt be lessThanOrEqual to 10
            expectThat -> 11.shouldnt be lessThanOrEqual to 10
        describe "When testing strictly equal to", ->
            testFn = ->
            testFn2 = ->
            expectThat -> 1.shouldnt be strictlyEqual to 1
            expectThat -> testFn.should be strictlyEqual to testFn
            expectThat -> testFn.shouldnt be strictlyEqual to testFn2
            expectThat -> testFn2.should be strictlyEqual to testFn2
            expectThat -> "test".shouldnt be strictlyEqual to "test"

        # TODO:
        #    - Cleanup expectThat
        #    - Add direct support for QUnit
        #    - Verify and/or add support for Node
        #    - Add direct support for Jasmine
        #    - Add direct support for Mocha