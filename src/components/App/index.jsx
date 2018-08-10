import React, { Component } from 'react';

import MarkerInput from '../MarkerInput';
import ListMarkers from '../ListMarkers';
import Map from '../Map';

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-3 ml-auto">
            <MarkerInput />
            <ListMarkers />
          </div>
          <div className="col-7">
            <Map />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
