module "Module B"

test "some other test", ->
    #equal true, false, "failing test"
    equal true, true, "passing test"

test "some other other test", ->
    #equal true, false, "failing test"
    equal true, true, "passing test"
    ok(2 >= 2)