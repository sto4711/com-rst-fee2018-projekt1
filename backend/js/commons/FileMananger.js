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

    getJsonFromFileAsStream() {
        return new Promise((resolve, reject) => {
            let readStream = fileSystemExtra.createReadStream(this.filePath, {encoding: this.CHARACTER_ENCODING});
            let fileContent = "";

            readStream.on("error", err => {
                reject(err);
            });
            readStream.on("data", chunk => {
                fileContent += chunk;
            });
            readStream.on("close", () => {
                resolve(JSON.parse(fileContent));
            });
        })
    }

    getJsonFromFile() {
        return new Promise((resolve, reject) => {
            fileSystemExtra.readFile(this.filePath, this.CHARACTER_ENCODING)
                .then((fileContent) => {
                    resolve(JSON.parse(fileContent));
                }).catch(function (e) {
                reject(e);
            });
        })
    }

    writeJsonToFileAsStream(fileContent) {
        let writeStream = fileSystemExtra.createWriteStream(this.filePath, {encoding: this.CHARACTER_ENCODING});
        writeStream.on('error', err => {
            return err;
        });
        writeStream.write(fileContent);
        writeStream.on('close', () => {
            return null;
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
        })
    }
};
