const express = require('express');
const ModelNote = require('../model/ModelNote.js');

class Server {
    constructor() {
        this.HOSTNAME = "localhost";
        this.PORT = 3000;
        this.ROUTE_NOTE = "/note";
        this.myServer        = express();
        this.routerNote = express.Router();
        this.modelNote = new ModelNote();
        this.initRouter();
        this.start();
    }

    initRouter() {
        this.routerNote.get('/', (req, res) => {
            res.json({ message: 'hooray! welcome to our api!' });
        });
    }

    start() {
        this.myServer.use(this.ROUTE_NOTE, this.routerNote);
        this.myServer.listen(this.PORT);
        console.log("Server is running: http://" + this.HOSTNAME + ":" + this.PORT + this.ROUTE_NOTE);


    }
}

new Server();