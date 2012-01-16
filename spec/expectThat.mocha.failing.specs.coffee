describe "Mocha Specs", ->
    foo = "bar"
    describe "When testing should equal", ->
        expectThat -> foo.should equal "barz"
        expectThat -> (foo + "test").should equal "bartestz"
        expectThat -> 1.should equal 2
    describe "When testing shouldnt equal", ->
        expectThat -> foo.shouldnt equal "bar"
        expectThat -> (foo + "test").shouldnt equal "bartest"
        expectThat -> 1.shouldnt equal 1
    describe "When testing to and be", ->
        expectThat -> foo.should be equal to "barz"
        expectThat -> foo.shouldnt be equal to "bar"
        expectThat -> (foo + "test").should be equal to "bartestz"
        expectThat -> (foo + "test").shouldnt be equal to "bartest"
    describe "When testing for true", ->
        expectThat -> true.should be false
        expectThat -> false.shouldnt be false
        expectThat -> (foo is "bar").should be false
        expectThat -> (foo is "baz").shouldnt be false
        expectThat -> ("b"+"ar" is "bar").should be false
        expectThat -> ("foo" is "baz").shouldnt be false
        expectThat -> ("b"+"ar" is "bar").shouldnt be (not false)
        expectThat -> ("foo" is "baz").should be (not false)
    describe "When testing for false", ->
        expectThat -> false.should be true
        expectThat -> true.shouldnt be true
        expectThat -> (foo is "baz").should be true
        expectThat -> (foo is "bar").shouldnt be true
        expectThat -> ("b"+"az" is "bar").should be true
        expectThat -> ("b" + "az" is "baz").shouldnt be true
        expectThat -> (foo is "bar").should be (not true)
        expectThat -> ("b"+"az" is "bar").shouldnt be (not true)
    describe "When testing for null or undefined", ->
        testNull = null
        testUndefined = undefined
        expectThat -> (testNull is null).should be false
        expectThat -> (testNull is null).shouldnt be true
        expectThat -> (testNull isnt null).should be true
        expectThat -> (testNull isnt null).shouldnt be false
        expectThat -> (testUndefined is undefined).should be false
        expectThat -> (testUndefined is undefined).shouldnt be true
        expectThat -> (testUndefined isnt undefined).should be true
        expectThat -> (testUndefined isnt undefined).shouldnt be false
        expectThat -> (null is null).should be false
        expectThat -> ("" is null).should be true
        expectThat -> (undefined is undefined).should be false
        expectThat -> ("" is undefined).should be true
    describe "When testing for throw", ->
        expectThat -> (-> 1/1).should throwException
        expectThat -> (-> throw "test").should throwException "test exception"
    describe "When testing for greater than", ->
        expectThat -> 10.should be greaterThan 11
        expectThat -> (10.1).should be greaterThan 10.2
        expectThat -> 11.shouldnt be greaterThan 10
        expectThat -> 11.shouldnt be greaterThan 10
    describe "When testing for less than", ->
        expectThat -> 11.should be lessThan 11
        expectThat -> (10.3).should be lessThan 10.2
        expectThat -> 9.9.shouldnt be lessThan 10
        expectThat -> 9.shouldnt be lessThan 10
    describe "When testing for greater than or equal to", ->
        expectThat -> 10.should be greaterThanOrEqual to 10.1
        expectThat -> 10.should be greaterThanOrEqual 10.1
        expectThat -> 8.should be greaterThanOrEqual to 9
        expectThat -> 9.9.should be greaterThanOrEqual to 10
        expectThat -> 10.1.shouldnt be greaterThanOrEqual to 10
        expectThat -> 11.shouldnt be greaterThanOrEqual to 10
    describe "When testing for less than or equal to", ->
        expectThat -> 11.1.should be lessThanOrEqual to 11
        expectThat -> (10.3).should be lessThanOrEqual to 10.2
        expectThat -> 9.9.shouldnt be lessThanOrEqual to 10
        expectThat -> 10.shouldnt be lessThanOrEqual to 10
        expectThat -> 9.shouldnt be lessThanOrEqual to 10
    describe "When testing strictly equal to", ->
        testFn = ->
        testFn2 = ->
        expectThat -> 1.should be strictlyEqual to 1
        expectThat -> testFn.shouldnt be strictlyEqual to testFn
        expectThat -> testFn.should be strictlyEqual to testFn2
        expectThat -> testFn2.shouldnt be strictlyEqual to testFn2
    describe "When testing a provided explicit test name", ->
        expectThat "Some Test Name", -> foo.should equal "barz"
        expectThat "Some OtherTest Name", -> foo.shouldnt equal "bar"