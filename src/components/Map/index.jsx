import React, { PureComponent } from 'react';
import { YMaps, Map, Placemark } from "react-yandex-maps";

class YandexMap extends PureComponent {
  constructor(props) {
    super(props);
    
    this.state = {
      bounds: null,
      collection: null,
      ymaps: null,
    };
  }

  handleInstance(map) {
    //console.log(map);
    // if (this.state.collection) {
    //   map.setBounds(this.state.collection.getBounds());
    // }
  }

  addToCollection(marker) {
    if (this.state.collection) {
      this.state.collection.add(marker);

      this.setState({
        bounds: this.state.collection.getBounds(),
      });
    }
   console.log(marker);
   
  }

  createCollection(ymaps) {
    const collection = new ymaps.GeoObjectCollection();
console.log(ymaps);
    this.setState({
      ymaps: ymaps
    });
  }

  render() {
    return (
      <YMaps instanceRef={(ymaps) => this.createCollection(ymaps)}>
        <Map
          state={{ 
            center: this.props.listMarkers[this.props.listMarkers.length - 1].coordinates, //[55.76, 37.64]
            zoom: 9,
            bounds: this.state.bounds,
          }}
          width="400px"
          height="400px"
          instanceRef={(maps) => this.handleInstance(maps)}
        >
          {
            this.props.listMarkers.map(marker => (
              <Placemark
                key={marker.id}
                geometry={{ coordinates: marker.coordinates }}
                properties={{
                  hintContent: 'Значок Алексей',
                  balloonContent: 'Beautiful marker',
                }}
                instanceRef={(marker) => this.addToCollection(marker)}
              />
            ))
          }
        </Map>
      </YMaps>
    );
  }
}

export default YandexMap;