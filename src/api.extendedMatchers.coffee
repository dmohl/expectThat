((expectThatApi) ->
    expectThatApi.api.extendedMatchers =
        greaterThan: (expected) ->
            "assertionType": "greaterThan"
            "expected": expected
            "expr": (actual, expected) -> actual > expected

        lessThan: (expected) ->
            "assertionType": "lessThan"
            "expected": expected
            "expr": (actual, expected) -> actual < expected

        greaterThanOrEqual: (expected) ->
            "assertionType": "greaterThanOrEqual"
            "expected": expected,
            "expr": (actual, expected) -> actual >= expected

        lessThanOrEqual: (expected) ->
            "assertionType": "lessThanOrEqual"
            "expected": expected
            "expr": (actual, expected) -> actual <= expected

        strictlyEqual: (expected) ->
            "assertionType": "strictlyEqual"
            "expected": expected
            "expr": (actual, expected) -> actual is expected

    expectThatApi.util.extend expectThatApi, expectThatApi.api.extendedMatchers
) expectThatApi or= {}