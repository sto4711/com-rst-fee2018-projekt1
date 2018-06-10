const FileMananger = require('../commons/FileMananger.js');

module.exports = class Model {
    constructor() {
        this.fileMananger = new FileMananger("C:\\temp\\NoteNew.json");
        this.TODAY = new Date().toJSON().split('T')[0];
        this.EMPTY_ITEM = { //template empty row
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

    deleteItem(id) {
        this.fileMananger.getJsonFromFile((err, list) => {
            let result = [];
            for (let i = 0; i < list.length; i++) {
                const currentId = list[i].id;
                if (currentId !== id) {
                    result.push(list[i]);
                }
            }
            return this.fileMananger.writeJsonToFile(JSON.stringify(result));
            //this.fileMananger.writeStringToFile(JSON.stringify(result), callback);
        });
    }

    updateItemIsFinished(id, isFinishedNew) {
        this.fileMananger.getJsonFromFile((err, list) => {
            for (let i = 0; i < list.length; i++) {
                const currentId = list[i].id;
                if (currentId === id) {
                    list[i].isFinished = isFinishedNew;
                    break;
                }
            }
            return this.fileMananger.writeJsonToFile(JSON.stringify(list));
        });
    }

    mergeItem(itemJson) {
        this.fileMananger.getJsonFromFile((err, list) => {
            if (itemJson.id === -1) { // Insert
                list.push(itemJson);
            } else {   // Update
                for (let i = 0; i < list.length; i++) {
                    if (list[i].id === itemJson.id) {
                        list[i] = itemJson;
                        break;
                    }
                }
            }
            return this.fileMananger.writeJsonToFile(JSON.stringify(list));
            //this.fileMananger.writeStringToFile(JSON.stringify(list), callback);
        });
    }


};
