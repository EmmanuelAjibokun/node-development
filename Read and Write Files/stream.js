// This aids monolithic operation a file
const fs = require('fs');
const path = require('path');

const rs = fs.createReadStream(path.join(__dirname, 'files', 'test.txt'), {encoding: 'utf8'});

const ws = fs.createWriteStream(path.join(__dirname, 'files', 'new-lorem.txt'));

// rs.on('data', (dataChunk) => {
//     ws.write(dataChunk);
// })
rs.pipe(ws);