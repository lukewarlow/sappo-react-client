import React from 'react';
import ReactDOM from 'react-dom';
import LoginOrRegister from "./LoginOrRegister";

it('LoginOrRegister renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<LoginOrRegister onSuccessfulLogin={username => null} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
