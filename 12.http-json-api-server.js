//  ## HTTP JSON API SERVER (Exercise 13 of 13)  

//   Create a file named http-json-api-server.js.  

//   Write an HTTP server that serves JSON data when it receives a GET request  
//   to the path '/api/parsetime'. Expect the request to contain a query string  
//   with a key 'iso' and an ISO-format time as the value.  

//   For example:  

//   /api/parsetime?iso=2013-08-10T12:10:15.474Z  

//   The JSON response should contain only 'hour', 'minute' and 'second'  
//   properties. For example:  

//      {  
//        "hour": 14,  
//        "minute": 23,  
//        "second": 15  
//      }  

//   Add second endpoint for the path '/api/unixtime' which accepts the same  
//   query string but returns UNIX epoch time in milliseconds (the number of  
//   milliseconds since 1 Jan 1970 00:00:00 UTC) under the property 'unixtime'.  
//   For example:  

//      { "unixtime": 1376136615474 }  

//   Your server should listen on the port provided by the first argument to  
//   your program.  

//  ─────────────────────────────────────────────────────────────────────────────  

//  ## HINTS  

//   The request object from an HTTP server has a url property that you will  
//   need to use to "route" your requests for the two endpoints.  

//   You can parse the URL and query string using the Node core 'url' module.  
//   new URL(request.url) will parse content of request.url and provide you  
//   with an object with helpful properties.  

//   For example, on the command prompt, type:  

//      $ node -pe "new URL('/test?q=1', 'http://example.com')"  

//   Documentation on the url module can be found by pointing your browser  
//   here:  
//   file:///Users/softmaker/.nvm/versions/node/v18.12.1/lib/node_modules/learnyounode/docs-nodejs/url.html  

//   Your response should be in a JSON string format. Look at JSON.stringify()  
//   for more information.  

//   You should also be a good web citizen and set the Content-Type properly:  

//      res.writeHead(200, { 'Content-Type': 'application/json' })  

//   The JavaScript Date object can print dates in ISO format, e.g. new  
//   Date().toISOString(). It can also parse this format if you pass the string  
//   into the Date constructor. Date.getTime() will also come in handy.  


'use strict'
const http = require('http');

const port = process.argv[2] || 3000;

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    if (req.method === 'GET') {
        const url = new URL(req.pathname, `http://localhost:${port}`);
        const iso = url.searchParams.get('iso');
        if (url.pathname === '/api/parsetime') {
            const date = new Date(iso);
            const response = {
                hour: date.getHours(),
                minute: date.getMinutes(),
                second: date.getSeconds(),
            };
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(response));
        } else if (url.pathname === '/api/unixtime') {
            const unixTime = new Date(iso).getTime();
            const response = { unixtime: unixTime };
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(response));
        }
    } else {
        res.writeHead(404);
        res.end();
    }
});

server.listen(port, () => console.log(`Server listening on port ${port}`));