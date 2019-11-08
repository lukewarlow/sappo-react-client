import React from "react";
import MessageBox from "./messages/MessageBox";
import SendMessageModal from "./messages/SendSpeciesMessageModal";
import Toast from "./components/Toast";
import {onNewMessage, onUserConnects, onUserDisconnects} from "./Socket";
import {emptyMessage, Message, MessagesApi, SpeciesMessage} from "./api/MessagesApi";
import {countNumberOfUniqueSpecies} from "./UniqueSpeciesCount";
import styles from "./ChatBox.module.css";

export default class ChatBox extends React.Component<IChatBoxProps, IChatBoxState> {
    state: IChatBoxState = {
        newMessage: "",
        messages: [],
        showModal: false,
        toasts: []
    };

    constructor(props: IChatBoxProps) {
        super(props);

        onUserConnects((user) => {
            let toasts = this.state.toasts;
            if (user != this.props.currentUsername)
            {
                toasts.push({title: 'Users Connected', message: `${user} has connected.`});

                this.setState({toasts: toasts});

                setTimeout(() => {
                    this.setState({toasts: []})
                }, 2000);
            }
        });

        onUserDisconnects((user) => {
            let toasts = this.state.toasts;
            toasts.push({title: 'Users Connected', message: `${user} has disconnected.`});

            this.setState({toasts: toasts});

            setTimeout(() => {
                this.setState({toasts: []})
            }, 2000);
        });

        onNewMessage((message: Message) => {
            let messages = this.state.messages;
            messages.push(message);
            this.setState({messages: messages});
        });

        MessagesApi.retrieveMessages()
            .then(m => {
                this.setState({messages: (m as SpeciesMessage[])});
            });

        this.updateMessageContent = this.updateMessageContent.bind(this);
        this.sendSimpleMessage = this.sendSimpleMessage.bind(this);
    }

    updateMessageContent(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({newMessage: e.target.value});
    }

    async sendSimpleMessage() {
        let message: Message = emptyMessage(this.props.currentUsername);
        message.content = this.state.newMessage;
        await MessagesApi.sendMessage(message);
        this.setState({newMessage: ""});
    }

    render() {
        return (
            <div>
                {this.state.toasts.map((toast, index) => {
                    return <Toast key={index} title={toast.title} message={toast.message}/>
                })}
                <div className="container">
                    {this.state.showModal && <SendMessageModal onClose={() => this.setState({showModal: false})}
                                                               currentUsername={this.props.currentUsername}/>}
                    <div className="card">
                        <div className="card-header">
                            Sappo Chat ({countNumberOfUniqueSpecies(this.state.messages)} unique species of frog)
                        </div>
                        <div className={`card-body ${styles['chatbox-content']}`}>
                            {this.state.messages.map((message, index) => {
                                return <MessageBox key={index} currentUsername={this.props.currentUsername}
                                                   message={message}/>
                            })}
                        </div>
                        <div className="card-footer">
                            <div className="input-group">
                                <input className="form-control" value={this.state.newMessage} onChange={this.updateMessageContent} />
                                <div className="input-group-append">
                                    <button className="btn btn-primary" onClick={this.sendSimpleMessage}>Send</button>
                                </div>
                            </div>
                            <br/>
                            <div className="input-group">
                                <button className="btn btn-secondary float-right"
                                        onClick={() => this.setState({showModal: true})}>Send Species Message
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export interface IChatBoxProps {
    readonly currentUsername: string;
}

export interface IChatBoxState {
    newMessage: string,
    messages: Message[],
    showModal: boolean,
    toasts: { title: string, message: string }[]
}
