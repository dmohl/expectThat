module "Example QUnit Specifications"

foo = "bar"

module "When testing should equal"

expectThat -> foo.should equal "bar"

module "When testing shouldnt equal"

expectThat -> foo.shouldnt equal "baz"

module "When testing to and be"

expectThat -> foo.should be equal to "bar"
expectThat -> foo.shouldnt be equal to "bah"

module "When testing for true"

expectThat -> (foo is "bar").should be true
expectThat -> (foo is "baz").shouldnt be true

module "When testing for false"

expectThat -> (foo is "baz").should be false
expectThat -> (foo is "bar").shouldnt be false

module "When testing for null or undefined"

testNull = null
testUndefined = undefined
expectThat -> (testNull is null).should be true
expectThat -> (testNull isnt null).shouldnt be true
expectThat -> (testUndefined is undefined).should be true
expectThat -> (testUndefined is undefined).shouldnt be false

module "When testing for throw"

expectThat -> (-> throw "test exception").should throwException
expectThat -> (-> throw "test exception").should throwException "test exception"

module "When testing for greater than"

expectThat -> 10.should be greaterThan 9
expectThat -> 9.1.shouldnt be greaterThan 10

module "When testing for less than"

expectThat -> 10.should be lessThan 11
expectThat -> 10.1.shouldnt be lessThan 10
