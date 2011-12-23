
  module("Module B");

  test("some other test", function() {
    return equal(true, true, "passing test");
  });

  test("some other other test", function() {
    equal(true, true, "passing test");
    return ok(2 >= 2);
  });
