((expectThatApi) ->
    myCustomMatchers =
        atleastTwoGreaterThan: (expected) ->
            "assertionType": "atleastTwoGreaterThan"
            "expected": expected
            "expr": (actual, expected) -> actual >= expected + 2

    expectThatApi.util.extend pavlov.api, myCustomMatchers
) expectThatApi