import React from 'react';
import { render, unmountComponentAtNode  } from 'react-dom';
import { act } from "react-dom/test-utils";

import App from './App';
import TopStories from './Components/TopStories';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('renders a footer with info', () => {
  act(() => {
  	render(<App />, container);
  });
  expect(container.textContent).toMatch('Data provided by');
});

