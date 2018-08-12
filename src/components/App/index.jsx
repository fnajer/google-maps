import React, { PureComponent } from 'react';

import MarkerInput from '../MarkerInput';
import ListMarkers from '../ListMarkers';
import Map from '../Map';

/* TODO: Refactoring and Optimization preformance */
/* Complete? */

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

  handleInputSumbit = event => {
    event.preventDefault();
    let listMarkers = [...this.state.listMarkers];
    let cords;

    try {
      cords = this.checkCords(this.state.cords);
    } catch (error) {
      return alert('Coordinates not right. Try again.');
    }

    const newMarker = {
      id: this.getMarkerId(listMarkers.length),
      coordinates: cords,
    };

    listMarkers.push(newMarker);

    this.setState({
      cords: '',
      listMarkers,
    });
  }

  getMarkerId(lengthList) {
    if (lengthList > 0) {
      App.maxId += 1;
    } else {
      App.maxId = 0;
    }
    return App.maxId;
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

  deleteMarker = id => {
    let listMarkers = [...this.state.listMarkers];

    listMarkers.forEach((marker, index) => {
      if (marker.id === id) {
        listMarkers.splice(index, 1);

        this.setState({
          listMarkers,
        });

        return 0;
      }
    });
  }

  handleState = listMarkers => {
    this.setState({
      listMarkers,
    }); //[state]: state (типо перегрузка. что б можно было любой аргумент вызывать для change state)
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-4 ml-auto">
            <MarkerInput
              cords={this.state.cords}
              handleInputChange={this.handleInputChange}
              handleInputSumbit={this.handleInputSumbit}
            />
            <ListMarkers 
              listMarkers={this.state.listMarkers}
              handleClick={this.deleteMarker}
              handleState={this.handleState}
            />
          </div>
          <div className="col-7">
            <Map 
              listMarkers={this.state.listMarkers}
              handleState={this.handleState}
            />
          </div>
        </div>
      </div>
    );
  }
}
App.maxId = 0;

export default App;
