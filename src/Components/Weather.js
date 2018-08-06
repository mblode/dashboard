import React, { Component } from "react";
import axios from "axios";
import Skycons from "react-skycons";

class Weather extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            forecast: []
        };
    }

    componentWillMount() {
        if (localStorage.getItem("lat") !== null && localStorage.getItem("long") !== null) {
            this.fetchForecast(localStorage.getItem("lat"), localStorage.getItem("long"));
        } else {
            this.getLocation();
        }
    }

    getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.handleGeolocationSuccess, this.handleGeolocationError, {
                enableHighAccuracy: true,
                timeout: 30000,
                maximumAge: 30000
            });
        }
    }

    // Callback to handle success
    handleGeolocationSuccess = position => {
        const { coords } = position;
        localStorage.setItem("lat", coords.latitude);
        localStorage.setItem("long", coords.longitude);
        this.fetchForecast(coords.latitude, coords.longitude);
    };

    // Callback to handle error
    handleGeolocationError = error => {
        if (error.code === 1) {
            this.setState({ error: "Please enable permissions to access location and reload the page" });
        } else if (
            error.code === 2 &&
            error.message.match(
                /^Network location provider at 'https:\/\/www.googleapis.com\/' : Returned error code 403.$/
            )
        ) {
            this.setState({
                error: "Seems like the internal service for geolocation is down. Please try in a few minutes!"
            });
        } else {
            this.setState({ error: "Looks like something went wrong! Please refresh your browser..." });
            this.getLocation();
        }
    };

    fetchForecast = (lat, long) => {
        let requestUrl =
            "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/" +
            process.env.REACT_APP_WEATHER_KEY +
            "/";
        let apiCall = requestUrl + lat + "," + long + "?extend=hourly&units=si";

        axios
            .get(apiCall)
            .then(res => res.data)
            .then(
                result => {
                    this.setState({
                        isLoaded: true,
                        forecast: result
                    });
                },
                error => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            );
    };

    kebabToSnake(str) {
        let myString = str.replace(/-/g, "_");
        return myString.toUpperCase();
    }

    render() {
        const { error, isLoaded, forecast } = this.state;
        if (error) {
            return <div className="weather-loading">Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div className="weather-loading">Loading...</div>;
        } else {
            return (
                <div className="weather">
                    <div className="weather-graphic">
                        <Skycons icon={this.kebabToSnake(forecast.daily.icon)} width="84" height="84" />
                    </div>

                    <div className="weather-wrap">
                        <span className="weather-current">{Math.round(forecast.hourly.data[0].temperature)}&deg;C</span>
                        <span className="weather-min-max">
                            ({Math.round(forecast.daily.data[0].temperatureMax)}&deg;/{Math.round(
                                forecast.daily.data[0].temperatureMin
                            )}&deg;)
                        </span>
                        <span className="weather-summary">{forecast.daily.data[0].summary}</span>
                    </div>
                </div>
            );
        }
    }
}

export default Weather;
