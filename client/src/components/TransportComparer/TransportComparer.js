import React, { Component } from 'react';
import {
  Grid,
  Form,
  Button,
  Header
} from 'semantic-ui-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label
} from 'recharts';
import './TransportComparer.css';

// Remove this sampleData once the API's response is wired up
const sampleData = [
    { name: 'CO2', VEHICLE: 3000, AIRPLANE: 5000, TRAIN: 4000 },
    { name: 'CH4', VEHICLE: 1000, AIRPLANE: 9000, TRAIN: 3850 },
    { name: 'NO2', VEHICLE: 2500, AIRPLANE: 3200, TRAIN: 2900 }
  ],
  dataKeys = ['VEHICLE', 'AIRPLANE', 'TRAIN'],
  barColors = ['#6610f2', '#e83e8c', '#fd7e14'];

export default class TransportComparer extends Component {
  constructor (props) {
    super(props);

    this.state = {
      origin: '',
      destination: '',
      passengers: 0,
      mileage: 0,
      data: sampleData,
      isGraphAvailable: false,
      isLoading: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleCalculate = this.handleCalculate.bind(this);
  }

  toggleGraph (isEnabled) {
    this.setState({
      isLoading: !isEnabled,
      isGraphAvailable: isEnabled
    })
  }

  handleCalculate () {
    // Do not call the API again in case it is already loading
    if (this.state.isLoading) {
      return;
    }

    // Disabled the graph and enable loading
    this.toggleGraph(false);

    // Replace setTimeout with the actual fetching function
    setTimeout(() => {
      this.toggleGraph(true);
    }, 1000);
  }

  handleChange (field, event) {
    this.setState({ [field]: event.target.value });
  }

  // Generates form items
  renderFormItems () {
    let formItems = [
      { key: 'Origin', isRequired: true },
      { key: 'Destination', isRequired: true },
      { key: 'Passengers', isRequired: true },
      { key: 'Mileage', isRequired: false },
    ];

    return formItems.map((item, index) => {
      return (
        <Form.Field key={index}>
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column
                width={1}
                className="transport-column transport-labelContainer"
              >
                <label>
                  {item.key}
                  {item.isRequired && <sup className="transport-required">*</sup>}
                </label>
              </Grid.Column>
              <Grid.Column
                width={3}
                className="transport-column"
              >
                <input
                  placeholder={item.key}
                  className="transport-inputItem"
                  value={this.state[item.key.toLowerCase()] || ''}
                  onChange={this.handleChange.bind(this, item.key.toLowerCase())}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form.Field>
      );
    });
  }

  // Generates the bars for BarChart
  renderBars () {
    return dataKeys.map((item, index) => {
      return (
        <Bar
          key={index}
          dataKey={item}
          fill={barColors[index]}
          minPointSize={5}
        />
      );
    });
  }

  getBarChartRects () {
    let barChartHeight = window.innerHeight * 0.65,
      barChartWidth = window.innerWidth * 0.7;

    // Fallback height and width for mobile devices
    barChartHeight = barChartHeight < 300 ? 300 : barChartHeight;
    barChartWidth = barChartWidth < 250 ? 250 : barChartWidth;

    return { barChartHeight, barChartWidth };
  }

  render () {
    const { barChartWidth, barChartHeight } = this.getBarChartRects();

    return (
      <div className="transport-container">
        <Header className="transport-heading" as='h4'>
          <Header.Content>
            Transport Comparer
          </Header.Content>
        </Header>
        <Form className="transport-form">
          <Form.Group className="transport-formGroup">
            {this.renderFormItems()}
          </Form.Group>
        </Form>
        <Button onClick={this.handleCalculate}>
          Calculate
        </Button>
        {
          this.state.isLoading &&
            <div className="transport-loadingContainer">
              <div className="transport-loading">Loading...</div>
            </div>
        }
        {
          this.state.isGraphAvailable &&
            <BarChart
              className="transport-barChartContainer"
              layout='vertical'
              width={barChartWidth}
              height={barChartHeight}
              data={this.state.data}
              margin={{top: 8, right: 8, left: 18, bottom: 18}}
            >
              <Legend
                verticalAlign='top'
                align='left'
              />
              <CartesianGrid strokeDasharray='3 3'/>
              <XAxis type='number' >
                <Label
                  value='Emissions in kg'
                  position='bottom'
                />
              </XAxis>
              <YAxis
                dataKey='name'
                type='category'
                label={{ value: 'Type of emission', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip/>
              {this.renderBars()}
            </BarChart>
        }
      </div>
    );
  }
}

const styles = {
  container: {
    marginLeft: '15px'
  },
  heading: {
    color: '#626364'
  },
  column: {
    minWidth: '120px'
  },
  form: {
    marginLeft: '18px'
  },
  formGroup: {
    flexDirection: 'column'
  },
  labelContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  required: {
    color: '#dc3545'
  },
  inputItem: {
    margin: '4px'
  },
  loadingContainer: {
    width: '100%',
    height: '80vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  loading: {
    fontSize: '24px'
  },
  barChartContainer: {
    display: 'flex',
    cursor: 'default',
    width: '100%',
    height: '80vh',
    background: '#fff',
    backgroundImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAGElEQVQYV2NkYGCQYmBgeMYABYwwBvECAD1WAQVZi1QaAAAAAElFTkSuQmCC)',
    backgroundRepeat: 'repeat',
    backgroundSize: '7px',
    marginTop: '16px',
    boxShadow: '1px 1px 5px #bbb',
    position: 'relative'
  }
};
