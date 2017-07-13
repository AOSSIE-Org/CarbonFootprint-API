import React from 'react';
import { Header } from 'semantic-ui-react';

const Graph = ({match}) => (
            <div style={{width: "100%"}}>
                <div style={styles.card}>
                    <iframe src={`./graphs/${match.params.type}.html`} width="100%" height="100%" style={{"border": "none"}}></iframe>
                </div>
                <Header as='h2' dividing>Electricity Emissions</Header>
                <p>Helle </p>
            </div>
    ) 

export default Graph;
const styles = {
    card: {
        width: "100%",
        height: "100%",
        background: '#fff',
        backgroundImage: "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAGElEQVQYV2NkYGCQYmBgeMYABYwwBvECAD1WAQVZi1QaAAAAAElFTkSuQmCC)",
        backgroundRepeat: "repeat",
        backgroundSize: "7px",
        boxShadow: "1px 1px 5px #bbb",
        position: "relative"
    }
};
