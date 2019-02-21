const express = require('express');
const app = express();
const fs = require('fs');

app.use('/', express.static('../client/build/'));

const folderContentByPath = folderPath => {
  return fs.readdirSync(`../foldertest${folderPath}`, { withFileTypes: true });
};

const fileContentByPath = filePath => {
  return fs.readFileSync(`../foldertest${filePath}`, 'utf8');
};

app.get('/getFolder', (req, res) => {
  const path = req.query.folderPath;
  if (fs.statSync(`../foldertest${path}`).isFile()) {
    const contentFile = fileContentByPath(path);
    res.send([{ content: contentFile }]);
  } else {
    const readFolder = folderContentByPath(path);
    const contentFolder = readFolder.map(element => ({
      name: element.name,
      isDir: element.isDirectory(),
    }));
    res.send(contentFolder);
  }
});

const server = app.listen(8080, (req, res) => {
  console.log(`server started on ${server.address().port}`);
});
