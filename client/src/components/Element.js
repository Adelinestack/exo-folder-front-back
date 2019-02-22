import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { isElementDeleted } from '../services/serverReq';
import { Li, Button, LinkElement } from '../stylized/elementStyle';

export default class Element extends PureComponent {
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
        <Li>
          <Link to={`${path}${name}`}>
            <LinkElement type={type}>
              {type} : {name}
            </LinkElement>
          </Link>
          <Button
            onClick={this.deleteElement.bind(this, `${path}${name}`, type)}
          >
            Delete
          </Button>
        </Li>
      ) : deletedResponse === 200 ? (
        <Li>
          <p>
            {type} : {name} DELETED
          </p>
        </Li>
      ) : (
        <Li>
          <Button
            onClick={this.deleteElement.bind(this, `${path}${name}`, type)}
          >
            Delete
          </Button>
          <p>NOT DELETED</p>
        </Li>
      );

    return deletePart;
  }
}
