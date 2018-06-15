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
        console.log("get all");
        this.fileMananger.streamFile(serverResponse);
    }

    getEmptyItem() {
        console.log("get empty one");
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
            await this.fileMananger.writeToFile(JSON.stringify(fileContentNew));
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
            }
            await this.fileMananger.writeToFile(JSON.stringify(fileContent));
            console.log("updated IsFinished -> " + isFinishedNew);
            return null;
        } catch (e) {
            return e;
        }
    }

    async insertItem(itemJson) {
        try {
            let fileContent = await this.fileMananger.getJsonFromFile();
            let newID = 0;
            for (let i = 0; i < fileContent.length; i++) {
                if (fileContent[i].id > newID) {
                    newID = fileContent[i].id;
                }
            }
            itemJson.id = ++newID;
            fileContent.push(itemJson);
            await this.fileMananger.writeToFile(JSON.stringify(fileContent));
            console.log("inserted");
            return null;
        } catch (e) {
            return e;
        }
    }

    async updateItem(itemJson) {
        try {
            let fileContent = await this.fileMananger.getJsonFromFile();
            const idUpdate = JSON.parse(itemJson.id);
            for (let i = 0; i < fileContent.length; i++) {
                if (fileContent[i].id === idUpdate) {
                    fileContent[i] = itemJson;
                    break;
                }
            }
            await this.fileMananger.writeToFile(JSON.stringify(fileContent));
            console.log("updated");
            return null;
        } catch (e) {
            return e;
        }
    }

};
