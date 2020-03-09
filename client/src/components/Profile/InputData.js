import React, { Component } from 'react';
import { Grid, Input, Select, Button, Header, Dropdown, Message } from 'semantic-ui-react';
import { flightData, trainData, vehicleData, poultryData, appliancesData } from './UtilDatafetch';
import { vehicleType } from "../../rawdata/vehicle.json";

export default class InputData extends Component {
  state = {
    value: null,
    params: [],
    data: {},
    loading: false,
    requiredFields: ['origin', 'destination'],
    errorMessage: "",
    errorActive: false
  };

  setValue = (e, { value }) => {
    this.setState({ value, params: [...paramSource[value].params] });
  };

  inputChange = (e, comps) => {
    e.persist();

    this.setState(prev => {
      prev.data[e.target.id || comps.id] = e.target.value || e.target.textContent;
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
      region,
      quantity,
      appliance,
      running_time
    } = this.state.data;
    this.setState({ loading: true });
    switch (this.state.value) {
      case 0:
        appliancesData(this.props.apikey, appliance, quantity, running_time, region).then(data => {
          this.setState({ emissions: data.emissions });
          this.props.changeCalculation(this.props.index, {
            emissions: this.state.emissions.CO2
          });
        }
        );
        break;
      case 1:
        poultryData(this.props.apikey, type, region, quantity).then(data => {
          this.setState({ emissions: data.emissions, loading: false });
          this.props.changeCalculation(this.props.index, {
            emissions: this.state.emissions.CO2
          });
        });
        break;
      case 2:
        flightData(this.props.apikey, origin, destination, type, model, passengers).then(data => {
          this.setState({ emissions: data.emissions, loading: false });
          this.props.changeCalculation(this.props.index, {
            emissions: this.state.emissions.CO2
          });
        });
        break;
      case 3:
        {
          if (origin && destination) {
            vehicleData(this.props.apikey, origin, destination, type, mileage).then(
              data => {
                console.log(data)
                if (data.success) {
                  this.setState({ emissions: data.emissions, errorMessage: "" });
                  this.props.changeCalculation(this.props.index, {
                    emissions: this.state.emissions.CO2
                  });
                }
                else {
                  this.setState({ emissions: undefined, errorMessage: "Unable to locate your position" });
                }
              }
            ).catch(err => console.log(err))
          }
          else this.setState({ errorActive: true })
          break;
        }
      case 4:
        trainData(this.props.apikey, origin, destination, type, passengers).then(data => {
          this.setState({ emissions: data.emissions, loading: false });
          this.props.changeCalculation(this.props.index, {
            emissions: this.state.emissions.CO2
          });
        });
        break;
      default:
        this.setState({ loading: false })
        console.log('no option');
        break;
    }
  };

  render() {
    const { params, loading } = this.state;
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
                {(paramSource[this.state.value][comps]) ? (
                  <Dropdown
                    defaultOpen={true}
                    fluid
                    selection
                    placeholder={`${comps}`}
                    id={comps}
                    onChange={(e, comps) => { this.inputChange(e, comps) }}
                    options={paramSource[this.state.value][comps]}
                    style={{ marginTop: '-22px' }}
                  />
                )
                  : (<Input
                    error={((this.state.requiredFields.includes(comps)) && !this.state.data[comps] && this.state.errorActive) ? true : false}
                    fluid
                    placeholder={`${comps}`}
                    id={comps}
                    onChange={this.inputChange}
                    style={{ marginTop: '-22px' }}
                  />
                  )}
              </Grid.Column>
            ))}
            {params.length !== 0 && (
              <Grid.Column style={{ marginTop: '-22px' }}>
                <Button
                  style={{ paddingRight: '10px', paddingLeft: '10px' }}
                  fluid
                  disabled={loading}
                  loading={loading}
                  onClick={this.calculate}>
                  Calculate
                </Button>
              </Grid.Column>
            )}
          </Grid>
        </Grid.Row>
        {(this.state.errorMessage) ? (<Message color='red' >{this.state.errorMessage}</Message>) : null}
      </Grid>
    );
  }
}

const paramSource = [
  {
    title: 'appliances',
    params: ['appliance', 'quantity', 'running_time', 'region']
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
    params: ['type', 'origin', 'destination', 'mileage'],
    type: vehicleType.map((i, index) => ({
      key: index,
      value: index,
      text: i
    })),
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
