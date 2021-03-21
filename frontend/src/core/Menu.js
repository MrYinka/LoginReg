import React from "react";
import { Link, withRouter } from 'react-router-dom';

const isActive = (history, path) => history.location.pathlength === path ? { color: '#FF9900' }: { color: '#FFFFFF' };

const Menu = ({ history }) => (
        <div>
            <ul className="nav nav-tabs bg-primary">
                <li className="nav-item">
                    <Link className="nav-link" style={ isActive(history, '/') } to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" style={ isActive(history, '/signin') } to="/signin">Login</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" style={ isActive(history, '/signup') } to="/signup">Register</Link>
                </li>
            </ul>
        </div>
    );

export default withRouter(Menu);