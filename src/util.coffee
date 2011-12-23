((expectThat) ->
    expectThat.util =
        extend: (destintation, source) ->
            destintation[name] = method for name, method of source
            destintation
    @
) expectThat or= {}
