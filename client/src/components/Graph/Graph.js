import React from 'react';
import {Header} from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import visuals from '../data/availableVisuals.js';

const isVisualAvailable = type => {
  for (visual of visuals) {
    if (visual.link === type) {
      return visual;
    }
  }
  return false;
}

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
        <div style={{
          width: "100%"
        }}>
          <div style={styles.card}>
            <iframe src={`/graphs/${this.state.visual.link}.html`} width="100%" height="100%" style={{
              "border": "none"
            }}></iframe>
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
const styles = {
  card: {
    width: "100%",
    height: "80vh",
    background: '#fff',
    backgroundImage: "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAGElEQVQYV2NkYGCQYmBgeMYABYwwBvECAD1WAQVZi1QaAAAAAElFTkSuQmCC)",
    backgroundRepeat: "repeat",
    backgroundSize: "7px",
    boxShadow: "1px 1px 5px #bbb",
    position: "relative"
  }
};
