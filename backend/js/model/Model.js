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

    updateItemIsFinished(id, isFinishedNew) {
        this.fileMananger.getJsonFromFile()
            .then(list => {
                for (let i = 0; i < list.length; i++) {
                    const currentId = list[i].id;
                    if (currentId === id) {
                        list[i].isFinished = isFinishedNew;
                        break;
                    }
                }
                return this.fileMananger.writeJsonToFile(JSON.stringify(list));
            })
            .catch(e => {
                return e;
            });
    }

    mergeItem(itemJson) {
        this.fileMananger.getJsonFromFile()
            .then(list => {
                if (itemJson.id === -1) { // Insert
                    let newID = 0;
                    for (let i = 0; i < list.length; i++) {
                        if (list[i].id > newID) {
                            newID = list[i].id;
                        }
                    }
                    itemJson.id = ++newID;
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
            })
            .catch(e => {
                return e;
            });
    }


};
