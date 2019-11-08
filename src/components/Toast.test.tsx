import React from 'react';
import ReactDOM from 'react-dom';
import Toast from "./Toast";

it('Toast renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Toast title="Hello" message="Example" />, div);
  ReactDOM.unmountComponentAtNode(div);
});
