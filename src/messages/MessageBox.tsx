import React from "react";
import ClickNHold from 'react-click-n-hold';
import {isSpeciesMessage, Message} from "../api/MessagesApi";
import {MapModal} from "./MapModal";
import styles from "./MessageBox.module.css";
import {formatDistanceStrict} from "date-fns";

export default class MessageBox extends React.Component<IMessageBoxProps, IMessageBoxState> {
    state: IMessageBoxState = {
        showMapModal: false
    };

    render() {
        let cardContents: JSX.Element;
        let relativeTime = formatDistanceStrict(new Date(this.props.message.timestamp), new Date(Date.now()));

        if (isSpeciesMessage(this.props.message)) {
            cardContents = (
                <ClickNHold
                    time={0.7}
                    onClickNHold={(e) => {this.setState({showMapModal: true})}}
                    onStart={_ => {}}
                    onEnd={_ => {}}>
                    <div className="card-body" title={`${relativeTime} ago`}>
                        <div><span className="font-weight-bold">{this.props.message.username}</span>: {this.props.message.content}</div>
                        <div>Species: {this.props.message.species}</div>
                        <div>Abundance: {this.props.message.abundance}</div>
                        <div>Temperature: {this.props.message.temperature}°C</div>
                        {this.props.message.image && <img className="img-fluid" alt={`${this.props.message.username}'s image`} src={this.props.message.image} />}
                    </div>
                </ClickNHold>
            )
        } else {
            cardContents = (
                <div className="card-body" title={`${relativeTime} ago`}>
                    <div className="font-weight-bold">{this.props.message.username}: {this.props.message.content}</div>
                </div>
            )
        }

        return (
            <div className="d-inline-block w-100 mb-2">
                <div className={`card ${isSpeciesMessage(this.props.message) ? 'border-success' : ''} ${this.props.message.username == this.props.currentUsername ? 'bg-success float-right' : 'bg-light'} ${styles['message-box']}`}>
                    {cardContents}
                </div>
                {this.state.showMapModal && isSpeciesMessage(this.props.message) && <MapModal onClose={() => this.setState({showMapModal: false})} message={this.props.message} />}
            </div>
        )
    }
}

export interface IMessageBoxProps {
    readonly message: Message,
    readonly currentUsername: string
}

export interface IMessageBoxState {
    showMapModal: boolean
}
