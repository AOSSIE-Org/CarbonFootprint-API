import React from 'react';
import { Grid, Card, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'


export default class Visuals extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <Grid columns={3}>
            <Grid.Row>
            <Grid.Column>
               <Link to="/electricity" >
                <Card>
                    <Card.Content header='Electricity &#x26A1; ' />
                    <Card.Content description="Get to see all the emissions due to electricity generation all over the world." />

                    </Card> </Link>
  </Grid.Column> 
  <Grid.Column>
  <Link to="/percapita" ><Card>
    <Card.Content header='Per Capita &#x1F464;' />
    <Card.Content description="See the average CO2 emitted by each person in various countries over the past years." />

  </Card></Link>
</Grid.Column>
<Grid.Column>
  <Link to="/flights" ><Card>
    <Card.Content header='Airplanes &#x1F6E9;' />
    <Card.Content description="Get to see the emissions of an airplane model of all kinds." />

  </Card></Link>
</Grid.Column>
</Grid.Row>
</Grid>
        );
    }
}
