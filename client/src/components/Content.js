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

export default class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      elementsList: [],
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

  render() {
    const { elementsList } = this.state;
    const displayElements = elementsList.map(element => {
      if (element.isDir === true) {
        return (
          <Element
            path={this.props.location.pathname}
            name={`${element.name}/`}
            icon={'Folder'}
            key={`${element.name}${Date.now()}`}
          />
        );
      } else if (element.content) {
        return <div>{element.content}</div>;
      } else
        return (
          <Element
            path={this.props.location.pathname}
            name={element.name}
            icon={'File'}
            key={`${element.name}${Date.now()}`}
          />
        );
    });
    return (
      <div>
        <p>{this.props.location.pathname}</p>
        <ul>{displayElements}</ul>
      </div>
    );
  }
}
