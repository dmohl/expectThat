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
            expectThat -> (testNull?).should be null
            expectThat -> (null?).should be null
            expectThat -> (undefined?).shouldnt be null
            expectThat -> (undefined?).should be undefined
            expectThat -> (testUndefined?).should be undefined
            expectThat -> (null?).shouldnt be undefined
            expectThat -> (""?).shouldnt be null
            expectThat -> (""?).shouldnt be undefined
            expectThat -> (foo?).shouldnt be undefined
            expectThat -> (foo?).shouldnt be null
            expectThat -> (undefined?).shouldnt be (not undefined)
            expectThat -> (null?).shouldnt be (not null)
            expectThat -> (foo?).should be (not undefined)
            expectThat -> (foo?).should be (not null)
        describe "When testing for throw", ->
            expectThat -> (-> throw "test exception").should throwException
            expectThat -> (-> throw "test exception").should throwException "test exception"