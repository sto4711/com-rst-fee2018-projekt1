const http = require('http');

class Server {
    constructor() {
        this.HOSTNAME = "localhost";
        this.PORT = 3000;
    }

    start() {
        const server = http.createServer((req, res) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Hallo Welt\n');
        });

        server.listen(this.PORT, this.HOSTNAME, () => {
            console.log("Server is running: http://" + this.HOSTNAME  + ":" + this.PORT);
        });

    }

}

new Server().start();