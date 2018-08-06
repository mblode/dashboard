import React, { Component } from "react";
import axios from "axios";
import TrelloCheckItem from "./TrelloCheckItem";

class TrelloChecklists extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            checklists: []
        };
    }

    componentDidMount() {
        let checklistsApiCall =
            "https://api.trello.com/1/checklists/" +
            this.props.checklist +
            "?fields=name&cards=all&card_fields=name&token=" +
            process.env.REACT_APP_TRELLO_TOKEN +
            "&key=" +
            process.env.REACT_APP_TRELLO_KEY;

        axios.get(checklistsApiCall).then(
            result => {
                this.setState({
                    isLoaded: true,
                    checklists: result.data
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
        const { error, isLoaded, checklists } = this.state;
        const { cardId } = this.props;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div className="trello-check-wrap" key={checklists.id}>
                    {checklists.checkItems.map(checkItem => (
                        <TrelloCheckItem key={checkItem.id} cardId={cardId} checkItem={checkItem} />
                    ))}
                </div>
            );
        }
    }
}

export default TrelloChecklists;
