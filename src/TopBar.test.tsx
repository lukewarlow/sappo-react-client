import React from 'react';
import ReactDOM from 'react-dom';
import TopBar from "./TopBar";

it('TopBar renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TopBar />, div);
  ReactDOM.unmountComponentAtNode(div);
});
