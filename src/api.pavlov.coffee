((expectThat, pavlov) ->
    # pavlov implementation

    expectThat.api.pavlov =
        expectThat: (fn) ->
            testDescription = @.extendApi fn, pavlov.api
            pavlov.api.it testDescription, fn

    pavlov.util.extend expectThat, expectThat.api
    pavlov.util.extend expectThat, expectThat.api.pavlov
    pavlov.util.extend pavlov.api, expectThat
) expectThat or= {}, window.pavlov 