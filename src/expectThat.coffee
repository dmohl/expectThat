expectThat = ((expectThat) ->
    #executeAssertion: (
    init: (assertProvider) ->
        Object.prototype.should = (expected) ->
            actual = @
            expectedVal = expected
            if typeof expected is "function" then expectedVal = expected()
            if typeof expectedVal isnt "undefined" and expectedVal isnt null
                assertionType = expectedVal.assertionType
                expectedExceptionMessage = expectedVal.expected
            if typeof assertionType isnt "undefined"
                if typeof expectedVal isnt "undefined"
                    assertProvider.assert(actual).throwsException expectedExceptionMessage
                else
                    assertProvider.assert(actual).throwsException
            else
                assertProvider.assert(actual).isEqualTo expected
        Object.prototype.shouldnt = (expected) ->
            actual = @
            assertProvider.assert(actual).isNotEqualTo expected
        @
) expectThat or= {}

###import "api.coffee" ###
###import "api.pavlov.coffee" ###
