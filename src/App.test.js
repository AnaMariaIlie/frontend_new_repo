import React from 'react';
import ReactDOM from 'react-dom';
import Appp from './Appp';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Appp />, div);
  ReactDOM.unmountComponentAtNode(div);
});
