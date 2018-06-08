const fileSystem = require('fs');

class FileMananger {
    constructor() {

    }

    writeStringToFile(path, fileContent, callback) {
        fileSystem.writeFile(path, fileContent, 'utf8', callback);

    }
}


function callbackTest(err) {
    if (err){
        console.log('EXC ' + err);
        throw err;
    }
    console.log('ok');
}


new FileMananger().writeStringToFile("C:\\temp\\NoteNew.json", "hallo moto4711",callbackTest );
