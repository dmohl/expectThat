expectThat = ((expectThat) ->
    init: (assertProvider) ->
        Object.prototype.should = (expected) ->
            assertProvider.assert(this).isEqualTo expected
        Object.prototype.shouldnt = (expected) ->
            assertProvider.assert(this).isNotEqualTo expected
) expectThat or= {}

((expectThat) ->
    expectThat.api =
        be: (expected) -> expected
        to: (expected) -> expected
        equal: (expected) -> expected
        extendApi: (fn, assertProvder) ->
            @.init assertProvder if not Object.prototype.should
            description = fn.toString().match(/^[^\{]*\{((.*\s*)*)\}/m)[1]
            description.replace(/\^\s+|\s+$/g,"").replace(/[(\^(?\.)]/g, " ")
                       .replace(/return/g, " ").replace(/shouldnt/g, "shouldn't")
) expectThat or= {}

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