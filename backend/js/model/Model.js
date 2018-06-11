const FileMananger = require('../commons/FileMananger.js');

module.exports = class Model {
    constructor() {
        this.fileMananger = new FileMananger("C:\\temp\\NoteNew.json");
        this.TODAY = new Date().toJSON().split('T')[0];
        this.EMPTY_ITEM = { //template empty item
            "id": -1,
            "title": "",
            "description": "",
            "importance": 3,
            "created": this.TODAY,
            "completedBy": this.TODAY,
            "isFinished": false
        };
    }

    pipeItemList(serverResponse) {
        this.fileMananger.streamFile(serverResponse);
    }

    getEmptyItem() {
        return this.EMPTY_ITEM;
    }

    async deleteItem(id) {
        try {
            const fileContent = await this.fileMananger.getJsonFromFile();
            let fileContentNew = [];
            for (let i = 0; i < fileContent.length; i++) {
                const currentId = fileContent[i].id;
                if (currentId !== id) {
                    fileContentNew.push(fileContent[i]);
                }
            }
            await this.fileMananger.writeJsonToFile(JSON.stringify(fileContentNew));
            return null;
        } catch (e) {
            return e;
        }
    }

    async updateItemIsFinished(id, isFinishedNew) {
        try {
            let fileContent = await this.fileMananger.getJsonFromFile();
            for (let i = 0; i < fileContent.length; i++) {
                const currentId = fileContent[i].id;
                if (currentId === id) {
                    fileContent[i].isFinished = isFinishedNew;
                    break;
                }
                await this.fileMananger.writeJsonToFile(JSON.stringify(fileContent));
            }
            return null;
        } catch (e) {
            return e;
        }
    }

    async mergeItem(itemJson) {
        try {
            let fileContent = await this.fileMananger.getJsonFromFile();
            if (itemJson.id === -1) { // Insert
                let newID = 0;
                for (let i = 0; i < fileContent.length; i++) {
                    if (fileContent[i].id > newID) {
                        newID = fileContent[i].id;
                    }
                }
                itemJson.id = ++newID;
                fileContent.push(itemJson);
            } else {   // Update
                for (let i = 0; i < fileContent.length; i++) {
                    if (fileContent[i].id === itemJson.id) {
                        fileContent[i] = itemJson;
                        break;
                    }
                }
            }
            await this.fileMananger.writeJsonToFile(JSON.stringify(fileContent));
            return null;
        } catch (e) {
            return e;
        }
    }


};
