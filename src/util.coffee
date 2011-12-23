((expectThatApi) ->
    expectThatApi.util =
        extend: (destintation, source) ->
            destintation[name] = source[name] for name of source when source.hasOwnProperty name
            destintation
    @
) expectThatApi or= {}
