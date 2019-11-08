import React from 'react';
import ReactDOM from 'react-dom';
import MessageBox from "./MessageBox";
import renderer from "react-test-renderer";
import {emptyMessage} from "../api/MessagesApi";

it('MessageBox renders without crashing', () => {
  const div = document.createElement('div');
  const username = "Test User";
  ReactDOM.render(<MessageBox message={emptyMessage(username)} currentUsername={username}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('MessageBox renders correctly', () => {
  const username = "Test User";
  let realDateNow = Date.now.bind(global.Date);
  let dateNowStub = jest.fn(() => 1573080910769);
  global.Date.now = dateNowStub;
  let message = emptyMessage(username);
  message.timestamp = new Date("2019-11-01");
  message.content = "Hello Everyone";
  const tree = renderer
      .create(<MessageBox message={message} currentUsername={username}/>)
      .toJSON();

  expect(tree).toMatchSnapshot();
  expect(dateNowStub).toHaveBeenCalled();
  global.Date.now = realDateNow;
});
