import React, { Component } from 'react';
import { Grid, Input, Select, Button, Header, Dropdown, Message } from 'semantic-ui-react';
import { flightData, trainData, vehicleData, poultryData, appliancesData } from './UtilDatafetch';
import './Profile.css';

export default class InputData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
      params: [],
      data: {},
      loading: false,
      requiredFields: ['origin', 'destination'],
      errorMessage: "",
      errorActive: false
    };
  }

  setValue = (e, { value }) => {
    this.setState({ value, params: [...this.paramSource[value].params] });
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
          if (data.success) {
            this.setState({ emissions: data.emissions, errorMessage: "", loading: false });
            this.props.changeCalculation(this.props.index, {
              emissions: this.state.emissions.CO2
            });
          }
          else {
            this.setState({ emissions: undefined, errorMessage: data.message, loading: false });
          }
        });
        break;
      case 1:
        poultryData(this.props.apikey, type, region, quantity).then(data => {
          if (data.success) {
            this.setState({ emissions: data.emissions, loading: false, errorMessage: "" });
            this.props.changeCalculation(this.props.index, {
              emissions: this.state.emissions.CO2
            });
          }
          else {
            this.setState({ emissions: undefined, errorMessage: data.message, loading: false });
          }
        });
        break;
      case 2:
        flightData(this.props.apikey, origin, destination, type, model, passengers).then(data => {
          if (data.success) {
            this.setState({ emissions: data.emissions, loading: false, errorMessage: "" });
            this.props.changeCalculation(this.props.index, {
              emissions: this.state.emissions.CO2
            });
          }
          else {
            this.setState({ emissions: undefined, errorMessage: data.message, loading: false });
          }
        });
        break;
      case 3:
        vehicleData(this.props.apikey, origin, destination, type, mileage).then(
          data => {
            if (data.success) {
              this.setState({ emissions: data.emissions, errorMessage: "", loading: false });
              this.props.changeCalculation(this.props.index, {
                emissions: this.state.emissions.CO2
              });
            }
            else {
              this.setState({ emissions: undefined, errorMessage: data.message, loading: false });
            }
          });
        break;
      case 4:
        trainData(this.props.apikey, origin, destination, type, passengers).then(data => {
          if (data.success) {
            this.setState({ emissions: data.emissions, loading: false, errorMessage: "" });
            this.props.changeCalculation(this.props.index, {
              emissions: this.state.emissions.CO2
            });
          }
          else {
            this.setState({ emissions: undefined, errorMessage: data.message, loading: false });
          }
        });
        break;
      default:
        this.setState({ loading: false })
        console.log('no option');
        break;
    }
  };

  render() {
    // console.log(this.state.errorMessage);
    const { params, loading } = this.state;
    return (
      <Grid className="input-grid">
        <Grid.Row>
          <Grid.Column mobile={8} computer={7} tablet={7}>
            <Select
              fluid
              placeholder="Activity..."
              search
              selection
              onChange={this.setValue}
              options={this.options}
            />
          </Grid.Column>
          {this.state.emissions !== undefined && (
            <Grid.Column
              className="counter column-emission-value"
              floated="right"
              mobile={4}
              computer={4}
              tablet={4}>
              <Header as="h3" className="input-header">
                {this.state.emissions.CO2.toFixed(2)} kg
              </Header>
            </Grid.Column>
          )}
        </Grid.Row>
        <Grid.Row>
          <Grid doubling columns={3}>
            {params.map((comps, index) => (
              <Grid.Column key={index}>
                {(this.paramSource[this.state.value][comps]) ? (
                  <Dropdown
                    defaultOpen={true}
                    fluid
                    selection
                    placeholder={`${comps}`}
                    id={comps}
                    onChange={(e, comps) => { this.inputChange(e, comps) }}
                    options={this.paramSource[this.state.value][comps]}
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
              <Grid.Column className="column-calculate">
                <Button
                  className="profile-button"
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
  paramSource = [
    {
      title: 'appliances',
      params: ['appliance', 'region', 'quantity', 'runnning_time'],
      appliance: this.props.rawdata.applianceTypes.map((i, index) => ({
        key: index,
        value: index,
        text: i
      })),
    },
    {
      title: 'poultry',
      params: ['type', 'region', 'quantity'],
      type: this.props.rawdata.poultryTypes.map((i, index) => ({
        key: index,
        value: index,
        text: i
      })),
    },
    {
      title: 'flight',
      params: ['origin', 'destination', 'type', 'model', 'passengers'],
      model: this.props.rawdata.flightTypes.map((i, index) => ({
        key: index,
        value: index,
        text: i
      })),
    },
    {
      title: 'vehicle',
      params: ['type', 'origin', 'destination', 'mileage'],
      type: this.props.rawdata.vehicleTypes.map((i, index) => ({
        key: index,
        value: index,
        text: i
      })),
    },
    {
      title: 'trains',
      params: ['type', 'origin', 'destination', 'passengers'],
      type: this.props.rawdata.trainTypes.map((i, index) => ({
        key: index,
        value: index,
        text: i
      })),
    }
  ];

  options = this.paramSource.map((i, index) => ({
    key: i.title,
    value: index,
    text: i.title.charAt(0).toUpperCase() + i.title.slice(1)
  }));
}

