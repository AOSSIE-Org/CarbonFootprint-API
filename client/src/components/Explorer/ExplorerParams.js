import React, { Component } from 'react';
import { Segment, Checkbox } from 'semantic-ui-react';

export default class ExplorerParams extends Component {

  constructor(props) {
    super(props);

    this.state = {
      error: false,
      errorMessage: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, {value}) {
    const newQuery = this.props.query;
    console.log(newQuery);
    const key = Object.keys(newQuery);
    newQuery[value] = '';
    this.props.queryUpdate(newQuery);
  }

  render() {
    const query = this.props.query;
    //const keys = Object.keys(query);
    let check;
    let keys = defaultParam["poultry"];
    const url = this.props.url;
    console.log(url);
    for (let key in defaultParam) {
      if (key === url) {
        keys = defaultParam[key]
      }
    }

    return (
        <Segment style={styles.body}>
          {Object.values(keys).map(key =>
              <div>
                {check = query[key] ? true : false}
                <Checkbox label={key} value={key} checked={check} onChange={this.handleChange}/>
                <br/>
              </div>
          )}
        </Segment>
    );
  }
}

const styles = {
  body: {
    backgroundColor: 'white',
    minHeight: "100%",
  }
};
const defaultParam = {
  "appliances": [
    "appliance",
    "type",
    "region",
    "quantity",
    "runnning_time"
  ],
  "emissions": [
    "item",
    "region",
    "unit",
    "quantity"
  ],
  "poultry": [
    "type",
    "region",
    "quantity"
  ],
  "quantity": [
    "item",
    "region",
    "emission"
  ],
  "flight": [
    "origin",
    "destination",
    "type",
    "model",
    "passengers"
  ],
  "vehicle": [
    "type",
    "origin",
    "destination",
    "mileage",
    "mileage_unit"
  ],
  "trains": [
    "type",
    "origin",
    "destination",
    "passengers"
  ]
}
