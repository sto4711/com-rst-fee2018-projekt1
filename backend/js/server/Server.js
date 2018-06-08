const express = require('express');
const ModelNote = require('../model/ModelNote.js');

class Server {
    constructor() {
        this.HOSTNAME = "localhost";
        this.PORT = 3000;
        this.ROUTE_NOTE = "/note";
        this.myServer        = express();
        this.routerNote = express.Router();
        this.modelNote = new ModelNote(this);
        this.initRouter();
        this.start();
    }

    initRouter() {
        this.routerNote.get('/', (req, res) => {
            this.modelNote.getJsonData( (err, data) => {//must be refactored!!!
                console.log("callback;")
                res.json(data);
                debugger;
            });
        });
    }

    start() {
        this.myServer.use(this.ROUTE_NOTE, this.routerNote);
        this.myServer.listen(this.PORT);
        console.log("Server is running: http://" + this.HOSTNAME + ":" + this.PORT + this.ROUTE_NOTE);

    }

}

new Server();