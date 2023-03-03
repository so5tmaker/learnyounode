// READ THE INSTRUCTIONS CAREFULLY!!!
// AND WRITE MAIN POINTS DOWN IN THE COPYBOOK USING PENCIL!!!

// ## HTTP UPPERCASERER (Exercise 12 of 13)  

//   Create a file named http-uppercaserer.js.  

//   Write an HTTP server that receives only POST requests and converts  
//   incoming POST body characters to upper-case and returns it to the client.  

//   Your server should listen on the port provided by the first argument to  
//   your program.  

//  ─────────────────────────────────────────────────────────────────────────────  

//  ## HINTS  

//   While you're not restricted to using the streaming capabilities of the  
//   request and response objects, it will be much easier if you do.  

//   There are a number of different packages in npm that you can use to  
//   "transform" stream data as it's passing through. For this exercise the  
//   through2-map package offers the simplest API.  

//   through2-map allows you to create a transform stream using only a single  
//   function that takes a chunk of data and returns a chunk of data. It's  
//   designed to work much like Array#map() but for streams:  

//      const map = require('through2-map')  
//      inStream.pipe(map(function (chunk) {  
//        return chunk.toString().split('').reverse().join('')  
//      })).pipe(outStream)  

//   In the above example, the incoming data from inStream is converted to a  
//   String (if it isn't already), the characters are reversed and the result  
//   is passed through to outStream. So we've made a chunk character reverser!  
//   Remember though that the chunk size is determined up-stream and you have  
//   little control over it for incoming data.  

//   To install through2-map type:  

//      $ npm install through2-map  

//   If you don't have an Internet connection, simply make a node_modules  
//   directory and copy the entire directory for the module you want to use  
//   from inside the learnyounode installation directory:  

//   file:///Users/softmaker/.nvm/versions/node/v18.12.1/lib/node_modules/learnyounode/docs-nodejs/through2-map  

//   Documentation for through2-map has been installed along with learnyounode  
//   on your system and you can read them by pointing your browser here:  

//   file:///Users/softmaker/.nvm/versions/node/v18.12.1/lib/node_modules/learnyounode/docs/through2-map.html  

//   Check to see if your program is correct by running this command:  

//      $ learnyounode verify http-uppercaserer.js  

http = require('http');
const map = require('through2-map');

const port = process.argv[2];

const server = http.createServer((req, res) => {
    if (req.method !== 'POST') {
        return res.end('Send me a POST request\n');
    }

    req.pipe(map(chunk => chunk.toString().toUpperCase())).pipe(res);
});

server.listen(port, () => console.log(`Server listening on port ${port}`));

// 'use strict'
// const http = require('http')
// const map = require('through2-map')

// const server = http.createServer(function (req, res) {
//     if (req.method !== 'POST') {
//         return res.end('send me a POST\n')
//     }

//     req.pipe(map(function (chunk) {
//         return chunk.toString().toUpperCase()
//     })).pipe(res)
// })

// server.listen(Number(process.argv[2]))