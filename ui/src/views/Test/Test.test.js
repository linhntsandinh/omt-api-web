/**
 * Created by Vu Tien Dai on 24/06/2018.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import Test from './Test';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Test />, div);
  ReactDOM.unmountComponentAtNode(div);
});
