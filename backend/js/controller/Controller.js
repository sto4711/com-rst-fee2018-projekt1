const express = require("express");
const bodyParser = require("body-parser");
const Model = require("../model/Model.js");

class Controller {
    constructor() {
        this.HOSTNAME = "localhost";
        this.PORT = 3000;
        this.ROUTE_NOTE = "/note";
        this.FEEDBACK_OK = JSON.parse('{"ok": 1}');
        this.app = express();
        this.routerNote = express.Router();
        this.model = new Model();
        this.initRoutes();
        this.start();
    }

    initRoutes() {
        this.routerNote.get("/", (request, response) => {
            if (request.query.empty != null) {
                response.json(this.model.getEmptyItem());
            } else {
                this.model.pipeItemList(response);
            }
        });

        this.routerNote.delete("/", async (request, response) => {                  /* DELETE ITEM */
            const err = await this.model.deleteItem(JSON.parse(request.body.id));
            response.json(this.createJsonFeedback(err, "delete"));
        });

        this.routerNote.patch("/isfinished", async (request, response) => {        /* UPDATE ITEM.isfinished */
            const err = await this.model.updateItemIsFinished(request.body.id, request.body.value);
            response.json(this.createJsonFeedback(err, "update isfinished"));
        });

        this.routerNote.put("/", async (request, response) => {                    /* UPDATE ITEM */
            const err = await this.model.updateItem(request.body);
            response.json(this.createJsonFeedback(err, "update"));
        });

        this.routerNote.post("/", async (request, response) => {                    /* INSERT ITEM */
            const err = await this.model.insertItem(request.body);
            response.json(this.createJsonFeedback(err, "insert"));
        });
    }

    start() {
        this.app.use((req, res, next) => {
            //enable CORS
            res.setHeader("Access-Control-Allow-Origin", "http://localhost:63342");
            res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
            res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");
            res.setHeader("Access-Control-Allow-Credentials", true);
            res.setHeader('Content-Type', 'application/json');
            next();
        });
        this.app.use(bodyParser.urlencoded({extended: false}));
        this.app.use(bodyParser.json());
        this.app.use(this.ROUTE_NOTE, this.routerNote);
        this.app.listen(this.PORT);
        console.log("Server is running: http://" + this.HOSTNAME + ":" + this.PORT + this.ROUTE_NOTE);
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

new Controller();