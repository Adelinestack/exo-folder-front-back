import React, { PureComponent } from 'react';
import Element from './Element';
import { getFolder, isElementCreated } from '../services/serverReq';
import {
  ElementList,
  CreationPart,
  NameInput,
  Type,
  Button,
  Path,
} from '../stylized/contentStyle';

export default class Content extends PureComponent {
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
        <CreationPart>
          <h2>
            Create an element in <Path>{pathname}</Path>
          </h2>
          <NameInput
            type="text"
            onChange={this.onInputChange.bind(this)}
            value={this.state.elementToCreateName}
          />
          <Type>
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
          </Type>
          <Button onClick={this.createElement.bind(this, pathname)}>
            Create
          </Button>
        </CreationPart>
        <p>
          You are in : <Path>{pathname}</Path>
        </p>
        <ElementList>{displayElements}</ElementList>
      </div>
    );
  }
}
