import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Register from "./user/Register";
import Login from "./user/Login";
import Home from "./core/Home";
import Menu from "./core/Menu";


const Routes = () => {
    return (
        <BrowserRouter>
            <Menu />
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/signup" exact component={Register}/>
                <Route path="/signin" exact component={Login}/>
            </Switch>
        </BrowserRouter>
    );
};


export default Routes;
