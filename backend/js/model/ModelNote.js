const FileMananger = require('../commons/FileMananger.js');

module.exports = class ModelNote {
    constructor(callback_handler) {
        this.PATH_STORAGE_FILE = "C:\\temp\\NoteNew.json";
        this.fileMananger = new FileMananger(this.PATH_STORAGE_FILE);
    }

    getJsonData(callback) {
        this.fileMananger.getStringFromFile(callback);
    }








}
