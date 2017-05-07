var fs = require("fs");

var linesLimit = 0;
var lines = 0;
var finalStr = "";
var str = "";
var func = "";
var funcName = "";
var funcArg = "";

process.stdin.on('data', function(data) {
    var data = data.toString().trim();

    if (linesLimit === 0) {
        if (isNaN(parseInt(data))) {
            console.log('please enter first line as Number');
            return;
        } else {
            linesLimit = parseInt(data);
        }
    } else {
        if (data !== '') {
            var lastIndex = data.lastIndexOf('.');

            str = data.slice(1, lastIndex - 1);
            func = data.slice(lastIndex + 1, data.length);
            funcName = func.slice(0, func.lastIndexOf('('));
            funcArg = func.slice(func.lastIndexOf('(') + 1, func.length - 1);

            if (operate(funcName, str, parseInt(funcArg))) {
                (lines < linesLimit - 1) ? lines++ : process.exit();
            }
        }
    }
});

process.on('exit', function() {
    process.stdout.write('\n' + finalStr);
});

function operate(func, str, num) {
    if (func === 'XyloHack') {
        (num % 2 === 0) ?
        finalStr = finalStr.concat(str.toUpperCase() + '\n'):
            finalStr = finalStr.concat(str.toLowerCase() + '\n');
        return true;
    } else {
        process.stdout.write(`function ${func} is undefined \n`);
        return false;
    }
}