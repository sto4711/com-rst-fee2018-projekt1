import {DatabaseMananger} from "../commons/DatabaseMananger";
import {ItemNote} from "../service/ItemNote";

export class StoreNote_DB {
    constructor() {
        this.dbMananger = new DatabaseMananger("../data/note.db");
    }

    async getItems() {
        console.log("get all ");
        //await this.dbMananger.logAllItems();
        return await this.dbMananger.find({"state": "ACTIVE"});
    }

    async getEmptyItem() {
        return new Promise((resolve, reject) => {
            console.log("get empty one");
            resolve(new ItemNote());
        });
    }

    async insertItem(itemJson) {
        try {
            await this.dbMananger.insert(itemJson);
            console.log("inserted");
            return null;
        } catch (e) {
            return e;
        }
    }

    async deleteItem(_id) {
        try {
            await this.dbMananger.update(_id, {"state": "DELETED"});//performance++
            return null;
        } catch (e) {
            return e;
        }
    }

    async updateItemIsFinished(_id, value) {
        try {
            await this.dbMananger.update(_id, {"isFinished": value});
            console.log("updated IsFinished -> " + value);
            return null;
        } catch (e) {
            return e;
        }
    }

    async updateItem(itemJson) {
        try {
            await this.dbMananger.update(itemJson._id, itemJson);
            console.log("updated");
            return null;
        } catch (e) {
            return e;
        }
    }
}