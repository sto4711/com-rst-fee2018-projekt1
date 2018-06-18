import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import {RouterNote} from "./router/RouterNote";

class NoteApp {
    constructor() {
        this.app = express();
        this.app.use((request, response, next) => {
            // response.setHeader("Access-Control-Allow-Origin", "http://localhost:63342");                     //enable CORS (no longer needed; backend & frontend have same host & port)
            // response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");    //enable CORS (no longer needed; backend & frontend have same host & port)
            // response.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");             //enable CORS (no longer needed; backend & frontend have same host & port)
            // response.setHeader("Access-Control-Allow-Credentials", true);                                    //enable CORS (no longer needed; backend & frontend have same host & port)
            if (request.path.startsWith("/icon")) {
                response.setHeader("Content-Type", "image/png");
            }
            else if (request.path.startsWith("/css")) {
                response.setHeader("Content-Type", "text/css; charset=utf-8");
            }
            else if (request.path.startsWith("/js")) {
                response.setHeader("Content-Type", "application/javascript; charset=utf-8");
            }
            else if (request.path.startsWith("/note")) {
                response.setHeader("Content-Type", "application/json; charset=utf-8");
            }
            else {
                response.setHeader("Content-Type", "text/html; charset=utf-8");
            }
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