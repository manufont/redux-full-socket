import React, { Component } from 'react';

import { Auth, Counter } from './components';


class App extends Component {

  render() {
    return (
      <div className="App">
        <Auth />
        <Counter />
      </div>
    );
  }
}

export default App;
