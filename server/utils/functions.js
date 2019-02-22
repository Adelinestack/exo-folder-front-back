const fs = require('fs');
const rimraf = require('rimraf');

const folderContentByPath = folderPath => {
  return fs.readdirSync(`../foldertest${folderPath}`, { withFileTypes: true });
};

const fileContentByPath = filePath => {
  return fs.readFileSync(`../foldertest${filePath}`, 'utf8');
};

const deleteElement = (elementPath, elementType) => {
  if (elementType === 'File') {
    return fs.unlinkSync(`../foldertest${elementPath}`);
  } else {
    return rimraf.sync(`../foldertest${elementPath}`, { optn: 'rmdirSync' });
  }
};

const createElement = (elementPath, elementName, elementType) => {
  if (elementType === 'file') {
    fs.appendFileSync(
      `../foldertest${elementPath}/${elementName}`,
      `New file ${elementName} for test`,
      'utf8'
    );
  } else {
    fs.mkdirSync(`../foldertest${elementPath}/${elementName}`);
  }
};

module.exports = {
  folderContentByPath,
  fileContentByPath,
  deleteElement,
  createElement,
};
