// READ THE INSTRUCTIONS CAREFULLY!!!
// AND WRITE MAIN POINTS DOWN IN THE COPYBOOK USING PENCIL!!!

// ## HTTP FILE SERVER(Exercise 11 of 13)  

//   Create a file named http-file-server.js.  

//   Write an HTTP server that serves the same text file for each request it  
//   receives.  

//   Your server should listen on the port provided by the first argument to  
//   your program.  

//   You will be provided with the location of the file to serve as the second
//   command-line argument. You must use the fs.createReadStream() method to  
//   stream the file contents to the response.  

// ## HINTS  

//   Because we need to create an HTTP server for this exercise rather than a  
//   generic TCP server, we should use the http module from Node core. Like the  
//   net module, http also has a method named http.createServer() but this one  
//   creates a server that can talk HTTP.

//   http.createServer() takes a callback that is called once for each  
//   connection received by your server. The callback function has the
//   signature:

//   function callback(request, response) { /* ... */ }  

//   Where the two arguments are objects representing the HTTP request and the  
//   corresponding response for this request. request is used to fetch
//   properties, such as the header and query - string from the request while  
//   response is for sending data to the client, both headers and body.  

//   Both request and response are also Node streams! Which means that you can  
//   use the streaming abstractions to send and receive data if they suit your
//   use-case.

//   http.createServer() also returns an instance of your server. You must call
//   server.listen(portNumber) to start listening on a particular port.  

//   A typical Node HTTP server looks like this:

const http = require('http');
const fs = require('fs');
const port = process.argv[2];
const file = process.argv[3];
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    fs.createReadStream(file).pipe(res);
})

server.listen(Number(port), () => console.log('Server listening on port: ' + port));

//   Documentation on the http module can be found by pointing your browser
//   here:
//   file:///Users/softmaker/.nvm/versions/node/v18.12.1/lib/node_modules/learnyounode/docs-nodejs/http.html  

//   The fs core module also has some streaming APIs for files. You will need  
//   to use the fs.createReadStream() method to create a stream representing  
//   the file you are given as a command - line argument.The method returns a  
//   stream object which you can use src.pipe(dst) to pipe the data from the  
//   src stream to the dst stream.In this way you can connect a filesystem  
//   stream with an HTTP response stream.  

//   Check to see if your program is correct by running this command:  

//      $ learnyounode verify http-file-server.js  

//  # PASS Your solution to HTTP FILE SERVER passed!

//  Here's the official solution in case you want to compare notes:

// ─────────────────────────────────────────────────────────────────────────────

// 'use strict'
// const http = require('http')
// const fs = require('fs')

// const server = http.createServer(function (req, res) {
//     res.writeHead(200, { 'content-type': 'text/plain' })

//     fs.createReadStream(process.argv[3]).pipe(res)
// })

// server.listen(Number(process.argv[2]))

// ────────────────────────────────────────────────────────────────────────────

const express = require('node:express');
const multer = require('node:multer');
const zlib = require('node:zlib');
const fsp = require('node:fs').promises;
const path = require('node:path')

const app = express();

// Set the destination folder for uploaded files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        const originalName = file.originalname;
        const extension = path.extname(originalName);
        const fileName = path.basename(originalName, extension);
        cb(null, `${fileName}.gz`);
    }
});

// Create a multer instance with the configured storage options
const upload = multer({ storage });

// Define a route for handling the POST request
app.post('/upload', upload.single('pdfFile'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    // Read the uploaded .gz file
    const filePath = path.join(__dirname, 'uploads', req.file.filename);

    try {
        // Create a read stream to read the contents of the uploaded .gz file
        const readStream = await fsp.createReadStream(filePath);

        // Create a write stream for writing the decompressed data
        const outputFilePath = path.join(__dirname, 'uploads', 'decompressed.pdf');
        const writeStream = await fsp.createWriteStream(outputFilePath);

        // Pipe the read stream through the gunzip transform and write to the output file
        await new Promise((resolve, reject) => {
            readStream
                .pipe(zlib.createGunzip())
                .pipe(writeStream)
                .on('finish', resolve)
                .on('error', reject);
        });

        console.log('File decompressed successfully');

        // Delete the uploaded .gz file
        await fsp.unlink(filePath);

        res.send('File uploaded and decompressed successfully');
    } catch (error) {
        console.error('Error during file decompression:', error);
        res.status(500).json({ error: 'File decompression failed' });
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
