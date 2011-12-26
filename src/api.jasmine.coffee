# Jasmine implementation

((expectThatApi, exports) ->
    expectThatApi.api.jasmine = {}
    expectThatApi.assertionProvider = {}

    # We need to create an adapter for Jasmine that matches the expectThat assertion provider expectations
    expectThatApi.assertionProvider =
        assert: (@actual) -> @
        isEqualTo: (expected) ->
            if typeof expected is "boolean"
                `expect(this.actual == expected).toBeTruthy()`
            else
                expect(@actual).toEqual expected
        isNotEqualTo: (expected) ->
            if typeof expected is "boolean"
                `expect(this.actual == expected).toBeFalsy()`
            else
                expect(@actual).toNotEqual expected
        isTrue: -> expect(this.actual).toBeTruthy()
        isFalse: -> expect(this.actual).toBeFalsy()
        throwsException: (message) ->
            try
                @actual()
                expect(true).toBeFalsy()
            catch ex
                if typeof message isnt "undefined" and message isnt null and message isnt ex
                    expect(true).toBeFalsy()
                else
                    expect(true).toBeTruthy()

    expectThatApi.util.extend expectThatApi.api.jasmine, expectThatApi.assertionProvider

    expectThatApi.api.jasmine =
        expectThat: (desc, fn) ->
            # We could have used destructing assignment here, but jsHint doesn't like it.
            result = expectThatApi.api.extendApi fn, expectThatApi.assertionProvider, desc
            newFn = result[0]
            testDescription = result[1]
            env = jasmine.getEnv()
            env.it testDescription, newFn

    expectThatApi.util.extend expectThatApi, expectThatApi.api.jasmine
    # TODO: Need to find a way to eliminate all of this global state pollution
    exports.equal = expectThatApi.api.equal
    exports.be = expectThatApi.api.be
    exports.to = expectThatApi.api.to
    exports.throwException = expectThatApi.api.throwException
    exports.expectThat = expectThatApi.expectThat
    expectThatApi.util.extend exports, expectThatApi.api.extendedMatchers
    @
) expectThatApi or= {}, window