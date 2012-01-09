//runspecs.js
var jasmine = require('jasmine-node');
var sys = require('util');
var expectThat = require("../../../lib/expectThat.jasmine.js")

for(var key in expectThat) {
  global[key] = expectThat[key];
}

var extentions = 'js'
var match = '.'
var specsDirectory = __dirname + '/../min/';
var junitreport = {
  report: false,
  savePath : "./reports/",
  useDotNotation: true,
  consolidate: true
}

jasmine.executeSpecsInFolder(specsDirectory,
                             function(runner, log){
                                 if (runner.results().failedCount == 0) {
                                     process.exit(0);
                                 }
                                 else {
                                     process.exit(1);
                                 }
                             },
                             true, true,
                             false,
                             false,
                             new RegExp(match + "spec\\.(" + extentions + ")$", 'i'),
                             junitreport);
