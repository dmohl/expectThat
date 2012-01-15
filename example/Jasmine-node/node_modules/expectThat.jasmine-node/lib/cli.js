var expectThat = require('./main.js');

var util,
    Path= require('path');
try {
  util = require('util')
} catch(e) {
  util = require('sys')
}

// The options exposed by jasmine-node are passed through.
var args = process.argv.slice(2);

var isVerbose = true;
var showColors = true;
var teamcity = process.env.TEAMCITY_PROJECT_NAME || false;
var useRequireJs = false;
var extensions = 'js';
var specFolder = null;
var useHelpers = false;

var match = '.'
var junitreport = {
    report: false,
    savePath : "./reports/",
    useDotNotation: true,
    consolidate: true
}

while(args.length) {
    var arg = args.shift();

    switch(arg)
    {
        case '--color':
            showColors = true;
            break;
        case '--noColor':
        case '--nocolor':
            showColors = false;
            break;
        case '--version':
            util.print("expectThat version: " + expectThat.expectThatApi.version + "\n");
            process.exit(-1);
            break;
        case '--verbose':
            isVerbose = true;
            break;
        case '--coffee':
            require('coffee-script');
            extensions = "js|coffee";
            break;
        case '-m':
        case '--match':
            match = args.shift();
            break;
        case '--junitreport':
            junitreport.report = true;
            break;
        case '--teamcity':
            teamcity = true;
            break;
        case '--runWithRequireJs':
            useRequireJs = true;
            break;
        case '--nohelpers':
            useHelpers = false;
            break;
        case '--test-dir':
            var dir = args.shift();

            if(!Path.existsSync(dir))
                throw new Error("Test root path '" + dir + "' doesn't exist!");

            specFolder = dir; // NOTE: Does not look from current working directory.
            break;
        case '-h':
            help();
        default:
            if (arg.match(/^--/)) help();
            specFolder = Path.join(process.cwd(), arg);
            break;
    }
}

if (!specFolder) {
    help();
}

var exitCode = 0;

process.on("exit", onExit);

function onExit() {
    process.removeListener("exit", onExit);
    process.exit(exitCode);
}

if(useHelpers){
    expectThat.jasmine.loadHelpersInFolder(specFolder,
                              new RegExp("helpers?\\.(" + extentions + ")$", 'i'));
}

expectThat.executeJasmineSpecs(specFolder, isVerbose, showColors, useRequireJs, teamcity, extensions, junitreport, match);

function help(){
    util.print([
        'USAGE: expectThat.jasmine-node [--color|--noColor] [--verbose] [--coffee] directory'
        , ''
        , 'Options:'
        , '  --color            - use color coding for output'
        , '  --noColor          - do not use color coding for output'
        , '  -m, --match REGEXP - load only specs containing "REGEXPspec"'
        , '  --version          - displays the version of expectThat.jasmine that is being used'
        , '  --verbose          - print extra information per each test run'
        , '  --coffee           - load coffee-script which allows execution .coffee files'
        , '  --junitreport      - export tests results as junitreport xml format'
        , '  --teamcity         - converts all console output to teamcity custom test runner commands. (Normally auto detected.)'
        , '  --runWithRequireJs - loads all specs using requirejs instead of node\'s native require method'
        , '  --test-dir         - the absolute root directory path where tests are located'
        , '  --nohelpers        - does not load helpers.'
        , '  -h, --help         - display this help and exit'
        , ''
    ].join("\n"));

    process.exit(-1);
}
