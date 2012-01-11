var jasmine = require('jasmine-node');
var util,
    Path= require('path');
try {
  util = require('util')
} catch(e) {
  util = require('sys')
}
var expectThat = require("./expectThat.jasmine")

for(var key in expectThat) {
  global[key] = expectThat[key];
}

var executeJasmineSpecs = function (specsDirectory) {
    var extentions = 'js'
    var match = '.'
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
                                 true,
                                 true,
                                 false,
                                 false,
                                 new RegExp(match + "spec\\.(" + extentions + ")$", 'i'),
                                 junitreport);
}

exports.executeJasmineSpecs = executeJasmineSpecs;
exports.jasmine = jasmine;
exports.expectThat = expectThat;