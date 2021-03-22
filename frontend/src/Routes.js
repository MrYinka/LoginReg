import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Register from "./user/Register";
import Login from "./user/Login";
import Home from "./core/Home";
import PrivateRoute from "./authenticationAPI/PrivateRoute";
import userDashboard from "./user/userDashboard";



const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/signup" exact component={Register}/>
                <Route path="/signin" exact component={Login}/>
                <PrivateRoute path="/dashboard" exact component={userDashboard}/>
            </Switch>
        </BrowserRouter>
    );
};


export default Routes;
