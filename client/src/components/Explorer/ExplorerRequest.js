import React, { Component } from 'react';
import {
  Segment,
  Form,
  Header,
  Button,
  Input,
  Divider,
  Dropdown,
  Search
} from 'semantic-ui-react';
import { getKey } from '../Profile/profileController';
import axios from 'axios';
import _ from 'lodash';

const BASE_URL = (process.env.NODE_ENV == 'production') ? 'https://carbonhub.xyz/v1/' : 'http://localhost:3080/v1/';

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
  handleResultSelect(event, result) {
    this.setState({url: result.title, urlParams: result.params});
    this.props.paramsUpdate(result.params);
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
        <Segment>
          <Header style={styles.heading} as="h4">
            <Header.Content>
              API Explorer
            </Header.Content>
          </Header>
          <Divider />
          <Form>
            <div style={styles.div}>
              <Form.Group inline style={styles.form}>
                <Input label={{basic: true, content: 'API Key: '}}
                       labelPosition='left'
                       style={styles.inputKey}
                       value={key ? key : "Go to the profile page and generate one API Key"}
                />
              </Form.Group>
            </div>
            <div style={styles.div}>
              <Form.Group style={styles.form}>
                <Dropdown name='method'
                          options={options}
                          defaultValue={options[1].value}
                          style={styles.dropdown}
                          onChange={this.handleChange}
                />
                {/*<Input label={<label style={styles.label}>http://carbonhub.xyz/v1/</label>}*/}
                {/*name='url'*/}
                {/*style={styles.inputUrl}*/}
                {/*onChange={this.handleChange}/>*/}

                <label style={styles.label}>{BASE_URL}</label>
                <Search
                    input={{ fluid: true }}
                    loading={isLoading}
                    onResultSelect={this.handleResultSelect}
                    onSearchChange={_.debounce(this.handleSearchChange, 500, {leading: true})}
                    results={paramResults}
                    value={url}
                    style={styles.inputUrl}
                    {...this.props}
                />
              </Form.Group>
              <Button
                  content='RUN'
                  color='blue'
                  onClick={this.executeQuery}
              />
            </div>
          </Form>
        </Segment>
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
    color: "#626364"
  },
  form: {
    marginLeft: '10px'
  },
  button: {
    backgroundColor: '#F6F7F9'
  },
  inputKey: {
    width: '1000px',
    color: "#626364"
  },
  inputUrl: {
    marginLeft: '15px',
    width: '850px',
  },
  div: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },
  label: {
    backgroundColor: 'white',
    color: '#2980b9',
    marginLeft: '5px',
    marginRight: '5px',
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
