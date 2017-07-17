import React from 'react';

const Loading = () => <div style={styles.card}>Loading...</div>;

export default Loading;
const styles = {
  card: {
    width: '100vw',
    height: '100vh',
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#fff',
    top: '0',
    left: '0',
    fontSize: 24
  }
};
