# Mocha implementation

((expectThatApi, exports) ->
    expectThatApi.api.Mocha = {}
    expectThatApi.assertionProvider = {}

    # We need to create an adapter for Mocha that matches the expectThat assertion provider expectations
    expectThatApi.assertionProvider =
        assert: (@actual) -> @
        assertThat: (expr, msg) ->
            if not expr
                throw new Error(msg || 'failed')
        isEqualTo: (expected) ->
            `this.assertThat(this.actual == expected, "The expected value was: '" + expected + "' and the actual value was: '" + this.actual + "'.")`
        isNotEqualTo: (expected) ->
            `this.assertThat(this.actual != expected, "The expected value was: '" + expected + "' and the actual value was: '" + this.actual + "'.")`
        isTrue: -> @.assertThat @actual, "The expected value was: '{expected}' and the actual value was: '#{@actual}'."
        isFalse: -> @.assertThat not @actual, "The expected value was: '{expected}' and the actual value was: '#{@actual}'."
        throwsException: (message) ->
            try
                @actual()
                @.assertThat false, "The function did not throw an exception"
            catch ex
                if typeof message isnt "undefined" and message isnt null
                    @.assertThat ex is message,
                        """The function threw an exception, however, the error message did not match the provided
                           expected error message. The expected error message was '#{message}' and the actual error message was
                           '#{ex}'."""
                else
                    @.assertThat true, "The actual error message was '#{ex}'."

    expectThatApi.util.extend expectThatApi.api.mocha, expectThatApi.assertionProvider

    expectThatApi.api.mocha =
        expectThat: (desc, fn) ->
            # We could have used destructing assignment here, but jsHint doesn't like it.
            result = expectThatApi.api.extendApi fn, expectThatApi.assertionProvider, desc
            newFn = result[0]
            testDescription = result[1]
            it testDescription, newFn

    expectThatApi.util.extend expectThatApi, expectThatApi.api.mocha
    # TODO: Need to find a way to eliminate all of this global state pollution
    exports.equal = expectThatApi.api.equal
    exports.be = expectThatApi.api.be
    exports.to = expectThatApi.api.to
    exports.throwException = expectThatApi.api.throwException
    exports.expectThat = expectThatApi.expectThat
    exports.expectThatApi = expectThatApi
    expectThatApi.util.extend exports, expectThatApi.api.extendedMatchers
    @
) expectThatApi or= {}, root