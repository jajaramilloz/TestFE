const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req,res) => {
    console.log("Req (" + req.method + ") for " + req.url);

    if (req.method === 'GET') {
        let fileUrl;
        if (req.url === '/') fileUrl = '/index.html';
        else fileUrl = req.url;

        let filePath = path.resolve('./public'+fileUrl);
        let fileExt = path.extname(filePath);
        if (fileExt === '.html') {
            fs.exists(filePath, (exists) => {
                if (!exists) {
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/html');
                    res.end("<html><body>File '" + fileUrl + "' not found.</body></html>");
                } else {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'text/html');
                    fs.createReadStream(filePath).pipe(res);
                }
            });
        } else {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end("<html><body>File '" + fileUrl + "' is not a HTML file.</body></html>");
        }
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end("<html><body>Request method '" + req.method + "' is not supported.</body></html>");
}
});

server.listen(port, hostname, () => {
    console.log(`Http-Server running at http://${hostname}:${port}`);
});
