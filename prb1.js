var fs = require("fs");

var newFileText = "";
var newFilename = "";
var extension = "";
var filesCount = 0;
var printedFiles = 0;

process.stdin.on('data', function(data) {
    var str = data.toString().trim();

    if (filesCount === 0) {
        if (isNaN(parseInt(str))) {
            console.log('please enter first line as Number');
            return;
        } else {
            filesCount = parseInt(str);
        }
    } else {
        if (str !== '') {
            var lastIndex = str.lastIndexOf('.');
            var filename = "";

            extension = str.slice(lastIndex, str.length);
            filename = filename.concat(str.slice(0, lastIndex));
            filename = filename.charAt(0).toUpperCase() + filename.slice(1);
            newFilename = newFilename.concat(filename);

            //operation on each line
            var readline = require('readline').createInterface({
                input: require('fs').createReadStream(str)
            });
            readline.on('line', function(line) {
                process.stdout.write(line + '\n');
                if (line !== '') newFileText = newFileText.concat(line + '\n');
            });
            readline.on('close', function() {
                process.stdout.write('\n\n\n');
                (printedFiles < filesCount - 1) ? printedFiles++ : process.exit();
            });
            readline.input.on('error', function() {
                //in case of any incorrect filename error it won't be executed
                newFilename = newFilename.slice(0, newFilename.length - filename.length);
                console.log(str + ' file not found, enter correct filename');
            });
        }
    }
});

process.on('exit', function() {
    newFilename = newFilename.charAt(0).toLowerCase() + newFilename.slice(1);
    process.stdout.write(newFilename + extension + '\n');
    process.stdout.write(newFileText.replace('$', ''));
});