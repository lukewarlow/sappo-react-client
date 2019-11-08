import React from "react";
import {Map, Marker, TileLayer} from "react-leaflet";
import {SpeciesMessage} from "../api/MessagesApi";
import { LatLngExpression } from "leaflet";
import "./MapModal.css";

export class MapModal extends React.Component<IMapModalProps, any> {
    render(): JSX.Element {
        const lat = this.props.message.latitude;
        const lng = this.props.message.longitude;
        let position: LatLngExpression = {lat, lng};

        return (
            <div className="modal fade show d-block" id="mapModal" role="dialog" tabIndex={-1}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5>Map</h5>
                            <button type="button" className="ml-2 mb-1 close float-right" onClick={this.props.onClose}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <Map center={position} zoom={6}>
                                <TileLayer
                                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                <Marker position={position}/>
                            </Map>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export interface IMapModalProps {
    readonly message: SpeciesMessage,
    readonly onClose: () => void
}
