# QUnit implementation

((expectThatApi, qunit, exports) ->
    expectThatApi.api.qunit = {}
    expectThatApi.assertionProvider = {}

    # We need to creater an adapter for QUnit that matches the expectThat assertion provider expectations
    expectThatApi.assertionProvider =
        assert: (@actual) -> @
        isEqualTo: (expected) ->
            `qunit.qunitOk(this.actual == expected, "The expected value was: '" + expected + "' and the actual value was: '" + this.actual + "'.")`
        isNotEqualTo: (expected) ->
            `qunit.qunitOk(this.actual != expected, "The expected value was: '" + expected + "' and the actual value was: '" + this.actual + "'.")`
        isTrue: -> qunit.qunitOk @actual, "The expected value was: '{expected}' and the actual value was: '#{@actual}'."
        isFalse: -> qunit.qunitOk not @actual, "The expected value was: '{expected}' and the actual value was: '#{@actual}'."
        throwsException: (message) ->
            try
                @actual()
                qunit.qunitOk false, "The function did not throw an exception"
            catch ex
                if typeof message isnt "undefined" and message isnt null
                    qunit.qunitOk ex is message,
                        """The function threw an exception, however, the error message did not match the provided
                           expected error message. The expected error message was '#{message}' and the actual error message was
                           '#{ex}'."""
                else
                    qunit.qunitOk true, "The actual error message was '#{ex}'."

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