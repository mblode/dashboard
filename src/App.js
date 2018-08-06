import React, { Component } from "react";

import Nav from "./Components/Nav";
import Home from "./Pages/Home";
import Settings from "./Pages/Settings";
import { Route, Switch } from "react-router-dom";

class App extends Component {
    componentDidMount() {
        // document.body.classList.add("dark");
    }

    render() {
        return (
            <div className="app">
                <Nav />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/settings" component={Settings} />
                </Switch>
            </div>
        );
    }
}

export default App;
