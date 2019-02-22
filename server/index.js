const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static('../client/build/'));
const {
  folderContentByPath,
  fileContentByPath,
  deleteElement,
  createElement,
} = require('./utils/functions');

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

app.delete('/getFolder', (req, res) => {
  const { elementPath, elementType } = req.query;
  const isElementDeleted = deleteElement(elementPath, elementType);
  if (typeof isElementDeleted === 'undefined') {
    res.sendStatus(200);
  } else {
    res.sendStatus(400);
  }
});

app.post('/getFolder', (req, res) => {
  const { elementPath, elementName, elementType } = req.body;
  createElement(elementPath, elementName, elementType);
  res.sendStatus(200);
});

const server = app.listen(8080, (req, res) => {
  console.log(`server started on ${server.address().port}`);
});
