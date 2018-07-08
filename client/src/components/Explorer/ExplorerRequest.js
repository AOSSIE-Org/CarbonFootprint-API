import React, { Component } from 'react';
import {
  Segment,
  Form,
  Header,
  Button,
  Input,
  Divider,
  Search,
  Responsive,
  Grid
} from 'semantic-ui-react';
import { getKey } from '../Profile/profileController';
import axios from 'axios';
import _ from 'lodash';

const BASE_URL = (process.env.NODE_ENV == 'production') ? 'https://carbonhub.xyz/v1/' : 'http://localhost:3080/v1/';

/* Extended react.Component class as ExplorerRequest */
export default class ExplorerRequest extends Component {

  /**
   * Constructor for the ExplorerRequest class
   * @constructor extends react.Component
   */
  constructor(props) {
    super(props);
    this.state = {
      key: false,
      method: options[1].value,
      url: '',
      urlParams: [],
      isLoading: false,
      paramResults: []
    };
    this.executeQuery = this.executeQuery.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleResultSelect = this.handleResultSelect.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  /**
   * Function to handle the change in input.
   * @param {object} event Event Object
   * @param {object} data Data Object
   */
  handleChange(event, data) {
    let value = event.target.value || data.value;
    let key = event.target.name || data.name;
    this.setState({[key]: value});
  }

  /**
   * Function to handle the result of selected url.
   * @param {object} event Event Object
   * @param {object} result Result Object
   */
  handleResultSelect(event, { result }) {
    if(result.title) {
      this.setState({url: result.title, urlParams: result.params});
      this.props.paramsUpdate(result.params);
    }
  }

  /**
   * Function to handle the search of url.
   * @param {object} event Event Object
   */
  handleSearchChange(event) {
    let value = event.target.value;
    this.setState({isLoading: true, url: value});
    setTimeout(() => {
      if (this.state.url.length < 1) return this.resetComponent();

      const re = new RegExp(_.escapeRegExp(this.state.url), 'i');
      const isMatch = result => re.test(result.title);

      this.setState({
        isLoading: false,
        paramResults: _.filter(paramSource, isMatch),
      })
    }, 300)
  }

  /**
   * Function to execute the query.
   */
  executeQuery() {
    this.props.handleURL(this.state.url);
    if (this.state.url && this.props.query && this.state.method) {
      axios({
        method: this.state.method,
        url: BASE_URL + this.state.url,
        data: this.props.query,
        headers: {
          'access-key': this.state.key,
          'Content-type': 'application/json'
        }
      }).then(response => {
        this.props.handleResponse(response.data);
      })
    }
  };

  /**
   * Function to reset the react component
   */
  resetComponent() {
    this.setState({isLoading: false, paramResults: [], url: ''});
  }

  /**
   * Inherit function from react.Component to handle after mounting
   * react component
   */
  componentDidMount() {
    getKey().then(data => {
      if (data.success) {
        this.setState({key: data.apikey});
      }
    });
    this.resetComponent();
  }

  /**
   * Inherited function from react.Component to render to DOM object into html
   */
  render() {
    const { isLoading, url, paramResults, key } = this.state;
    return (
        <Responsive as={Segment} raised>
          <Header style={styles.heading} as="h4">
            <Header.Content>
              API Explorer
            </Header.Content>
          </Header>
          <Divider />
          <Grid textAlign='left'>
            <Grid.Row>
              <Grid.Column width={16}>
              <Input label={{basic: true, content: 'API Key: '}}
                     labelPosition='left'
                     style={styles.inputKey}
                     value={key ? key : "Go to the profile page and generate one API Key"}
                     fluid
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={3} mobile={16} tablet={3} computer={3}>
                <Form.Dropdown
                    name="method"
                    options={options}
                    defaultValue={options[1].value}
                    style={styles.dropdown}
                    selection
                    className='label'
                    onChange={this.handleChange}
                />
              </Grid.Column>
              <Grid.Column width={3} mobile={16} tablet={10} computer={3}>
                <label style={styles.label}>{BASE_URL}</label>
              </Grid.Column>
              <Grid.Column width={5} mobile={16} tablet={10} computer={5}>
                <Search
                    input={{ fluid: true }}
                    loading={isLoading}
                    onResultSelect={this.handleResultSelect}
                    onSearchChange={_.debounce(this.handleSearchChange, 500, {leading: true})}
                    results={paramResults}
                    value={url}
                    {...this.props}
                />
              </Grid.Column>
              <Grid.Column width={5} mobile={16} tablet={3} computer={5}>
                <Button
                    content='RUN'
                    onClick={this.executeQuery}
                    size='small'
                    primary
                    style={styles.buttonRun}
                    fluid
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Responsive>
    );
  }
}

const options = [
  {text: 'GET', value: 'get'},
  {text: 'POST', value: 'post'},
  {text: 'PUT', value: 'put'},
  {text: 'DELETE', value: 'delete'}
];

const styles = {
  dropdown: {
    fontWeight: 'bold',
    color: '#2980b9'
  },
  heading: {
    marginLeft: '15px',
    color: '#626364'
  },
  buttonGetKey: {
    backgroundColor: '#F6F7F9',
    height: '38px'
  },
  buttonRun: {
    height: '38px'
  },
  inputKey: {
    color: '#626364'
  },
  label: {
    backgroundColor: 'white',
    color: '#2980b9',
    fontSize: '16px'
  }
};
const details = {
  flight: {
    "origin": "DEL",
    "destination": "JFK",
    "type": "international",
    "model": "A380",
    "passengers": 840
  }
};

//Example data which is default if data is not provided

const example = {
  "appliances": {
    "appliance": "Water heater",
    "type": "instantaneous",
    "region": "India",
    "quantity": 1,
    "runnning_time": 3
  },
  "emissions": {
    "item": "electricity",
    "region": "india",
    "unit": "kWh",
    "quantity": 1.564
  },
  "poultry": {
    "type": "Broiler chicken",
    "region": "British columbia",
    "quantity": 3
  },
  "quantity": {
    "item": "lamp",
    "region": "ohio",
    "emission": 91
  },
  "flight": {
    "origin": "DEL",
    "destination": "JFK",
    "type": "international",
    "model": "A380",
    "passengers": 840
  },
  "vehicle": {
    "type": "Petrol",
    "origin": "Bhubaneswar",
    "destination": "Cuttack",
    "mileage": 50,
    "mileage_unit": "km/l"
  },
  "trains": {
    "type": "railcars",
    "origin": "Bhubaneswar",
    "destination": "Delhi",
    "passengers": 10
  }
};

const paramSource= [
  {
    title: "appliances",
    params: [
      "appliance",
      "type",
      "region",
      "quantity",
      "runnning_time"
    ]
  },
  {
    title: "emissions",
    params: [
      "item",
      "region",
      "unit",
      "quantity"
    ]
  },
  {
    title: "poultry",
    params: [
      "type",
      "region",
      "quantity"
    ]
  },
  {
    title: "quantity",
    params: [
      "item",
      "region",
      "emission"
    ]
  },
  {
    title: "flight",
    params: [
      "origin",
      "destination",
      "type",
      "model",
      "passengers"
    ],
  },
  {
    title: "vehicle",
    params: [
      "type",
      "origin",
      "destination",
      "mileage",
      "mileage_unit"
    ],
  },
  {
    title: "trains",
    params: [
      "type",
      "origin",
      "destination",
      "passengers"
    ]
  }
];