import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import {RouterNote} from "./router/RouterNote";

class NoteApp {
    constructor() {
        this.app = express();
        this.app.use((req, res, next) => {
            // res.setHeader("Access-Control-Allow-Origin", "http://localhost:63342");                     //enable CORS
            // res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");    //enable CORS
            // res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");             //enable CORS
            // res.setHeader("Access-Control-Allow-Credentials", true);                                    //enable CORS
            res.setHeader("Content-Type", (req.url.indexOf("note") === 1? "application/json": "text/html"));
            next();
        });
        this.app.use(express.static(path.resolve("public")));           // frontend -> http://localhost:3000
        this.app.use(bodyParser.urlencoded({extended: false}));
        this.app.use(bodyParser.json());
        this.app.use("/note", new RouterNote().getRouter());            // backend  -> http://localhost:3000/note
        this.app.listen(3000);
        console.log("Server started, Backend: http://localhost:3000");
    }
}

new NoteApp();