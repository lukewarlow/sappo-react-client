import React from "react";
import {MessagesApi, SpeciesMessage} from "../api/MessagesApi";

export default class SendSpeciesMessageModal extends React.Component<ISpeciesMessageModalProps, ISpeciesMessageModalState> {
    state: ISpeciesMessageModalState = {
        geolocationAllowed: false,
        message: {
            username: this.props.currentUsername,
            content: "",
            latitude: 0,
            longitude: 0,
            species: "",
            temperature: 25,
            abundance: 1,
            timestamp: new Date(),
            image: ""
        },
        error: ""
    };

    constructor(props: ISpeciesMessageModalProps) {
        super(props);
        this.getLocation = this.getLocation.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.handleImageUpload = this.handleImageUpload.bind(this);
    }

    handleFieldChange(field: string, type: string = "string"): (e: React.ChangeEvent<HTMLInputElement>) => void {
        return (e: React.ChangeEvent<HTMLInputElement>) => {
            let message = this.state.message;
            // @ts-ignore
            message[field] = type === "string" ? e.target.value : +e.target.value;
            this.setState({message: message});
        };
    }

    handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
        let files = e.target.files;
        if (files && files.length > 0) {
            let file = files[0];
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                let base64 = reader.result!!;
                let message = this.state.message;
                message.image = base64.toString();
                this.setState({message: message});
            }
        }
    }

    async sendMessage(e: any) {
        await MessagesApi.sendMessage(this.state.message)
            .then(_ => {
                this.props.onClose()
            })
            .catch(e => {
                if (e.status === 413) {
                    this.setState({error: "File is too large to upload. Maximum is about 40mb."});
                } else {
                    this.setState({error: "Server error"});
                }
            });
    }

    render() {
        return (
            <div className="modal fade show d-block" role="dialog" tabIndex={-1} style={{overflowY: "auto"}}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5>Send Message</h5>
                        </div>
                        <div className="modal-body">
                            {this.state.error && <div className="alert alert-danger">{this.state.error}</div>}
                            {!this.state.geolocationAllowed && <div className="form-group">
                                <button className="btn btn-primary" onClick={this.getLocation}>Use Current Location
                                </button>
                            </div>}

                            <div className="form-group">
                                <label>Latitude</label>
                                <input type="number" className="form-control" disabled={this.state.geolocationAllowed}
                                       value={this.state.message.latitude}
                                       onChange={this.handleFieldChange("latitude", "number")}/>
                            </div>
                            <div className="form-group">
                                <label>Longitude</label>
                                <input type="number" className="form-control" disabled={this.state.geolocationAllowed}
                                       value={this.state.message.longitude}
                                       onChange={this.handleFieldChange("longitude", "number")}/>
                            </div>
                            <div className="form-group">
                                <label>Species</label>
                                <input className="form-control" value={this.state.message.species}
                                       onChange={this.handleFieldChange("species")}/>
                            </div>
                            <div className="form-group">
                                <label>Temperature</label>
                                <div className="input-group">
                                    <input type="number" className="form-control" value={this.state.message.temperature}
                                           onChange={this.handleFieldChange("temperature", "number")}/>
                                    <div className="input-group-append">
                                        <span className="bg-light">°C</span>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Abundance</label>
                                <input type="number" className="form-control" value={this.state.message.abundance}
                                       onChange={this.handleFieldChange("abundance", "number")}/>
                            </div>
                            <div className="form-group">
                                <label>Content</label>
                                <input className="form-control" value={this.state.message.content}
                                       onChange={this.handleFieldChange("content")}/>
                            </div>
                            <div className="form-group">
                                <label>Image</label>
                                <input accept="image/png, image/jpeg" className="form-control-file" type="file" onChange={this.handleImageUpload}/>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={this.props.onClose}>Cancel</button>
                            <button className="btn btn-primary" onClick={this.sendMessage}>Send</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position: Position) => {
                    let message = this.state.message;
                    message.latitude = position.coords.latitude;
                    message.longitude = position.coords.longitude;

                    this.setState({
                        geolocationAllowed: true,
                        message: message
                    });
                },
                (error: PositionError) => {
                    this.setState({geolocationAllowed: false});
                    if (error.code === error.PERMISSION_DENIED) {
                        console.log("Geolocation permissions denied");
                    }
                }
            );
        }
    }
}

export interface ISpeciesMessageModalProps {
    readonly onClose: () => void;
    readonly currentUsername: string;
}

export interface ISpeciesMessageModalState {
    geolocationAllowed: boolean,
    message: SpeciesMessage,
    error: string;
}
