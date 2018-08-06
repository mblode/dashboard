import React, { Component } from "react";
import CalendarEvent from "./CalendarEvent";
import axios from "axios";
import moment from "moment";

class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            calendar: []
        };
    }

    componentDidMount() {
        var today = moment()
            .subtract(10, "hours")
            .toJSON();
        today = today.substring(0, today.length - 5) + "-07:00";

        console.log();

        var tomorrow = moment()
            .add(1, "day")
            .endOf("day")
            .subtract(7, "hours")
            .toJSON();
        tomorrow = tomorrow.substring(0, tomorrow.length - 5) + "-07:00";

        let calendarId = localStorage.getItem("calendarId");

        var finalURL =
            "https://www.googleapis.com/calendar/v3/calendars/" +
            calendarId +
            "/events?key=" +
            process.env.REACT_APP_GOOGLE_KEY;
        finalURL = finalURL.concat("&singleEvents=true&orderBy=starttime");
        finalURL = finalURL.concat("&timeMin=" + today);
        finalURL = finalURL.concat("&timeMax=" + tomorrow);

        axios.get(finalURL).then(
            result => {
                this.setState({
                    isLoaded: true,
                    calendar: result.data.items
                });
            },
            error => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        );
    }

    render() {
        const { error, isLoaded, calendar } = this.state;
        if (error) {
            return (
                <div className="calendar">
                    <div className="calendar-list-loading">Error: {error.message}</div>
                </div>
            );
        } else if (!isLoaded) {
            return (
                <div className="calendar">
                    <div className="calendar-list-loading">Loading...</div>
                </div>
            );
        } else {
            return (
                <div className="calendar">
                    <h2 className="calendar-heading">
                        <a href="https://calendar.google.com/calendar/r" rel="noopener noreferrer" target="_blank">
                            Calendar
                        </a>
                    </h2>
                    <div className="calendar-list">
                        {calendar.map(calendar => <CalendarEvent key={calendar.id} calendar={calendar} />)}
                    </div>
                </div>
            );
        }
    }
}

export default Calendar;
