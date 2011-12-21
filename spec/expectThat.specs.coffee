pavlov.specify "expectThat Specifications", ->
    describe "When testing should equal", ->
        foo = undefined
        before ->
            foo = "bar"
        after ->
            foo = "baz"
        expectThat -> foo.should equal "bar"
        expectThat -> (foo + "test").should equal "bartest"
        expectThat -> 1.should equal 1
    describe "When testing shouldnt equal", ->
        foo = undefined
        before ->
            foo = "bar"
        after ->
            foo = "baz"
        expectThat -> foo.shouldnt equal "baz"
        expectThat -> (foo + "test").shouldnt equal "bartest2"
        expectThat -> 1.shouldnt equal 2
    describe "When testing to and be", ->
        foo = undefined
        before ->
            foo = "bar"
        after ->
            foo = "baz"
        expectThat -> foo.should be equal to "bar"
        expectThat -> foo.shouldnt be equal to "bah"
        expectThat -> (foo + "test").should be equal to "bartest"
        expectThat -> (foo + "test").shouldnt be equal to "bartest2"