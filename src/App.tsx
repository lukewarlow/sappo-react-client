import React from 'react';
import ChatBox from "./ChatBox";
import TopBar from "./TopBar";
import LoginOrRegister from "./LoginOrRegister";
import {AccountApi} from "./api/AccountApi";

export default class App extends React.Component<IAppProps, IAppState> {
    state: IAppState = {
        isLoggedIn: false,
        currentUsername: ""
    };

    constructor(props: IAppProps) {
        super(props);

        this.successfulLogin = this.successfulLogin.bind(this);
        this.logout = this.logout.bind(this);
        let username: string | null = window.localStorage.getItem("username");
        if (username)
        {
            this.state.currentUsername = username;
            this.state.isLoggedIn = true;
        }
    }

    successfulLogin(username: string) {
        this.setState({isLoggedIn: true, currentUsername: username});
    }

    async logout() {
        await AccountApi.logout(this.state.currentUsername)
            .then(async _ => {
                this.setState({currentUsername: "", isLoggedIn: false});
                if (navigator.credentials && navigator.credentials.preventSilentAccess) {
                    await navigator.credentials.preventSilentAccess();
                }
                window.location.reload();
            });
    }

    render() {
        return (
            <div>
                <TopBar />
                <div className="container-fluid">
                    {!this.state.isLoggedIn && <LoginOrRegister onSuccessfulLogin={this.successfulLogin}/>}
                    {this.state.isLoggedIn && <ChatBox currentUsername={this.state.currentUsername}/>}
                    {this.state.isLoggedIn && <button className="btn btn-danger" onClick={this.logout}>Logout</button>}
                </div>
            </div>
        );
    }
}

export interface IAppProps {

}

export interface IAppState {
    isLoggedIn: boolean,
    currentUsername: string
}
