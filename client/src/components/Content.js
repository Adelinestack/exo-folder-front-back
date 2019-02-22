import React, { Component } from 'react';
import Element from './Element';
import axios from 'axios';

const getFolderFromServer = async folderPath =>
  await axios.get(`/getFolder`, {
    params: {
      folderPath,
    },
  });

const getFolder = async folderPath => {
  const contentFolder = await getFolderFromServer(folderPath);
  return contentFolder;
};

const createFileOnServer = async (filePath, fileName) =>
  await axios.post(`/getFolder`, {
    filePath,
    fileName,
  });

const isFileCreated = async (filePath, fileName) => {
  const { status: response } = await createFileOnServer(filePath, fileName);
  return response;
};

export default class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      elementsList: [],
      fileToCreateName: '',
      creationResponse: 0,
    };
  }

  componentDidMount() {
    this.fetchFolder(this.props.location.pathname);
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.fetchFolder(this.props.location.pathname);
    }
  }

  async fetchFolder(folderPath) {
    const { data: elementsList } = await getFolder(folderPath);
    this.setState({
      elementsList,
    });
  }

  onInputChange({ target: { value: fileToCreateName } }) {
    this.setState({
      fileToCreateName,
    });
  }

  async createFile(pathname) {
    const creationResponse = await isFileCreated(
      pathname,
      this.state.fileToCreateName
    );
    this.setState({
      creationResponse,
    });
  }

  render() {
    const { elementsList } = this.state;
    const { pathname } = this.props.location;
    const displayElements = elementsList.map(element => {
      if (element.isDir === true) {
        return (
          <Element
            path={pathname}
            name={`${element.name}/`}
            type={'Folder'}
            key={`${element.name}${Date.now()}`}
          />
        );
      } else if (element.content) {
        return <div>{element.content}</div>;
      } else
        return (
          <Element
            path={pathname}
            name={element.name}
            type={'File'}
            key={`${element.name}${Date.now()}`}
          />
        );
    });
    return (
      <div>
        <div>
          <h2>Create a file in {pathname}</h2>
          <input type="text" onChange={this.onInputChange.bind(this)} />
          <button onClick={this.createFile.bind(this, pathname)}>Create</button>
        </div>
        <p>{pathname}</p>
        <ul>{displayElements}</ul>
      </div>
    );
  }
}
