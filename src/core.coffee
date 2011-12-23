expectThat = ((expectThat) ->
    init: (assertProvider) ->
        _this = @
        Object.prototype.should = (expected) ->
            _this.evaluateAssertion assertProvider, true, @, expected
        Object.prototype.shouldnt = (expected) ->
            _this.evaluateAssertion assertProvider, false, @, expected
        @

    executeThrowAssertion: (assertionToEvaluate, expected, customAssertion) ->
        if typeof customAssertion.expected isnt "undefined"
            assertionToEvaluate.throwsException expected
        else
            assertionToEvaluate.throwsException()

    executeEqualToAssertion: (isShould, assertionToEvaluate, expected) ->
        if isShould
            assertionToEvaluate.isEqualTo expected
        else 
            assertionToEvaluate.isNotEqualTo expected

    executeBooleanAssertion: (isShould, actual, expected, customAssertion, assertProvider) ->
        if typeof customAssertion.expr isnt "function"
            throw """The provided custom assertion expression for #{customAssertion.assertionType} is invalid.
                     Custom assertion expressions should be defined as:
                     (actual, expected) -> <some function using actual and expression>."""
        assertionToEvaluate = assertProvider.assert(customAssertion.expr actual, expected) 
        if isShould
            assertionToEvaluate.isTrue()
        else
            assertionToEvaluate.isFalse()

    executeAssertion: (assertionToEvaluate, isShould, assertionType, actual, expected, customAssertion, assertProvider) ->
        if assertionToEvaluate is null or typeof assertionToEvaluate is "undefined" then return

        if typeof assertionType isnt "undefined"
            if assertionType is "throw"
                @.executeThrowAssertion assertionToEvaluate, expected, customAssertion
            else
                @.executeBooleanAssertion isShould, actual, expected, customAssertion, assertProvider
        else
            @.executeEqualToAssertion isShould, assertionToEvaluate, expected

    evaluateAssertion: (assertProvider, isShould, actual, expectedValueProvider) ->
        expected = expectedValueProvider
        customAssertion = expectedValueProvider
        if typeof expectedValueProvider is "function" then customAssertion = expectedValueProvider()
        if typeof customAssertion isnt "undefined" and customAssertion isnt null
            assertionType = customAssertion.assertionType
            expected = customAssertion.expected if typeof customAssertion.expected isnt "undefined"
        assertionToEvaluate = assertProvider.assert(actual)
        @.executeAssertion assertionToEvaluate, isShould, assertionType, actual, expected, customAssertion, assertProvider

) expectThat or= {}
