import React, { Component } from "react";
import axios from "axios";

class TrelloCheckItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkState: this.props.checkItem.state
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const state = value ? "complete" : "incomplete";

        this.setState({
            checkState: state
        });

        let apiCall =
            "https://api.trello.com/1/cards/" +
            this.props.cardId +
            "/checkItem/" +
            this.props.checkItem.id +
            "?state=" +
            value +
            "&token=" +
            process.env.REACT_APP_TRELLO_TOKEN +
            "&key=" +
            process.env.REACT_APP_TRELLO_KEY;

        axios.put(apiCall);
    }

    render() {
        const { checkState } = this.state;
        const { checkItem } = this.props;
        return (
            <div className="form-check trello-check-item">
                <input
                    type="checkbox"
                    className="form-check-input"
                    id={checkItem.id}
                    checked={checkState === "complete" ? true : false}
                    onChange={this.handleInputChange}
                />
                <label className="form-check-label" htmlFor={checkItem.id}>
                    {checkItem.name}
                </label>
            </div>
        );
    }
}

export default TrelloCheckItem;
