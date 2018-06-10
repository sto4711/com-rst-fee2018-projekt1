const express = require("express");
const Model = require("../model/Model.js");

class Server {
    constructor() {
        this.HOSTNAME = "localhost";
        this.PORT = 3000;
        this.ROUTE_NOTE = "/note";
        this.FEEDBACK = JSON.parse('{"ok": 1}');
        this.app = express();
        this.routerNote = express.Router();
        this.model = new Model();
        this.initRoutes();
        this.start();
    }

    initRoutes() {
        this.routerNote.get("/", (request, response) => {
            this.model.pipeItemList(response);
        });
        this.routerNote.get("/empty", (request, response) => {   /* GET EMPTY ITEM */
            response.json(this.model.getEmptyItem());
        });

        this.routerNote.delete("/", (request, response) => {     /* DELETE ITEM */
            const err = this.model.deleteItem(JSON.parse(request.query.id));
            Server.checkThrowError(err, "delete");
            response.json(this.FEEDBACK);
        });

        this.routerNote.put("/isfinished", (request, response) => {  /* UPDATE ITEM.isfinished */
            const err = this.model.updateItemIsFinished(JSON.parse(request.query.id), JSON.parse(request.query.finished));
            Server.checkThrowError(err, "update isfinished");
            response.json(this.FEEDBACK);
            // this.model.updateItemIsFinished(JSON.parse(request.query.id), JSON.parse(request.query.finished), (err) => {//must be refactored!!!
            //     Server.checkThrowError(err, "put ITEM.isfinished");
            //     response.json(this.FEEDBACK);
            // });
        });

        this.routerNote.put("/", (request, response) => {  /* MERGE ITEM */
            const err = this.model.mergeItem(JSON.parse(request.query.item));
            Server.checkThrowError(err, "merge");
            response.json(this.FEEDBACK);
            //     this.model.mergeItem(JSON.parse(request.query.item), (err) => {//must be refactored!!!
            //     Server.checkThrowError(err, "put ITEM");
            //     response.json(this.FEEDBACK);
            // });
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
        this.app.use(express.json());//POST only
        this.app.use(this.ROUTE_NOTE, this.routerNote);
        this.app.listen(this.PORT);
        console.log("Server is running: http://" + this.HOSTNAME + ":" + this.PORT + this.ROUTE_NOTE);
    }

    static checkThrowError(err, functionName) {
        if (err) {
            console.log(functionName + "(), Exc: " + err);
            throw err;
        }
    }

}

new Server();