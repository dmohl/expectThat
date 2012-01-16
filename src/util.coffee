((expectThatApi) ->
    expectThatApi.util =

        extend: (destination, source) ->
            destination[name] = source[name] for name of source when source.hasOwnProperty(name) and destination
            destination
    @
) expectThatApi or= {}
