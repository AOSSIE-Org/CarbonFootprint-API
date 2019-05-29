import React from 'react';

const Footer = () => (
            <div style={styles.footer}>
                <strong>Carbon Footprint</strong>
            </div>
        );

const styles = {
    footer: {
        width: "100%",
        height: "50px",
        marginBottom: "0",
        background: "#ddd",
        padding: "10px 30px",
        color: "#999",
        display: "flex",
        position: "static",
        bottom: 0,
        alignItems: "center"
    }
}

export default Footer;
