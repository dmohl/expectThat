pavlov.specify "expectThat Specifications", ->
    describe "", ->
        foo = undefined
        before ->
            foo = "bar"
        after ->
            foo = "baz"
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
