import React, { Component } from 'react';
import { Grid, Input, Select, Button, Header } from 'semantic-ui-react';
import { flightData, trainData, vehicleData, poultryData, appliancesData } from './UtilDatafetch';

export default class InputData extends Component {
  state = {
    value: null,
    params: [],
    data: {}
  };

  setValue = (e, { value }) => {
    this.setState({ value, params: [...paramSource[value].params] });
  };

  inputChange = e => {
    e.persist();

    this.setState(prev => {
      prev.data[e.target.id] = e.target.value;
      return prev;
    });

    this.props.changeCalculation(this.props.index, {
      data: this.state.data,
      value: this.state.value
    });
  };

  calculate = () => {
    const {
      origin,
      destination,
      type,
      model,
      passengers,
      mileage,
      mileage_unit,
      region,
      quantity,
      appliance,
      running_time
    } = this.state.data;
    switch (this.state.value) {
      case 0:
        appliancesData(this.props.apikey, appliance, type, region, quantity, running_time).then(
          data => {
            this.setState({ emissions: data.emissions });
            this.props.changeCalculation(this.props.index, {
              emissions: this.state.emissions.CO2
            });
          }
        );
        break;
      case 1:
        poultryData(this.props.apikey, type, region, quantity).then(data => {
          this.setState({ emissions: data.emissions });
          this.props.changeCalculation(this.props.index, {
            emissions: this.state.emissions.CO2
          });
        });
        break;
      case 2:
        flightData(this.props.apikey, origin, destination, type, model, passengers).then(data => {
          this.setState({ emissions: data.emissions });
          this.props.changeCalculation(this.props.index, {
            emissions: this.state.emissions.CO2
          });
        });
        break;
      case 3:
        vehicleData(this.props.apikey, origin, destination, type, mileage, mileage_unit).then(
          data => {
            this.setState({ emissions: data.emissions });
            this.props.changeCalculation(this.props.index, {
              emissions: this.state.emissions.CO2
            });
          }
        );
        break;
      case 4:
        trainData(this.props.apikey, origin, destination, type, passengers).then(data => {
          this.setState({ emissions: data.emissions });
          this.props.changeCalculation(this.props.index, {
            emissions: this.state.emissions.CO2
          });
        });
        break;
      default:
        console.log('no option');
        break;
    }
  };

  render() {
    const { params } = this.state;
    return (
      <Grid style={{ marginLeft: '15px', width: '100%' }}>
        <Grid.Row>
          <Grid.Column mobile={8} computer={7} tablet={7}>
            <Select
              fluid
              placeholder="Activity..."
              search
              selection
              onChange={this.setValue}
              options={options}
            />
          </Grid.Column>
          {this.state.emissions !== undefined && (
            <Grid.Column
              className="counter"
              style={{ paddingTop: '0.6rem', marginRight: '1.6rem' }}
              floated="right"
              mobile={4}
              computer={4}
              tablet={4}>
              <Header as="h3" style={{ width: '100px' }}>
                {this.state.emissions.CO2.toFixed(2)} kg
              </Header>
            </Grid.Column>
          )}
        </Grid.Row>
        <Grid.Row>
          <Grid doubling columns={3}>
            {params.map((comps, index) => (
              <Grid.Column key={index}>
                <Input
                  fluid
                  placeholder={`${comps}`}
                  id={comps}
                  onChange={this.inputChange}
                  style={{ marginTop: '-22px' }}
                />
              </Grid.Column>
            ))}
            {params.length !== 0 && (
              <Grid.Column style={{ marginTop: '-22px' }}>
                <Button
                  style={{ paddingRight: '10px', paddingLeft: '10px' }}
                  fluid
                  onClick={this.calculate}>
                  Calculate
                </Button>
              </Grid.Column>
            )}
          </Grid>
        </Grid.Row>
      </Grid>
    );
  }
}

const paramSource = [
  {
    title: 'appliances',
    params: ['appliance', 'type', 'region', 'quantity', 'runnning_time']
  },
  {
    title: 'poultry',
    params: ['type', 'region', 'quantity']
  },
  {
    title: 'flight',
    params: ['origin', 'destination', 'type', 'model', 'passengers']
  },
  {
    title: 'vehicle',
    params: ['type', 'origin', 'destination', 'mileage', 'mileage_unit']
  },
  {
    title: 'trains',
    params: ['type', 'origin', 'destination', 'passengers']
  }
];

const options = paramSource.map((i, index) => ({
  key: i.title,
  value: index,
  text: i.title.charAt(0).toUpperCase() + i.title.slice(1)
}));
