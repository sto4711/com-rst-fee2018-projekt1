import {ItemNote} from "../service/ItemNote";
import { FileMananger } from '../commons/FileMananger';

export class StoreNote_File {
    constructor() {
        this.fileMananger = new FileMananger("./data/note.json");
    }

    pipeItems(serverResponse) {
        console.log("get all ");
        this.fileMananger.streamFile(serverResponse);
    }

    async getItems() {
        console.log("get all ");
        return await this.fileMananger.getJsonFromFile();
    }

    async getEmptyItem() {
        return new Promise((resolve, reject) => {
            console.log("get empty one");
            resolve(new ItemNote());
        });
    }

    async insertItem(itemJson) {
        try {
            let fileContent = await this.fileMananger.getJsonFromFile();
            let newID = 0;
            for (let i = 0; i < fileContent.length; i++) {
                const idInt = JSON.parse(fileContent[i]._id);
                if (idInt > newID) {
                    newID = idInt;
                }
            }
            newID++;
            itemJson._id = newID.toString();
            fileContent.push(itemJson);
            await this.fileMananger.writeToFile(JSON.stringify(fileContent));
            console.log("inserted");
            return null;
        } catch (e) {
            return e;
        }
    }

    async deleteItem(_id) {
        try {
            const fileContent = await this.fileMananger.getJsonFromFile();
            let fileContentNew = [];
            for (let i = 0; i < fileContent.length; i++) {
                if (fileContent[i]._id !== _id) {
                    fileContentNew.push(fileContent[i]);
                }
            }
            await this.fileMananger.writeToFile(JSON.stringify(fileContentNew));
            return null;
        } catch (e) {
            return e;
        }
    }

    async updateItemIsFinished(_id, isFinishedNew) {
        try {
            let fileContent = await this.fileMananger.getJsonFromFile();
            for (let i = 0; i < fileContent.length; i++) {
                if (fileContent[i]._id === _id) {
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


    async updateItem(itemJson) {
        try {
            let fileContent = await this.fileMananger.getJsonFromFile();
            for (let i = 0; i < fileContent.length; i++) {
                if (fileContent[i]._id === itemJson._id) {
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

}