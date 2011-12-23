((expectThat) ->
    expectThat.api.customMatchers =
        greaterThan: (expected) -> "assertionType": "greaterThan", "expected": expected, "expr": (actual, expected) -> actual > expected
        lessThan: (expected) -> "assertionType": "lessThan", "expected": expected, "expr": (actual, expected) -> actual < expected
    @
) expectThat or= {}