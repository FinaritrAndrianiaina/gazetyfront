import React, { useContext, useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Articles from "./pages/Articles";
import ArticlePage from "./pages/ArticlePage";
import theme from "./theme";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { UsersContext } from "./UserContext";
import {
    ChakraProvider,
    localStorageManager,
    StylesProvider,
} from "@chakra-ui/react";
import UserPage from "./pages/UserPage";
import Register from "./pages/Register";

function App() {
    const { isAuth, disconnect } = useContext(UsersContext);
    return (
        <>
            <ChakraProvider
                theme={theme}
                colorModeManager={localStorageManager}
            >
                <StylesProvider>
                    <Navbar isAuth={isAuth} disconnect={disconnect} />
                    <Switch>
                        <Route exact path={["/home", "/"]} component={Home} />
                        <Route
                            path={["/article/:id"]}
                            exact
                            component={ArticlePage}
                        />
                        <Route path={["/login"]} component={Login} />
                        <Route path={["/register"]} component={Register} />
                        <Route path={["/user"]} component={UserPage} />
                        <Route path="*" component={NotFound} />
                    </Switch>
                </StylesProvider>
            </ChakraProvider>
        </>
    );
}

export default App;
