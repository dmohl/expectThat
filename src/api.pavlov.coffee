# Pavlov implementation

((expectThat, pavlov) ->
    expectThat.api.pavlov =
        expectThat: (fn) ->
            testDescription = @.extendApi fn, pavlov.api
            pavlov.api.it testDescription, fn

    expectThat.util.extend expectThat, expectThat.api.pavlov
    expectThat.util.extend pavlov.api, expectThat
) expectThat or= {}, window.pavlov