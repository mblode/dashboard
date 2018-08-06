import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

class Nav extends Component {
    render() {
        return (
            <header className="navbar-header">
                <div className="container">
                    <div className="row">
                        <nav className="navbar navbar-expand navbar-light">
                            <Link to="/" className="navbar-brand">
                                Dashboard
                            </Link>

                            <div className="navbar-collapse">
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <NavLink to="/" exact className="nav-link" activeClassName="active">
                                            Home
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/settings" className="nav-link" activeClassName="active">
                                            Settings
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
            </header>
        );
    }
}

export default Nav;
