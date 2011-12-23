((expectThat) ->
    myCustomMatchers =
        atleastTwoGreaterThan: (expected) ->
            "assertionType": "atleastTwoGreaterThan", "expected": expected, "expr": (actual, expected) -> actual >= expected + 2

    expectThat.util.extend pavlov.api, myCustomMatchers
) expectThat