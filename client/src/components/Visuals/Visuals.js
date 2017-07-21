import React from 'react';
import {Grid, Card, Icon} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import {Header} from 'semantic-ui-react';
import data from '../data/availableVisuals.js';

export default class Visuals extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header as='h2' dividing>Data Visualisations</Header>
        <Grid columns={4}>
          <Grid.Row>
            {data.map(graph => (
              <Grid.Column key={graph.name}>
              <Link to={`/visuals/${graph.link}`}>
                <Card>
                  <Card.Content header={graph.name}/>
                  <Card.Content description={graph.shortDescription}/>
                </Card>
              </Link>
            </Grid.Column>
            ))}
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}
