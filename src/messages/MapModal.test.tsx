import React from 'react';
import ReactDOM from 'react-dom';
import {MapModal} from "./MapModal";
import {SpeciesMessage} from "../api/MessagesApi";

it('MapModal renders without crashing', () => {
  const div = document.createElement('div');
  let message: SpeciesMessage = {
    abundance: 0,
    content: "",
    image: "",
    latitude: 0,
    longitude: 0,
    species: "",
    temperature: 0,
    timestamp: new Date(),
    username: ""
  };
  ReactDOM.render(<MapModal message={message} onClose={() => {}}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
