import React, { Component } from "react";
import moment from "moment";

class CalendarEvent extends Component {
    render() {
        const { calendar } = this.props;
        let now = moment();
        let date = null;
        let time = null;
        let due = null;
        let state;
        let today;

        if (calendar.start.date && calendar.end.date) {
            let start = moment(calendar.start.date).format("dddd MMM D");
            let end = moment(calendar.end.date)
                .subtract(1, "days")
                .format("dddd MMM D, YYYY");
            let dueTime = moment(calendar.start.date).from(moment());

            time = (
                <div className="calendar-time">
                    <span>{start}</span>
                    <span> - </span>
                    <span>{end}</span>
                </div>
            );

            if (now >= moment(calendar.start.date) && now <= moment(calendar.end.date)) {
                date = <div className="calendar-date">{moment().format("ddd D MMM")}</div>;
                due = <span className="calendar-due">(all day)</span>;
                today = "today";
                state = "current";
            } else if (now > moment(calendar.end.date)) {
                state = "past";
                date = (
                    <div className="calendar-date">
                        {moment(calendar.end.date)
                            .subtract(1, "days")
                            .format("ddd D MMM")}
                    </div>
                );
            } else {
                due = <span className="calendar-due">({dueTime})</span>;
                date = <div className="calendar-date">{moment(calendar.start.date).format("ddd D MMM")}</div>;
            }
        } else if (calendar.start.dateTime && calendar.end.dateTime) {
            let startTime = moment(calendar.start.dateTime).format("h:mma");
            let endTime = moment(calendar.end.dateTime).format("h:mma");
            let dueTime = moment(calendar.start.dateTime).from(moment());
            let tomorrow = null;

            if (moment().endOf("day") < moment(calendar.start.dateTime)) {
                tomorrow = "Tomorrow from ";
            }

            time = (
                <div className="calendar-time">
                    <span>{tomorrow}</span>
                    <span>{startTime}</span>
                    <span> - </span>
                    <span>{endTime}</span>
                </div>
            );

            date = <div className="calendar-date">{moment(calendar.start.dateTime).format("ddd D MMM")}</div>;

            if (
                moment()
                    .startOf("day")
                    .format("h:mma dddd MMM D") ===
                moment(calendar.start.dateTime)
                    .startOf("day")
                    .format("h:mma dddd MMM D")
            ) {
                today = "today";
            }

            if (moment() >= moment(calendar.start.dateTime) && moment() <= moment(calendar.end.dateTime)) {
                state = "current";
                due = <span className="calendar-due">(in progress)</span>;
            } else if (moment() > moment(calendar.end.dateTime)) {
                state = "past";
            } else {
                due = <span className="calendar-due">({dueTime})</span>;
            }
        }

        return (
            <div className="calendar-wrap">
                <div className={`calendar-card ${state} ${today}`}>
                    {date}

                    <div className="calendar-header">
                        <h4 className="calendar-name">
                            <a href={calendar.htmlLink} rel="noopener noreferrer" target="_blank">
                                {calendar.summary}
                            </a>
                        </h4>
                        {due}
                    </div>
                    {time}
                    <span className="calendar-description">{calendar.description}</span>
                    <span className="calendar-location">{calendar.location}</span>
                </div>
            </div>
        );
    }
}

export default CalendarEvent;
