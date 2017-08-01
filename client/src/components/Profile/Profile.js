import React from 'react';

const Profile = ({match}) => (
                <div style={styles.card}>
                Profile Page
                </div>
    )

export default Profile;
const styles = {
    card: {
        width: "100%",
        height: "100%",
        background: '#fff',
        boxShadow: "1px 1px 5px #bbb",
        position: "relative"
    }
};
