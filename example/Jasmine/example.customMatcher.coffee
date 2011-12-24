((expectThatApi, jasmine) ->
    myCustomMatchers =
        atleastTwoGreaterThan: (expected) ->
            "assertionType": "atleastTwoGreaterThan"
            "expected": expected
            "expr": (actual, expected) -> actual >= expected + 2

    expectThatApi.util.extend jasmine, myCustomMatchers
) expectThatApi, window