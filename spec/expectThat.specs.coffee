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
