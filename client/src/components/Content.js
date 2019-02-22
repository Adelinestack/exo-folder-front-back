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

const createElementOnServer = async (elementPath, elementName, elementType) =>
  await axios.post(`/getFolder`, {
    elementPath,
    elementName,
    elementType,
  });

const isElementCreated = async (elementPath, elementName, elementType) => {
  const { status: response } = await createElementOnServer(
    elementPath,
    elementName,
    elementType
  );
  return response;
};

export default class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      elementsList: [],
      elementToCreateName: '',
      creationResponse: 0,
      selectedType: 'folder',
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

  onInputChange = ({ target: { value: elementToCreateName } }) => {
    this.setState({
      elementToCreateName,
    });
  };

  async createElement(pathname) {
    const { elementToCreateName, selectedType } = this.state;
    const creationResponse = await isElementCreated(
      pathname,
      elementToCreateName,
      selectedType
    );
    this.setState({
      creationResponse,
      elementToCreateName: '',
    });
    this.fetchFolder(pathname);
  }

  handleOptionChange = ({ target: { value: selectedType } }) => {
    this.setState({
      selectedType,
    });
  };

  render() {
    const { elementsList, selectedType } = this.state;
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
          <h2>Create an element in {pathname}</h2>
          <input
            type="text"
            onChange={this.onInputChange.bind(this)}
            value={this.state.elementToCreateName}
          />
          <input
            type="radio"
            id="folder"
            name="type"
            value="folder"
            checked={selectedType === 'folder'}
            onChange={this.handleOptionChange.bind(this)}
          />
          <label htmlFor="folder">Folder</label>
          <input
            type="radio"
            id="file"
            name="type"
            value="file"
            checked={selectedType === 'file'}
            onChange={this.handleOptionChange.bind(this)}
          />
          <label htmlFor="file">File</label>
          <button onClick={this.createElement.bind(this, pathname)}>
            Create
          </button>
        </div>
        <p>{pathname}</p>
        <ul>{displayElements}</ul>
      </div>
    );
  }
}
