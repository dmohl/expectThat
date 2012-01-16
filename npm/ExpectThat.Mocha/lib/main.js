var expectThat = require("./expectThat.mocha")

for(var key in expectThat) {
    global[key] = expectThat[key];
}

exports.expectThat = expectThat;
exports.expectThatApi = expectThat.expectThatApi;