expectThat = ((expectThat) ->
    init: (assertProvider) ->
        Object.prototype.should = (expected) ->
            assertProvider.assert(this).isEqualTo expected
        Object.prototype.shouldnt = (expected) ->
            assertProvider.assert(this).isNotEqualTo expected
        @
) expectThat or= {}

###import "api.coffee" ###
###import "api.pavlov.coffee" ###
