import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Header from './components/Header/Header';
import Body from "./components/Body/Body";
import Visuals from "./components/Visuals/Visuals";
import Graph from "./components/Graph/Graph";
import NotFound from "./components/NotFound/NotFound";
import Profile from "./components/Profile/Profile";
import Loading from "./components/Loading/Loading";
import Auth from './Auth/Auth';
import Explorer from './components/Explorer/Explorer'
import DataUpload from './components/DataUpload/DataUpload';
import TransportComparer from './components/TransportComparer/TransportComparer';
import Structured from './components/DataUpload/Structured';
import Unstructured from './components/DataUpload/Unstructured';
import DataVerify from './components/DataUpload/DataVerify';
import Footer from './components/Footer/Footer';
import DailyDetails from './components/Profile/DailyDetails';
import Emission from './components/EmissionGraph/Emission';
import Steps from './components/StepsGraph/Steps';
import './App.css'

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
                <div className="app-main">
                    <Header auth={auth} />
                     <Body>
                        <Switch>
                            <Route exact path="/" component={Visuals} />
                            <Route path="/visuals/:type" component={Graph} />
                            <Route exact path="/profile" render={(props) => (
                                !auth.isAuthenticated() ? (
                                    <Redirect to="/" />
                                ) : (
                                        <Profile auth={auth} />
                                    )
                            )} />
                            <Route path="/profile/enter" render={(props) => (
                                !auth.isAuthenticated() ? (
                                    <Redirect to="/" />
                                ) : (
                                        <DailyDetails />
                                    )
                            )} />
                            <Route path="/explorer" render={(props) => (
                                !auth.isAuthenticated() ? (
                                    <Redirect to="/" />
                                ) : (
                                        <Explorer />
                                    )
                            )} />
                            <Route path="/DataUpload" render={(props) => (
                                !auth.isAuthenticated() ? (
                                    <Redirect to="/" />
                                ) : (
                                        <DataUpload auth={auth} />
                                    )   
                            )} />
                            <Route path="/TransportComparer" render={(props) => (
                                !auth.isAuthenticated() ? (
                                    <Redirect to="/" />
                                ) : (
                                        <TransportComparer auth={auth} />
                                    )
                            )} />
                            <Route path="/structured" render={(props) => (
                                !auth.isAuthenticated() ? (
                                    <Redirect to="/" />
                                ) : (
                                        <Structured auth={auth} />
                                    )
                            )} />
                            <Route path="/dataVerify" render={(props) => (
                                !auth.isAuthenticated() ? (
                                    <Redirect to="/" />
                                ) : (
                                        <DataVerify auth={auth} />
                                    )
                            )} />
                            <Route path="/unstructured" render={(props) => (
                                !auth.isAuthenticated() ? (
                                    <Redirect to="/" />
                                ) : (
                                        <Unstructured auth={auth} />
                                    )
                            )} />
                            <Route path="/callback" render={(props) => {
                                handleAuthentication(props);
                                return <Loading {...props} />
                            }} />
                            <Route path="/emissions" render={(props) => (
                                !auth.isAuthenticated() ? (
                                    <Redirect to="/" />
                                ) : (
                                        <Emission auth={auth} />
                                    )
                            )} />
                            <Route path="/steps" render={(props) => (
                                !auth.isAuthenticated() ? (
                                    <Redirect to="/" />
                                ) : (
                                        <Steps auth={auth} />
                                    )
                            )} />
                            <Route component={NotFound} />
                        </Switch>
                    </Body>
                    <Footer/>
                </div>
            </BrowserRouter>
        );
    }
}