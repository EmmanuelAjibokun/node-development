// const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const fileOperations = async () => {
  try {
    // Read file
    const data = await fsPromises.readFile(path.join(__dirname, 'files', 'data.txt'), 'utf-8');
    console.log(data);
    await fsPromises.unlink(path.join(__dirname, 'files', 'data.txt')); // delete a file
    await fsPromises.writeFile(path.join(__dirname, 'files', 'promiseWrite.txt'), data);
    await fsPromises.appendFile(path.join(__dirname, 'files', 'promiseWrite.txt'), '\n\nIt\'s so good to see you again');
    await fsPromises.rename(path.join(__dirname, 'files', 'promiseWrite.txt'), path.join(__dirname, 'files', 'rePromiseWrite.txt')); // rename a file
    const newData = await fsPromises.readFile(path.join(__dirname, 'files', 'rePromiseWrite.txt'), 'utf-8');
    console.log(newData);
  } catch (err) {
    console.error(err)
  }
}
fileOperations();

// fs.readFile(path.join(__dirname, 'files', 'data.txt'), 'utf-8', (err, data) => {
//   if (err) {
//     console.error('Error reading file:', err);
//     return;
//   }
//   console.log('File content:', data);
// });

// fs.writeFile(path.join(__dirname, 'files', 'data.txt'),'Nice to meet you manny', (err) => {
//   if (err) {
//     console.error('Error reading file:', err);
//     return;
//   }
//   console.log('write file successfully');
//   fs.appendFile(path.join(__dirname, 'files', 'data.txt'),'\n\nYes, hello to you more', (err) => { // Update the file with new content
//     if (err) {
//       console.error('Error reading file:', err);
//       return;
//     }
//     console.log('append file successfully');
//   });
// });

process.on('uncaughtException', err => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});