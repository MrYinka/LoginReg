import React, { useState } from 'react';
import  {Link} from "react-router-dom";
import Layout from "../core/Layout";
import {signup} from "../authenticationAPI";


const Register = () => {

    const [values, setValues] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirm_password: '',
        error: '',
        success: false
    });

    const { first_name, last_name, email, password, confirm_password, success, error } = values;

    const handleChange = name => event => {
        setValues({
            ...values,
            error: false,
            [name]: event.target.value
        })
    };


    const registerButton = e => {
        e.preventDefault();
        setValues({ ...values, error: false });
        signup({first_name, last_name, email, password, confirm_password})
            .then(data => {
                if(data.error){
                    setValues({
                        ...values,
                        error: data.error,
                        success: false
                    });
                }else{
                    setValues({
                        ...values,
                        first_name: '',
                        last_name: '',
                        email: '',
                        password: '',
                        confirm_password: '',
                        error: '',
                        success: true
                    });
                }
            });
    };

    const registerForm = () => {
       return (
           <form>
                <div className="form-group">
                    <label className="text-muted">First Name</label>
                    <input onChange={handleChange('first_name')} type="text" className="form-control" value={first_name}/>
                </div>

               <div className="form-group">
                    <label className="text-muted">Last Name</label>
                    <input onChange={handleChange('last_name')} type="text" className="form-control" value={last_name}/>
                </div>

               <div className="form-group">
                    <label className="text-muted">Email</label>
                    <input onChange={handleChange('email')} type="email" className="form-control" value={email}/>
                </div>

               <div className="form-group">
                    <label className="text-muted">Password</label>
                    <input  onChange={handleChange('password')} type="password" className="form-control" value={password}/>
                </div>

               <div className="form-group">
                   <label className="text-muted">Confirm Password</label>
                   <input  onChange={handleChange('confirm_password')} type="password" className="form-control" value={confirm_password}/>
               </div>

               <button className="btn btn-primary btn-block" onClick={registerButton}>Register</button>
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

    const showSuccess = () => {
        return (
            <div className="alert alert-info" style={{display: success ? '' : 'none'}}>
                Registered Successfully! Please <Link to='/signin'>Login</Link>
            </div>
        );
    };

    const alert = error ? showError() : showSuccess();

    return  (
        <Layout title="Register" description="Register to Social App" className="container col-md-4 offset-md-4">
            {alert}
            {registerForm()}
        </Layout>
    );

};


export default Register;