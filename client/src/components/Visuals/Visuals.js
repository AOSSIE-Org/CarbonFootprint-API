import React from 'react';
import {Grid, Card} from 'semantic-ui-react';
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
        <Grid centered textAlign="center" columns={4}>
          <Grid.Row>
            {data.map(graph => (
              <Grid.Column key={graph.name} mobile={16} tablet={4} computer={4}>
              <Link to={`/visuals/${graph.link}`}>
                <Card fluid raised style={{marginTop: '30px'}}>
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
