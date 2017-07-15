import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './components/Header/Header';
import Body from "./components/Body/Body";
import Visuals from "./components/Visuals/Visuals";
import Graph from "./components/Graph/Graph";
import NotFound from "./components/NotFound/NotFound";
import Account from "./components/Account/Account";
import Auth from './Auth/Auth';
import history from './history';

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
}

export default class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
            <div style={styles.app}>
                <Header auth={auth}/>
                <Body>
                <Switch>
                <Route exact path="/" component={Visuals} />
                <Route path="/visuals/:type" component={Graph} />
                <Route path="/callback" render={(props) => {
            handleAuthentication(props);
            return <Account {...props} />
          }}/>
                <Route component={NotFound} />
                </Switch>
                </Body>
            </div>
            </BrowserRouter>
        );
    }
}

const styles = {
    app: {
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "stretch",
        alignItems: "stretch",
        flexDirection: "column",

    }
};
