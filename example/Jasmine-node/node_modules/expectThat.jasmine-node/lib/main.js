var jasmine = require('jasmine-node');
var expectThat = require("./expectThat.jasmine")

for(var key in expectThat) {
    global[key] = expectThat[key];
}

var executeJasmineSpecs = function (specsDirectory, isVerbose, showColors, useRequireJs, teamcity, extensions, junitreport, match) {
    isVerbose = typeof(isVerbose) === "undefined" ? true : isVerbose;
    showColors = typeof(showColors) === "undefined" ? true : showColors;
    teamcity = typeof(teamcity) === "undefined" ? false : teamcity;
    useRequireJs = typeof(useRequireJs) === "undefined" ? false : useRequireJs;
    extensions = typeof(extensions) === "undefined" ? 'js' : extensions;

    match = typeof(match) === "undefined" ? '.' : match;

    var defaultJunitReport = {
        report: false,
        savePath : "./reports/",
        useDotNotation: true,
        consolidate: true
    }
    junitreport = typeof(junitreport) === "undefined" ? defaultJunitReport : junitreport;

    var onComplete = function(runner, log){
                         if (runner.results().failedCount == 0) {
                             process.exit(0);
                         }
                         else {
                             process.exit(1);
                         }
                     };

    jasmine.executeSpecsInFolder(specsDirectory,
                                 onComplete,
                                 isVerbose,
                                 showColors,
                                 teamcity,
                                 useRequireJs,
                                 new RegExp(match + "spec\\.(" + extensions + ")$", 'i'),
                                 junitreport);
}

exports.executeJasmineSpecs = executeJasmineSpecs;
exports.jasmine = jasmine;
exports.expectThat = expectThat;
exports.expectThatApi = expectThat.expectThatApi;