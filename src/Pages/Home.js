import React from "react";

import Clock from "../Components/Clock";
import Weather from "../Components/Weather";
import TrelloList from "../Components/TrelloList";
import Calendar from "../Components/Calendar";

const Home = () => (
    <section className="section-card">
        <div className="container">
            <div className="row">
                <div className="col-sm-12">
                    <div className="weather-clock">
                        <Clock />
                        <div className="divider" />
                        <Weather />
                    </div>
                </div>

                <div className="col-md-6">
                    <TrelloList />
                </div>
                <div className="col-md-6">
                    <Calendar />
                </div>
            </div>
        </div>
    </section>
);

export default Home;
