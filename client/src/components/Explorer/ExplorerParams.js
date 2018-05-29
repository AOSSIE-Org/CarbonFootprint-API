import React, { Component } from 'react';
import { Segment, Checkbox } from 'semantic-ui-react';

/* Extended react.Component class as ExplorerParams */
export default class ExplorerParams extends Component {

  /**
   * Constructor for the ExplorerParams class
   * @constructor extends react.Component
   */
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      errorMessage: '',
      response: '',
      params: ['item', 'region', 'unit', 'quantity'], // dummy data
      checkedParams: []
    };
  }

  /**
   * Inherited function from react.Component to render to DOM object into html
   */
  render() {
    return (
        <Segment style={styles.body}>
          {this.state.params.map(param => ( // mapping the params into list of checkboxes
              <div>
                <Checkbox label={param}/>
                <br/>
              </div>
          ))}
        </Segment>
    );
  }
}

const styles = {
  body: {
    backgroundColor: 'white',
    minHeight: '100%',
  }
};