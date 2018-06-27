import React, { Component } from 'react';
import {
  Segment,
  Form,
  Header,
  Button,
  Input,
  Divider,
  Message,
  Dropdown
} from 'semantic-ui-react';
import { getKey } from '../Profile/profileController';
import axios from 'axios';

const URL = "http://localhost:3080/v1/";

/* Extended react.Component class as ExplorerRequest */
export default class ExplorerRequest extends Component {

  /**
   * Constructor for the ExplorerRequest class
   * @constructor extends react.Component
   */
  constructor(props) {
    super(props);
    this.state = {
      key: this.props.accessKey,
      error: false,
      errorMessage: '',
      method: this.props.method,
      url: this.props.url
    };
    this.executeQuery = this.executeQuery.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // /**
  //  * Inherit function from react.Component handle props from parent
  //  * react component
  //  */
  // componentWillReceiveProps(nextProps){
  //   this.setState({key: nextProps.accessKey});
  // }

  /**
   * Function to handle the change in textboxes.
   * @param {object} event Event Object
   // * @param {object} data Data Object
   */
  handleChange (event) {
    this.setState({url: event.target.value});
    // let value = event.target.value || data.value;
    // let key = event.target.name || data.name;
    // this.setState({[key]: value});
    // this.props.passData(key, value);
  }

  /**
   * Method to execute the current query
   */
  executeQuery() {
    this.props.handleURL(this.state.url);
    console.log(this.props.query);
    axios({
      method: this.state.method,
      url: URL +this.state.url,
      data: this.props.query,
      headers: {
        'access-key':this.state.key,
        'Content-type': 'application/json'
      }
    }).then(response => {
      console.log(response.data);
      this.props.handleResponse(response.data);
    })
  };

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
  }

  /**
   * Inherited function from react.Component to render to DOM object into html
   */
  render() {
    return (
        <Segment>
          <Header style={styles.heading} as='h4'>
            <Header.Content>
              API Explorer
            </Header.Content>
          </Header>
          <Divider />
          {this.state.error &&
          <Message warning>
            <Message.Header>
              {this.state.errorMessage}
            </Message.Header>
          </Message>}
          <Form>
            <div style={styles.div}>
              <Form.Group inline style={styles.form}>
                <Input label={{basic: true, content: 'API Key: '}}
                       labelPosition='left'
                       style={styles.inputKey}
                       value= {this.state.key ? this.state.key : "Go to the profile page and generate one API Key"}
                />
              </Form.Group>
            </div>
            <div style={styles.div}>
              <Form.Group style={styles.form}>
                <Dropdown placeholder='Method'
                          options={options}
                          defaultValue={options[0].value}
                          style={styles.dropdown}
                />
                <Input
                    label={<label style={styles.label}>http://carbonhub.xyz/v1/</label>}
                    style={styles.inputUrl}
                    onChange={this.handleChange}
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
    color: '#626364'
  },
  form: {
    marginLeft: '10px'
  },
  button: {
    backgroundColor: '#F6F7F9'
  },
  inputKey: {
    width: '1000px',
    color: '#626364'
  },
  inputUrl: {
    marginLeft: '15px',
    width: '850px'
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
        "appliance":"Water heater",
        "type":"instantaneous",
        "region":"India",
        "quantity":1,
        "runnning_time":3
    },
    "emissions": {
        "item": "electricity",
        "region": "india",
        "unit": "kWh",
        "quantity": 1.564
    },
    "poultry": {
        "type":"Broiler chicken",
        "region":"British columbia",
        "quantity":3
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
        "type":"railcars",
        "origin":"Bhubaneswar",
        "destination":"Delhi",
        "passengers":10
    }
};