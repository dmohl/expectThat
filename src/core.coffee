expectThat = ((expectThat) ->
    init: (assertProvider) ->
        _this = @
        Object.prototype.should = (expected) ->
            _this.evaluateAssertion assertProvider, true, @, expected
        Object.prototype.shouldnt = (expected) ->
            _this.evaluateAssertion assertProvider, false, @, expected
        @
    evaluateAssertion: (assertProvider, isShould, actual, expectedValueProvider) ->
        expected = expectedValueProvider
        customAssertion = expectedValueProvider
        if typeof expectedValueProvider is "function" then customAssertion = expectedValueProvider()
        if typeof customAssertion isnt "undefined" and customAssertion isnt null
            assertionType = customAssertion.assertionType
            expected = customAssertion.expected if typeof customAssertion.expected isnt "undefined"

        # TODO: Need to clean this up
        if typeof assertionType isnt "undefined"
            if assertionType is "throw"
                if typeof customAssertion.expected isnt "undefined"
                    assertProvider.assert(actual).throwsException expected
                else
                    assertProvider.assert(actual).throwsException()
            else
                # TODO: Add a nice error message if expectedVal is null/undefined or not a function
                assertionToEvaluate = assertProvider.assert(customAssertion.expr actual, expected)
                if isShould
                    if assertionToEvaluate isnt null then assertionToEvaluate.isTrue()
                else
                    if assertionToEvaluate isnt null then assertionToEvaluate.isFalse()
        else if isShould
            assertProvider.assert(actual).isEqualTo expected
        else if not isShould
            assertProvider.assert(actual).isNotEqualTo expected
) expectThat or= {}
