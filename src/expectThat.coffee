expectThat = ((expectThat) ->
    init: (assertProvider) ->
        Object.prototype.should = (expected) ->
            if expected is null or typeof expected is "undefined" then expected = !!expected
            assertProvider.assert(this).isEqualTo expected
        Object.prototype.shouldnt = (expected) ->
            assertProvider.assert(this).isNotEqualTo expected
        @
) expectThat or= {}

###import "api.coffee" ###
###import "api.pavlov.coffee" ###
