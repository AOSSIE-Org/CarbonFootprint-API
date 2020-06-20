import React from 'react';
import './Body.css';

export default class Body extends React.Component {
  render() {
    return (
      <div className="body">
        <div className="child">
          {this.props.children}
        </div>
      </div>
    );
  }
}