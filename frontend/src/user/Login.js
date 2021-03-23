import React, { useState } from 'react';
import {Redirect} from 'react-router-dom'
import Layout from "../core/Layout";
import {signin, authenticate} from "../authenticationAPI";


const Login = () => {

    const [values, setValues] = useState({
        email: 'yinkarobert@mail.com',
        password: 'jummie0205',
        error: '',
        loading: false,
        redirectToReferrer: false
    });

    const { email, password, error, loading, redirectToReferrer} = values;

    const handleChange = name => event => {
        setValues({
            ...values,
            error: false,
            [name]: event.target.value
        })
    };


    const loginButton = e => {
        e.preventDefault();
        setValues({
            ...values,
            error: false,
            loading: true
        });
        signin({email, password})
            .then(data => {
                if(data.error){
                    setValues({
                        ...values,
                        error: data.error,
                        loading: false
                    })
                }else{
                   authenticate(data, ()=> {
                       setValues({
                           ...values,
                           redirectToReferrer: true
                       });
                   });
                }
            })

    };

    const loginForm = () => {
        return (
            <form>
                <div className="form-group">
                    <label className="text-muted">Email</label>
                    <input onChange={handleChange('email')} type="email" className="form-control" value={email}/>
                </div>

                <div className="form-group">
                    <label className="text-muted">Password</label>
                    <input  onChange={handleChange('password')} type="password" className="form-control" value={password}/>
                </div>

                <button className="btn btn-primary btn-block" onClick={loginButton}>Login</button>
            </form>
        );
    };

    const showError = () => {
        return (
            <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
                {error}
            </div>
        )
    };

    const showLoading = () => (
        loading && (<div className="alert alert-info"><h2>Loading...</h2></div>)
    );

    const redirectUser = () => {
        if(redirectToReferrer){
            return <Redirect to='/dashboard' />
        }
    }


    return  (
        <Layout title="Login" description="Login to Social App" className="container col-md-4 offset-md-4">
            {showError()}
            {showLoading()}
            {loginForm()}
            {redirectUser()}
        </Layout>
    );

};


export default Login;