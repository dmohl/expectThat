((expectThatApi) ->
    expectThatApi.api =
        be: (expected) -> expected
        to: (expected) -> expected
        equal: (expected) -> expected
        throwException: (expected) -> "assertionType": "throw", "expected": expected
        extendApi: (fn, assertProvder, desc) ->
            expectThatApi.init assertProvder if not Object.prototype.should
            if typeof desc is "function" and typeof fn isnt "function"
                fn = desc
                description = fn.toString().match(/^[^\{]*\{((.*\s*)*)\}/m)[1]
                description = description.replace(/(\^\s+|\s)+$/g,"") # remove all surrounding white space.
                       .replace(/\);/g, "") # remove the ");".
                       .replace(/[(\^(?)]/g, " ") # remove the "." and parenthesis.
                       .replace(/.should/g, " should") # remove the ".".
                       .replace(/return/g, " ") # remove the "return" keyword.
                       .replace(/shouldnt/g, "shouldn't") # replace shouldnt with shouldn't.
                       .replace(/void 0/g, "null") # replace "void 0" with the word "null"
                       .replace(/!= null/g, "") # replace "!= null" with blank
                       .replace(/typeof null !== "undefined" && null !== null/g, "undefined") # replace with the word "undefined".
            else
                description = desc
            [fn, description]

    expectThatApi.util.extend expectThatApi, expectThatApi.api
) expectThatApi or= {}