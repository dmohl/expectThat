# QUnit implementation

((expectThatApi, qunit, exports) ->
    expectThatApi.api.qunit = {}
    expectThatApi.assertionProvider = {}

    # We need to creater an adapter for QUnit that matches the expectThat assertion provider expectations
    expectThatApi.assertionProvider =
        assert: (@actual) -> @
        isEqualTo: (expected) ->
            `qunit.qunitOk(this.actual == expected, "The expected value was: " + expected + " and the actual value was: " + this.actual)`
        isNotEqualTo: (expected) ->
            `qunit.qunitOk(this.actual != expected, "The expected value was: " + expected + " and the actual value was: " + this.actual)`
        isTrue: -> qunit.qunitOk @actual, "The expected value was: {expected} and the actual value was: #{@actual}"
        isFalse: -> qunit.qunitOk(not @actual, "The expected value was: {expected} and the actual value was: #{@actual}")
        throwException: (message) ->
            if typeof message isnt "undefined" and message isnt null
                qunit.qunitRaises @actual, message, "test"
            else
                qunit.qunitRaises @actual

    expectThatApi.util.extend expectThatApi.api.qunit, expectThatApi.assertionProvider

    expectThatApi.api.qunit =
        expectThat: (fn) ->
            testDescription = expectThatApi.api.extendApi fn, expectThatApi.assertionProvider
            qunit.test testDescription, fn

    expectThatApi.util.extend expectThatApi, expectThatApi.api.qunit

    #QUnit puts everything in global state, so we need to do some manipulation to make everything work
    exports.expectThat = expectThatApi.expectThat
    exports.qunitEqual = qunit.equal
    exports.qunitNotEqual = qunit.notEqual
    exports.qunitOk = qunit.ok
    exports.qunitRaises = qunit.raises
    qunit.be = expectThatApi.api.be
    qunit.to = expectThatApi.api.to
    qunit.throwException = expectThatApi.api.throwException
    expectThatApi.util.extend qunit, expectThatApi.api.extendedMatchers
        
    exports.equal = expectThatApi.api.equal
    exports.expectThat
) expectThatApi or= {}, window, window