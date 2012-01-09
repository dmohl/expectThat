# Pavlov implementation

((expectThatApi, pavlov) ->
    expectThatApi.api.pavlov =
        expectThat: (desc, fn) ->
            # We could have used destructing assignment here, but jsHint doesn't like it.
            result = @.extendApi fn, pavlov.api, desc
            newFn = result[0]
            testDescription = result[1]
            pavlov.api.it testDescription, newFn

    expectThatApi.util.extend expectThatApi, expectThatApi.api.pavlov
    expectThatApi.util.extend pavlov.api, expectThatApi
) expectThatApi or= {}, root.pavlov