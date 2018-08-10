import React, { Component } from 'react';

import MarkerInput from '../MarkerInput';
import ListMarkers from '../ListMarkers';
import Map from '../Map';

class App extends Component {
  constructor() {
    super();

    this.state = {
      cords: '',
      listMarkers: [{
        id: 0,
        coordinates: [55.76, 37.64],
      }],
    }
  }

  handleInputChange = (event) => {
    this.setState({
      cords: event.target.value,
    });
  }

  handleInputSumbit = (event) => {
    event.preventDefault();
    const listMarkers = this.state.listMarkers;

    const newMarker = {
      id: listMarkers[listMarkers.length - 1].id + 1,
      coordinates: this.state.cords.split(' '),
    };
    newMarker[0] = +newMarker[0];
    newMarker[1] = +newMarker[1];

    this.setState(prevState => ({
      cords: '',
      listMarkers: [...prevState.listMarkers, newMarker],
    }));
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-3 ml-auto">
            <MarkerInput
              cords={this.state.cords}
              handleInputChange={this.handleInputChange}
              handleInputSumbit={this.handleInputSumbit}
            />
            <ListMarkers 
            
            />
          </div>
          <div className="col-7">
            <Map 
              listMarkers={this.state.listMarkers}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
