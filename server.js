// Dependencies required for the server to run 
const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const mime = require('mime-types');

//Running on localhost
const hostname = '127.0.0.1';
//Server port 
const port = 5500;



//Creating the server and the function for request processing
const server = http.createServer((req, res) => {
    var parsedURL = url.parse(req.url, true);
    var pathname = parsedURL.pathname;
    var params = parsedURL.query;
    
    var body = '';
    req.on('data', chunk => {
        body += chunk;
    });
    
    req.on('end', () => {
        if(body !== '') {
            params = qs.parse(body);
        }
        
        res.setHeader('Content-Type', 'text/plain');
        res.setHeader('Access-Control-Allow-Origin', '*');
        
        var routeFound = false;
        
        if(!routeFound) {
            var filename = '.' + pathname;
            if(filename.startsWith('./server') || filename.startsWith('./levels')) {
                res.statusCode = 403;
                res.end();
                return;
            }
            
            // Returning requested files with AJAX and mime-type module
            fs.readFile(filename, function (err, data) {
                if (!err) {
                    res.writeHead(200, {
                        'Content-Type': getMimeType(filename),
                        'Content-Length': data.length
                    });
                    res.write(data);
                    res.end();
                } else if (err.code === 'ENOENT') {
                    res.statusCode = 404;
                    res.end('Page not found!');
                } else {
                    res.statusCode = 405;
                    res.end('Illegal operation!');
                }
            });
        }
    });
});

//Tell the server to begin to listen for clients
server.listen(port, hostname, () => {
    console.log('Server running at http://' + hostname + ':' + port + '/');
});

getMimeType = function (pathname) {
    return mime.lookup(pathname);
}