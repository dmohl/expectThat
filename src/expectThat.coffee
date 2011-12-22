expectThat = ((expectThat) ->
    #executeAssertion: (
    init: (assertProvider) ->
        _this = @
        Object.prototype.should = (expected) ->
            _this.evaluateAssertion assertProvider, true, @, expected
        Object.prototype.shouldnt = (expected) ->
            _this.evaluateAssertion assertProvider, false, @, expected
        @
    evaluateAssertion: (assertProvider, isShould, actual, expected) ->
        expectedVal = expected
        if typeof expected is "function" then expectedVal = expected()
        if typeof expectedVal isnt "undefined" and expectedVal isnt null
            assertionType = expectedVal.assertionType
            expectedValue = expectedVal.expected

        # TODO: This is a mess. Replace with an array that can be extended?
        if typeof assertionType isnt "undefined"
            assertionToEvaluate = null
            switch assertionType
                when "throw"
                    if typeof expectedVal isnt "undefined"
                        assertProvider.assert(actual).throwsException expectedValue
                    else
                        assertProvider.assert(actual).throwsException()
                when "greaterThan"
                    assertionToEvaluate = assertProvider.assert(actual > expectedValue)
                when "lessThan"
                    assertionToEvaluate = assertProvider.assert(actual < expectedValue)
            if isShould
                if assertionToEvaluate isnt null then assertionToEvaluate.isTrue()
            else
                if assertionToEvaluate isnt null then assertionToEvaluate.isFalse()
        else if isShould
            assertProvider.assert(actual).isEqualTo expected
        else if not isShould
            assertProvider.assert(actual).isNotEqualTo expected
) expectThat or= {}

###import "api.coffee" ###
###import "api.pavlov.coffee" ###
