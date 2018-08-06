import React, { Component } from "react";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";

if (localStorage.getItem("address") === null) {
    localStorage.setItem("address", "");
}

if (localStorage.getItem("board") === null) {
    localStorage.setItem("board", "");
}

if (localStorage.getItem("calendarId") === null) {
    localStorage.setItem("calendarId", "");
}

class SettingsForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            board: localStorage.getItem("board"),
            calendarId: localStorage.getItem("calendarId"),
            lat: localStorage.getItem("lat"),
            long: localStorage.getItem("long"),
            address: localStorage.getItem("address")
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };

    handleAddressChange = address => {
        this.setState({ address });
    };

    handleAddressSelect = address => {
        this.setState({ address: address });
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => {
                this.setState({
                    lat: latLng.lat,
                    long: latLng.lng
                });
            })
            .catch(error => {
                console.error("Error", error);
            });
    };

    handleSubmit = event => {
        event.preventDefault();
        localStorage.setItem("address", this.state.address);
        localStorage.setItem("board", this.state.board);
        localStorage.setItem("calendarId", this.state.calendarId);
        localStorage.setItem("lat", this.state.lat);
        localStorage.setItem("long", this.state.long);
    };

    render() {
        return (
            <div className="settings-form">
                <form method="get" className="form" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="lat">Location Search</label>
                        <PlacesAutocomplete
                            value={this.state.address}
                            onChange={this.handleAddressChange}
                            onSelect={this.handleAddressSelect}
                        >
                            {({ getInputProps, suggestions, getSuggestionItemProps }) => (
                                <div className="search-container">
                                    <div className="search-input-container">
                                        <input
                                            {...getInputProps({
                                                placeholder: "Search Places...",
                                                className: "form-control"
                                            })}
                                        />
                                    </div>
                                    {suggestions.length > 0 && (
                                        <div className="search-dropdown-container">
                                            {suggestions.map(suggestion => {
                                                const className = suggestion.active
                                                    ? "search-item search-item-active"
                                                    : "search-item";
                                                return (
                                                    <div {...getSuggestionItemProps(suggestion, { className })}>
                                                        <span>{suggestion.description}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            )}
                        </PlacesAutocomplete>
                    </div>

                    <div className="form-row">
                        <div className="form-group col-sm-6">
                            <label htmlFor="lat">Location Latitude</label>
                            <input
                                className="form-control"
                                type="text"
                                id="lat"
                                name="lat"
                                value={this.state.lat}
                                onChange={this.handleChange}
                                placeholder="Latitude"
                            />
                        </div>

                        <div className="form-group col-sm-6">
                            <label htmlFor="long">Location Longitude</label>
                            <input
                                className="form-control"
                                type="text"
                                id="long"
                                name="long"
                                value={this.state.long}
                                onChange={this.handleChange}
                                placeholder="Longitude"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="board">Trello Board ID</label>
                        <input
                            className="form-control"
                            type="text"
                            id="board"
                            name="board"
                            value={this.state.board}
                            onChange={this.handleChange}
                            placeholder="Board ID"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="calendar-id">Google Calendar ID</label>
                        <input
                            className="form-control"
                            type="text"
                            id="calendar-id"
                            name="calendarId"
                            value={this.state.calendarId}
                            onChange={this.handleChange}
                            placeholder="Calendar ID"
                        />
                    </div>

                    <input type="submit" className="btn btn-light btn-shadow" value="Save settings" />
                </form>
            </div>
        );
    }
}

export default SettingsForm;
