import React, { Component } from 'react';

import MarkerInput from '../MarkerInput';
import ListMarkers from '../ListMarkers';
import Map from '../Map';

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-5">
            <MarkerInput />
            <ListMarkers />
          </div>
          <div className="col-7">
            <Map 
              isMarkerShown
              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBS90_Zy1Nhua_DFQeIAJzRBPV_YQt_7qY"
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `300px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
