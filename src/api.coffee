((expectThat) ->
    expectThat.api =
        be: (expected) -> expected
        to: (expected) -> expected
        equal: (expected) -> expected
        throwException: (expected) -> "assertionType": "throw", "expected": expected
        greaterThan: (expected) -> "assertionType": "greaterThan", "expected": expected
        lessThan: (expected) -> "assertionType": "lessThan", "expected": expected
        extendApi: (fn, assertProvder) ->
            @.init assertProvder if not Object.prototype.should
            description = fn.toString().match(/^[^\{]*\{((.*\s*)*)\}/m)[1]
            description.replace(/(\^\s+|\s)+$/g,"") # remove all surrounding white space.
                       .replace(/[(\^(?)]/g, " ") # remove the "." and parenthesis.
                       .replace(/.should/g, " should") # remove the ".".
                       .replace(/return/g, " ") # remove the "return" keyword.
                       .replace(/shouldnt/g, "shouldn't") # replace shouldnt with shouldn't.
                       .replace(/void 0/g, "null") # replace "void 0" with the word "null"
                       .replace(/!= null/g, "") # replace "!= null" with blank
                       .replace(/typeof null !== "undefined" && null !== null/g, "undefined") # replace with the word "undefined".
    @
) expectThat or= {}