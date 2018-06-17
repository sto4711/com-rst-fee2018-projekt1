import express from 'express';
import {ControllerNote} from "../controller/ControllerNote";

export class RouterNote {
    constructor() {
        this.router = express.Router();
        this.controllerNote = new ControllerNote();

        this.router.get("/", async (request, response) => {                                 // GET ITEM(s)
            await this.controllerNote.getItems(request, response);
        });
        this.router.delete("/", async (request, response) => {                              // DELETE ITEM
            await this.controllerNote.deleteItem(request, response);
        });
        this.router.patch("/isfinished", async (request, response) => {                     // UPDATE ITEM.isfinished
            await this.controllerNote.updateItemIsFinished(request, response);
        });
        this.router.put("/", async (request, response) => {                                 // UPDATE ITEM
            await this.controllerNote.updateItem(request, response);
        });
        this.router.post("/", async (request, response) => {                                // INSERT ITEM
            await this.controllerNote.insertItem(request, response);
        });
    }

    getRouter() {
        return this.router;
    }
}
