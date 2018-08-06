import React, { Component } from "react";
import moment from "moment";

class Clock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: moment().format("dddd D MMMM, YYYY"),
            hour: moment().format("h"),
            minute: moment().format("mm"),
            post: moment().format("a")
        };
    }

    componentDidMount() {
        this.intervalID = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    tick() {
        this.setState({
            date: moment().format("dddd D MMMM, YYYY"),
            hour: moment().format("h"),
            minute: moment().format("mm"),
            post: moment().format("a")
        });
    }

    render() {
        return (
            <div className="clock">
                <div className="clock-time">
                    <span>
                        {this.state.hour}:{this.state.minute} {this.state.post}
                    </span>
                </div>
                <p className="clock-date">{this.state.date}</p>
            </div>
        );
    }
}

export default Clock;
