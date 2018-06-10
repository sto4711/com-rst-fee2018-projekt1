const fileSystem = require('fs');

module.exports = class FileMananger {
    constructor(filePath = "PLEASE DEFINE FILE PATH") {
        this.CHARACTER_ENCODING = "UTF8";
        this.filePath = filePath;
    }

    streamFile(serverResponse) {
        let readStream = fileSystem.createReadStream(this.filePath, { encoding: this.CHARACTER_ENCODING });
        readStream.on('close', () => {
            serverResponse.end()
        });
        readStream.pipe(serverResponse);
    }

    getJsonFromFile(callback) { /* ok for small files */
        let readStream = fileSystem.createReadStream(this.filePath, { encoding: this.CHARACTER_ENCODING });
        let chunks = [];

        readStream.on('error', err => {
            return callback(err);
        });
        readStream.on('data', chunk => {
            chunks.push(chunk);
        });
        readStream.on('close', () => {
            return callback(null, JSON.parse(chunks[0]));
        });
    }

    writeJsonToFile(fileContent) {
        var writeStream = fileSystem.createWriteStream(this.filePath, { encoding: this.CHARACTER_ENCODING });

        writeStream.on('error', err => {
            return err;
        });

        writeStream.write(fileContent);

        writeStream.on('close', () => {
            return null;
        });
        //fileSystem.writeFile(this.filePath, fileContent, this.CHARACTER_ENCODING, callback);
    }




};
