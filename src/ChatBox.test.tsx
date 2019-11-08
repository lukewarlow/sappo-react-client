import React from 'react';
import ReactDOM from 'react-dom';
import ChatBox from "./ChatBox";

it('ChatBox renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ChatBox currentUsername="Example" />, div);
  ReactDOM.unmountComponentAtNode(div);
});
