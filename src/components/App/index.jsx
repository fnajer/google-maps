import React, { PureComponent } from 'react';

import MarkerInput from '../MarkerInput';
import ListMarkers from '../ListMarkers';
import Map from '../Map';

class App extends PureComponent {
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
    let cords;

    try {
      cords = this.checkCords(this.state.cords);
    } catch (error) {
      return alert('Coordinates not right. Try again.');
    }

    const newMarker = {
      id: listMarkers[listMarkers.length - 1].id + 1,
      coordinates: cords,
    };

    this.setState(prevState => ({
      cords: '',
      listMarkers: [...prevState.listMarkers, newMarker],
    }));
  }

  checkCords(cords) {
    const arrCords = cords.split(' ');

    if (arrCords.length > 2 || 
        arrCords.length < 2 ||
        isNaN(arrCords[0]) ||
        isNaN(arrCords[1]) ||
        arrCords[0] === '' ||
        arrCords[1] === ''
    ) throw new Error();

    arrCords[0] = +arrCords[0];
    arrCords[1] = +arrCords[1];

    return arrCords;
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
