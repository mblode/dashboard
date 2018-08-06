import React, { Component } from "react";
import TrelloChecklists from "./TrelloChecklists";
import moment from "moment";
import axios from "axios";
import { X } from "react-feather";

class TrelloCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            hidden: false,
            edit: false
        };
    }

    cardArchive = event => {
        event.preventDefault();
        let apiCall =
            "https://api.trello.com/1/cards/" +
            this.props.card.id +
            "?closed=true&token=" +
            process.env.REACT_APP_TRELLO_TOKEN +
            "&key=" +
            process.env.REACT_APP_TRELLO_KEY;

        this.setState({
            hidden: true
        });

        axios.put(apiCall);
    };

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {}

    render() {
        const { card } = this.props;
        let due = null;
        let desc = null;
        let labels = null;
        let checklists = null;

        if (card.due !== null) {
            let date = moment(card.due).from(moment());
            due = <span className="trello-due">({date})</span>;
        }

        if (card.desc.length > 0) {
            desc = <span className="trello-description">{card.desc}</span>;
        }

        if (card.labels.length > 0) {
            labels = (
                <div className="trello-labels">
                    {card.labels.map((label, index) => (
                        <span key={label.id} className={`trello-label trello-label-${label.color}`}>
                            {label.name}
                        </span>
                    ))}
                </div>
            );
        }

        if (card.idChecklists.length > 0) {
            checklists = (
                <div className="trello-checklists">
                    {card.idChecklists.map(checklist => (
                        <TrelloChecklists key={checklist} cardId={card.id} checklist={checklist} />
                    ))}
                </div>
            );
        }

        if (this.state.hidden) {
            return <div />;
        } else {
            return (
                <div className="trello-wrap">
                    <div className="trello-buttons">
                        <a className="trello-archive btn btn-link" onClick={this.cardArchive}>
                            <X size={20} />
                        </a>
                    </div>
                    <div className="trello-card">
                        {labels}
                        <div className="trello-header">
                            <h4 className="trello-name">
                                <a href={card.shortUrl} rel="noopener noreferrer" target="_blank">
                                    {card.name}
                                </a>
                            </h4>
                            {due}
                        </div>
                        {desc}
                        {checklists}
                    </div>
                </div>
            );
        }
    }
}

export default TrelloCard;
