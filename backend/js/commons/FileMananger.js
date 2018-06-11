const fileSystemExtra = require('fs-extra');

module.exports = class FileMananger {
    constructor(filePath = "PLEASE DEFINE FILE PATH") {
        this.CHARACTER_ENCODING = "UTF8";
        this.filePath = filePath;
    }

    streamFile(serverResponse) {
        let readStream = fileSystemExtra.createReadStream(this.filePath, {encoding: this.CHARACTER_ENCODING});
        readStream.on('close', () => {
            serverResponse.end()
        });
        readStream.pipe(serverResponse);
    }


    getJsonFromFile() {
        return new Promise((resolve, reject) => {
            fileSystemExtra.readFile(this.filePath, this.CHARACTER_ENCODING)
                .then((fileContent) => {
                    resolve(JSON.parse(fileContent));
                }).catch(function (e) {
                reject(e);
            });
        });
    }

    writeJsonToFile(fileContent) {
        return new Promise((resolve, reject) => {
            fileSystemExtra.writeFile(this.filePath, fileContent, this.CHARACTER_ENCODING)
                .then(() => {
                    resolve();
                }).catch(function (e) {
                reject(e);
            });
        });
    }

};
