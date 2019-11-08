import React from "react";
import {AccountApi} from "./api/AccountApi";

export default class LoginOrRegister extends React.Component<ILoginOrRegisterProps, ILoginOrRegisterState> {
    state: ILoginOrRegisterState = {
        username: "",
        password: "",
        error: "",
        auto: false
    };

    constructor(props: ILoginOrRegisterProps) {
        super(props);

        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);

        if (navigator.credentials) {
            navigator.credentials.get({password: true, mediation: "optional"} as CredentialRequestOptions)
                .then((cred: Credential | null) => {
                    if (cred) {
                        let username = cred.id;
                        if (cred.type == "password")
                        {
                            let password = (cred as any).password;
                            this.setState({username: username, password: password, auto: true});
                            this.login();
                        }
                    }

                })
                .catch(err => {
                    console.error(err);
                });
        }
    }

    async register() {
        this.setState({error: ""});
        await AccountApi.register(this.state.username, this.state.password)
            .then(async _ => {
                await this.storePasswordCredentials();
                this.props.onSuccessfulLogin(this.state.username);
            })
            .catch((e: any) => {
                if (e.status && e.status == 409) {
                    this.setState({error: "Sorry this username is already taken."});
                } else {
                    this.setState({error: "Server error."});
                }
            });
    }

    async storePasswordCredentials() {
        if (navigator.credentials) {
            // @ts-ignore
            let cred = new PasswordCredential({
                id: this.state.username,
                password: this.state.password
            });
            await navigator.credentials.store(cred);
        }
    }

    async login() {
        this.setState({error: ""});
        await AccountApi.login(this.state.username, this.state.password)
            .then(async _ => {
                if (!this.state.auto) {
                    await this.storePasswordCredentials();
                }

                this.props.onSuccessfulLogin(this.state.username);
            })
            .catch((e: any) => {
                if (e.status) {
                    switch (e.status) {
                        case 401: {
                            this.setState({error: "Incorrect password."});
                            break;
                        }
                        case 404: {
                            this.setState({error: "Username not registered."});
                        }
                    }
                } else {
                    this.setState({error: "Server error."});
                }
            });
    }

    onUsernameChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({username: e.target.value});
    }

    onPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({password: e.target.value});
    }

    render() {
        return (
            <div>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" className="form-control" id="username" onChange={this.onUsernameChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" onChange={this.onPasswordChange}/>
                </div>
                {this.state.error && <div className="alert alert-danger">
                    {this.state.error}
                </div>}
                <button className="btn btn-primary mr-1" onClick={this.register}>Register</button>
                <button className="btn btn-primary" onClick={this.login}>Login</button>
            </div>
        )
    }
}

export interface ILoginOrRegisterProps {
    readonly onSuccessfulLogin: (username: string) => any;
}

export interface ILoginOrRegisterState {
    username: string;
    password: string;
    error: string;
    auto: boolean;
}
