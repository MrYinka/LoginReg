import React from 'react';
import Layout from "../core/Layout";
import {signout, isAuthenticated } from "../authenticationAPI";
import {Link, Redirect} from "react-router-dom";


const userDashboard = () => {

    const {user: {first_name, last_name}} = isAuthenticated()
    return (
        <Layout title='Dashboard' description='Profile Page' className="container-fluid">
          Welcome, {`${first_name} ${last_name}!`} To Logout Click <Link  onClick={() => signout(()=>{
            <Redirect to='/' />;
        })}>Here!</Link>
        </Layout>
    );

};


export default userDashboard;