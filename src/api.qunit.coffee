# QUnit implementation

((expectThat, qunit, exports) ->
    expectThat.api.qunit =
        assertProvider: (@actual) -> 
        isEqualTo: (expected) -> qunit.equal @actual, expected
        isNotEqualTo: (expected) -> qunit.notEqual @actual, expected
        isTrue: -> qunit.ok(@actual)
        isFalse: -> qunit.ok(not @actual)
        throwException: (message) ->
            if typeof message isnt "undefined" and message isnt null
                qunit.raises @actual, message
            else
                qunit.raises @actual
        expectThat: (fn) ->
            testDescription = @.extendApi fn, assertProvider
            qunit.testpavlov.api.it testDescription, fn

    expectThat.util.extend expectThat, expectThat.api.qunit
    exports.expectThat = expectThat
) expectThat or= {}, window, window