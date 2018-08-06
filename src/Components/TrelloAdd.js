import React, { Component } from "react";
import axios from "axios";

class TrelloAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            value: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        let apiCall =
            "https://api.trello.com/1/cards?name=" +
            this.state.value +
            "&pos=top&idList=" +
            this.props.listId +
            "&token=" +
            process.env.REACT_APP_TRELLO_TOKEN +
            "&key=" +
            process.env.REACT_APP_TRELLO_KEY;

        axios.post(apiCall);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="form-inline trello-add">
                <div className="form-group trello-add-group">
                    <input
                        className="form-control trello-add-input"
                        type="text"
                        name="card-name"
                        value={this.state.value}
                        onChange={this.handleChange}
                        placeholder="Add a Card..."
                    />
                    <input
                        type="submit"
                        value="Add"
                        className="btn btn-light btn-shadow"
                        disabled={this.state.value.length > 0 ? false : true}
                    />
                </div>
            </form>
        );
    }
}

export default TrelloAdd;
