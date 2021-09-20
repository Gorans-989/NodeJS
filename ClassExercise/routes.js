const fs = require('fs');

const requestHandler = (req, res) => {

    
    const url = req.url;
    const method = req.method;
        
    if (url === '/'){
        res.write('<html>');
        res.write('<head><title>Enter a message here</title></head>');
        res.write('<body><form action="/message" method="POST"><input type = "text" name="tekst"><button type="submit"> Click me to send!</button></form></body>');
        res.write('</html>');

        return res.end();
    };

    if(url === '/message' && method === 'POST'){
        
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        })
        
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1]; // key - value pair. stavam 1 da go zeme vtoriot element t.e. od desna strana na " = "

            console.log(message);

            fs.writeFile('message.txt', message, (error) => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();  
            });
        });       
    }

    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My first Page nodeJS</title></head>');
    res.write('<body><h1>Hello from nodeJS Server</h1></body>');
    res.write('</html>');

    res.end();
    
} 

const someText = () => {
    console.log("from inside the module.")
}
// module.exports = requestHandler;

// module.exports = {
//     handler : requestHandler,
//     someFunc : someText
// };

module.exports.handler = requestHandler;
module.exports.someText = someText;

// even shorter
// exports.handler = requestHandler;
// exports.someText = someText;