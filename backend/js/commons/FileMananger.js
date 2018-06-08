const fileSystem = require('fs');

module.exports = class FileMananger {
    constructor(filePath = "PLEASE DEFINE FILE PATH") {
        this.CHARACTER_ENCODING = "UTF8";
        this.filePath = filePath;
    }

    writeStringToFile(fileContent, callback) {
        fileSystem.writeFile(this.filePath, fileContent, this.CHARACTER_ENCODING, callback);
    }

    getStringFromFile(callback) {
        fileSystem.readFile(this.filePath, this.CHARACTER_ENCODING, callback);
    }
}
