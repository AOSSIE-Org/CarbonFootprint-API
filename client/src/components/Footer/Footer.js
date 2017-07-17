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
        marginTop: "50px",
        background: "#ddd",
        padding: "10px 30px",
        color: "#999",
        display: "flex",
        alignItems: "center"
    }
}

export default Footer;
