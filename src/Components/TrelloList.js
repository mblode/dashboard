import React, { Component } from "react";
import TrelloCard from "./TrelloCard";
import TrelloAdd from "./TrelloAdd";
import axios from "axios";

class TrelloList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            lists: [],
            cards: []
        };
    }

    componentDidMount() {
        let board = localStorage.getItem("board");

        let listsApiCall =
            "https://api.trello.com/1/boards/" +
            board +
            "/lists?token=" +
            process.env.REACT_APP_TRELLO_TOKEN +
            "&key=" +
            process.env.REACT_APP_TRELLO_KEY;
        let cardsApiCall =
            "https://api.trello.com/1/boards/" +
            board +
            "/cards/visible?token=" +
            process.env.REACT_APP_TRELLO_TOKEN +
            "&key=" +
            process.env.REACT_APP_TRELLO_KEY;

        axios.get(listsApiCall).then(
            result => {
                this.setState({
                    isLoaded: true,
                    lists: result.data[0]
                });
            },
            error => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        );

        axios.get(cardsApiCall).then(
            result => {
                this.setState({
                    isLoaded: true,
                    cards: result.data
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
        const { error, isLoaded, lists, cards } = this.state;
        if (error) {
            return (
                <div className="trello">
                    <div className="trello-list-loading">Error: {error.message}</div>
                </div>
            );
        } else if (!isLoaded) {
            return (
                <div className="trello">
                    <div className="trello-list-loading">Loading...</div>
                </div>
            );
        } else {
            return (
                <div className="trello">
                    <h2 className="trello-heading">
                        <a href="https://trello.com/b/KXY9DSFa/gtd" rel="noopener noreferrer" target="_blank">
                            Trello
                        </a>
                    </h2>
                    <div className="trello-list">
                        {cards
                            .filter(card => lists.id === card.idList)
                            .map(card => <TrelloCard key={card.id} card={card} />)}
                    </div>
                    <TrelloAdd listId={lists.id} />
                </div>
            );
        }
    }
}

export default TrelloList;
