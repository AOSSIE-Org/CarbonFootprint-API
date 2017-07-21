import React from 'react';
import {Grid, Card, Icon} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import Footer from '../Footer/Footer';

export default class Body extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={styles.body}>
        <div style={{
          padding: "30px",
          flex: 1
        }}>
          {this.props.children}
        </div>
        <Footer/>
      </div>
    );
  }
}

const styles = {
  body: {
    minHeight: "100%",
    display: "flex",
    flexDirection: "column",
    flex: 1,
    overflow: "auto"
  }
};
