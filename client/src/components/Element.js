import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const deleteElementFromServer = async (elementPath, elementType) =>
  await axios.delete(`/getFolder`, {
    params: {
      elementPath,
      elementType,
    },
  });

const isElementDeleted = async (elementPath, elementType) => {
  const { status: response } = await deleteElementFromServer(
    elementPath,
    elementType
  );
  return response;
};

export default class Element extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deletedResponse: 0,
    };
  }

  async deleteElement(elementPath, elementType) {
    const deletedResponse = await isElementDeleted(elementPath, elementType);
    this.setState({
      deletedResponse,
    });
  }

  render() {
    const { path, name, type } = this.props;
    const { deletedResponse } = this.state;
    const deletePart =
      deletedResponse === 0 ? (
        <div>
          <Link to={`${path}${name}`}>
            {type} : {name}
          </Link>
          <button
            onClick={this.deleteElement.bind(this, `${path}${name}`, type)}
          >
            Delete
          </button>
        </div>
      ) : deletedResponse === 200 ? (
        <p>
          {type} : {name} DELETED
        </p>
      ) : (
        <div>
          <button
            onClick={this.deleteElement.bind(this, `${path}${name}`, type)}
          >
            Delete
          </button>
          <p>NOT DELETED</p>
        </div>
      );

    return <li>{deletePart}</li>;
  }
}
