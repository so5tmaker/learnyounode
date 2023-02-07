const fs = require('fs');
const path = require('path');
module.exports = (pathToFile, ext, callback) => {
    const data = [];
    fs.readdir(pathToFile, (err, list) => {
        if (err) return callback(err);
        for (const item of list) {
            if (path.extname(item) === '.' + ext) {
                data.push(item);
            }
        }
        callback(null, data);
    })
}