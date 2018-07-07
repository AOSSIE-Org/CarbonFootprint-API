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
    this.handleChange = this.handleChange.bind(this);
  }

  /**
   * Inherited function from react.Component.
   * This method is invoked before rendering when new props or state are being received.
   *
   * @param nextProps the next Props received from Parent
   * @param nextState the next State
   * @returns {boolean} whether should update or not
   */
  shouldComponentUpdate(nextProps, nextState){
    return nextProps.params && nextProps.params.length > 0;
  }

  /**
   * Function to handle the change in query.
   * @param {object} e Event Object
   * @param {object} value Value
   */
  handleChange(e, {value}) {
    let newQuery = this.props.query || {};
    if(newQuery.hasOwnProperty(value)){
      delete newQuery[value];
    }else {
      newQuery[value] = '';
    }
    this.props.queryUpdate(newQuery);
  }

  /**
   * Inherited function from react.Component to render to DOM object into html
   */
  render() {
    let params = this.props.params || [];
    let query = this.props.query || {};
    let paramKeys = Object.keys(query);
    return (
        <Segment style={styles.body}>
          {params.map(key =>
              <div>
                <Segment>
                  <Checkbox label={key} checked={paramKeys.indexOf(key)>-1} value={key} onChange={this.handleChange}/>
                </Segment>
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