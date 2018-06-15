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

    /* streams */
    getJsonFromFile() {
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
        });
    }

    /* streams */
    writeToFile(fileContent) {
        return new Promise((resolve, reject) => {
            let writeStream = fileSystemExtra.createWriteStream(this.filePath, {encoding: this.CHARACTER_ENCODING});
            writeStream.write(fileContent);
            writeStream.end();

            writeStream.on('error', err => {
                reject(err) ;
            });
            writeStream.on('close', () => {
                resolve();
            });
        });
    }

};
