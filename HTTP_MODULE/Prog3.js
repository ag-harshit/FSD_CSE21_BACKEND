// const http = require('http');
import http from 'http';

const server = http.createServer((req, res) => {

    res.writeHead(200, {
        'Content-Type': 'text/plain',
        'X-Custom-Header': 'MyHeaderValue'
    });
    res.write('<h1>Hello World!</h1>\n')

    // Send response body
    res.end('How are you?\n');
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});