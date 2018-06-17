//import {StoreNote_File} from "../service/StoreNote_File";
import {StoreNote_DB} from "../service/StoreNote_DB";

export class ControllerNote {
    constructor() {
        //this.storeNote = new StoreNote_File();
        this.storeNote = new StoreNote_DB();
        this.FEEDBACK_OK = JSON.parse('{"ok": 1}');
    }

    async getItems(request, response)  {
        if (request.query.empty != null) {
            response.json(await this.storeNote.getEmptyItem());
        } else {
            response.json(await this.storeNote.getItems());
            //this.storeNote.pipeItems(response);
        }
    }

    async deleteItem(request, response)  {
        const err = await this.storeNote.deleteItem(request.body._id);
        response.json(this.createJsonFeedback(err, "delete"));
    }

    async updateItemIsFinished(request, response) {
        const err = await this.storeNote.updateItemIsFinished(request.body._id, request.body.value);
        response.json(this.createJsonFeedback(err, "update isfinished"));
    }

    async updateItem(request, response) {
        const err = await this.storeNote.updateItem(request.body);
        response.json(this.createJsonFeedback(err, "update"));
    }

    async insertItem(request, response) {
        const err = await this.storeNote.insertItem(request.body);
        response.json(this.createJsonFeedback(err, "insert"));
    }

    createJsonFeedback(err, functionName) {
        if (err) {
            const trace = functionName + "(), Exc: " + err;
            console.log(trace);
            return JSON.parse('{"error": "' + trace + '"}');
        }
        return this.FEEDBACK_OK;
    }

}