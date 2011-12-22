expectThat = ((expectThat) ->
    init: (assertProvider) ->
        Object.prototype.should = (expected) ->
            if expected is null or typeof expected is "undefined" then expected = !!expected
            expectedVal = expected
            if typeof expected is "function" then expectedVal = expected()
            assertionType = expectedVal.assertionType
            expectedExceptionMessage = expectedVal.expected
            if typeof assertionType isnt "undefined"
                if typeof expectedVal isnt "undefined"
                    assertProvider.assert(this).throwsException expectedExceptionMessage
                else
                    assertProvider.assert(this).throwsException
            else
                assertProvider.assert(this).isEqualTo expected
        Object.prototype.shouldnt = (expected) ->
            assertProvider.assert(this).isNotEqualTo expected
        @
) expectThat or= {}

###import "api.coffee" ###
###import "api.pavlov.coffee" ###
