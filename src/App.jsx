import { chakra, Text } from '@chakra-ui/core';
import React from 'react';
import { Route, Switch } from "react-router-dom";
import ColorSwitch from './components/ColorSwitch';
import Navbar from './components/Navbar';
import Articles from './pages/Articles';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Login from './pages/Login';

function App() {
    return (
        <>
            <Navbar />
            <Switch>
                <Route exact path={["/home", "/"]} component={Home} />
                <Route path={["/article"]} component={Articles} />
                <Route path={["/login"]} component={Login} />
                <Route path="*" component={NotFound} />
            </Switch>
            <ColorSwitch />
        </>
    );
}

export default App;
