import React, { PureComponent } from 'react';

import MarkerInput from '../MarkerInput';
import ListMarkers from '../ListMarkers';
import Map from '../Map';

/* TODO: Refactoring and Optimization preformance */

class App extends PureComponent {
  constructor() {
    super();

    this.state = {
      cords: '',
      listMarkers: [{
        id: 0,
        coordinates: [55.76, 37.64],
      }],
      polyline: [[55.76, 37.64]],
    }
  }

  handleInputChange = (event) => {
    this.setState({
      cords: event.target.value,
    });
  }
  
  handleDragMarkers = (event, i) => {//.originalEvent.originalEvent.originalEvent.newCoordinates
    event.stopPropagation();
    const newCords = event.originalEvent.target.geometry._coordinates;

    let listMarkers = [...this.state.listMarkers];
    listMarkers.some((marker, index) => {
      if (marker.id === i) {
        listMarkers.splice(index, 1, {
          id: i,
          coordinates: newCords,
        });

        const polyline = this.getPolyline(listMarkers);

        this.setState({
          listMarkers,
          polyline,
        });

        return true;
      }
      return false;
    });
    return 0;
  }

  handleInputSumbit = (event) => {
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
    const polyline = this.getPolyline(listMarkers);

    this.setState(prevState => ({
      cords: '',
      listMarkers,
      polyline,
    }));
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

  getPolyline = listMarkers => {
    //let polyline;

    const polyline = listMarkers.map(marker => {
      return marker.coordinates;
    });

    return polyline;
  }

  deleteMarker = i => {
    let listMarkers = [...this.state.listMarkers];
    let polyline;
    //listMarkers.splice(i, 1);
    listMarkers.forEach((marker, index) => {
      if (marker.id === i) {
        listMarkers.splice(index, 1);
        polyline = this.getPolyline(listMarkers);
        this.setState({
          listMarkers,
          polyline
        });

        return 0;
      }
    });
  }

  handleState = listMarkers => {
    const polyline = this.getPolyline(listMarkers);
    this.setState({
      listMarkers,
      polyline,
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
              polyline={this.state.polyline}
              handleDragMarkers={this.handleDragMarkers}
            />
          </div>
        </div>
      </div>
    );
  }
}
App.maxId = 0;

export default App;
