import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Element extends Component {
  render() {
    const { path, name, icon } = this.props;
    return (
      <li>
        <Link to={`${path}${name}`}>
          {icon} : {name}
        </Link>
      </li>
    );
  }
}
