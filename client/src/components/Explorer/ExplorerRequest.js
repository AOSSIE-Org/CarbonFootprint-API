import React, { Component } from 'react';
import {
    Segment,
    Form,
    Header,
    Button,
    Input,
    Divider,
    Message,
    Responsive,
    Grid
} from 'semantic-ui-react';
import { getKey } from '../Profile/profileController';
import axios from 'axios';

const URL = "http://localhost:3080/v1/";

export default class ExplorerRequest extends Component {

    constructor(props) {
        super(props);

        this.state = {
            key: false,
            error: false,
            errorMessage: '',
            method: 'POST',
            url: ''
        };
        this.executeQuery = this.executeQuery.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        this.setState({url: event.target.value});
    }

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

    componentDidMount() {
        getKey().then(data => {
            if (data.success) {
              this.setState({key: data.apikey});
            }
          });
    }

    render() {
        return (
            <Responsive as={Segment} raised>
                <Header style={styles.heading} as="h4">
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

                <Grid textAlign='left'>
                    <Grid.Row>
                        <Grid.Column width={16}>
                              <Input
                                    label={{basic: true, content: 'API Key: '}}
                                    labelPosition='left'
                                    style={styles.inputKey}
                                    value= {this.state.key ? this.state.key : "Go to the profile page and generate one API Key"}
                                    fluid
                              />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={3} mobile={16} tablet={3} computer={3}>
                            <Form.Dropdown
                                  placeholder='Method'
                                  options={options}
                                  defaultValue={options[0].value}
                                  style={styles.dropdown}
                                  selection
                                  className='label'
                            />
                        </Grid.Column>
                        <Grid.Column width={9} mobile={16} tablet={10} computer={9}>
                            <Input
                                  label={{basic: true, content: 'http://carbonhub.xyz/v1/'}}
                                  labelPosition='left'
                                  onChange={this.handleChange}
                                  fluid
                            />
                        </Grid.Column>
                        <Grid.Column width={4} mobile={16} tablet={3} computer={4}>
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