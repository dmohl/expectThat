((expectThat) ->
    expectThat.util =
        extend: (destintation, source) ->
            destintation[name] = source[name] for name of source when source.hasOwnProperty name
            destintation
    @
) expectThat or= {}
