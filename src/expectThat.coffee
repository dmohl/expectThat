###import "core.coffee" ###
###import "util.coffee" ###
###import "api.coffee" ###
###import "api.customMatchers.coffee" ###

((expectThat) ->
    expectThat.util.extend expectThat, expectThat.api
    expectThat.util.extend expectThat, expectThat.api.customMatchers
) expectThat or= {}

###import "api.pavlov.coffee" ###

