import React from 'react';
import ReactDOM from 'react-dom';
import SendSpeciesMessageModal from "./SendSpeciesMessageModal";

it('SendSpeciesMessageModal renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SendSpeciesMessageModal onClose={() => {}} currentUsername="Example"/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
