((expectThat) ->
    expectThat.api =
        be: (expected) -> expected
        to: (expected) -> expected
        equal: (expected) -> expected
        extendApi: (fn, assertProvder) ->
            @.init assertProvder if not Object.prototype.should
            description = fn.toString().match(/^[^\{]*\{((.*\s*)*)\}/m)[1]
            description.replace(/(\^\s+|\s)+$/g,"").replace(/[(\^.(?)]/g, " ")
                       .replace(/return/g, " ").replace(/shouldnt/g, "shouldn't")
    @
) expectThat or= {}