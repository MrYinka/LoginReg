import React, {Fragment} from "react";
import { Link, withRouter } from 'react-router-dom';
import {signout, isAuthenticated } from "../authenticationAPI";

const isActive = (history, path) => history.location.pathlength === path ? { color: '#FF9900' }: { color: '#FFFFFF' };

class Menu extends React.Component {
    render() {
        let {history} = this.props;
        return (
            <div>
                <ul className="nav nav-tabs bg-primary">
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, '/')} to="/">Home</Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, '/dashboard')}
                              to="/dashboard">Dashboard</Link>
                    </li>

                    {!isAuthenticated() && (
                        <Fragment>
                            <li className="nav-item">
                                <Link className="nav-link" style={isActive(history, '/signin')}
                                      to="/signin">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" style={isActive(history, '/signup')}
                                      to="/signup">Register</Link>
                            </li>
                        </Fragment>
                    )}


                    {isAuthenticated() && (
                        <li className="nav-item">
                    <span className="nav-link" style={{cursor: 'pointer', color: '#FFFFFF'}}
                          onClick={() => signout(() => {
                              history.push('/');
                          })}>Sign Out</span>
                        </li>
                    )}
                </ul>
            </div>
        );
    }
}

export default withRouter(Menu);