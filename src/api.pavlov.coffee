# Pavlov implementation

((expectThatApi, pavlov) ->
    expectThatApi.api.pavlov =
        expectThat: (fn) ->
            testDescription = @.extendApi fn, pavlov.api
            pavlov.api.it testDescription, fn

    expectThatApi.util.extend expectThatApi, expectThatApi.api.pavlov
    expectThatApi.util.extend pavlov.api, expectThatApi
) expectThatApi or= {}, window.pavlov