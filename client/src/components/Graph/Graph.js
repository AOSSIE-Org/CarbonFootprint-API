import React from 'react';
import {Header} from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import visuals from '../data/availableVisuals.js';
import { UI_URL } from '../../config/config';
import './Graph.css';

class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
    const type = this.props.match.params.type;
    // check if graph is available
    for (let visual of visuals) {
      if (visual.link === type) {
        this.state = {
          visual
        }
      }
    }
  }

  render() {
    const isGraphAvailable = !!this.state.visual;
    // render the page if graph is available else redirect to 404 page
    return (
      <div>
      {isGraphAvailable ? (
        <div className="graph-div1">
          <div className="graph-card1">
            <iframe title="visual-link" src={`${UI_URL}/graphs/${this.state.visual.link}.html`} className="graph-iframe1"></iframe>
          </div>
          <Header as='h2' dividing>{this.state.visual.title}</Header>
          <p>{this.state.visual.longDescription}</p>
        </div>
      ) : (
        <Redirect to="/404" />
      )}
      </div>
    )
  }

}

export default Graph;