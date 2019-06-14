import React from 'react';

export default class Body extends React.Component {
  render() {
    return (
      <div style={styles.body}>
        <div style={{
          padding: "30px",
          flex: 1
        }}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

const styles = {
  body: {
    minHeight: "calc(100vh - 50px - 60px)",
    display: "flex",
    flexDirection: "column",
    flex: 1,
    overflow: "auto"
  }
};
