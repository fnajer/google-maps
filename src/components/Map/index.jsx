import React, { Component } from 'react';
import { YMaps, Map, Placemark } from "react-yandex-maps";

class YandexMap extends React.PureComponent {
  render() {
    return (
      <YMaps>
      <Map
        state={{ 
          center: [55.76, 37.64], 
          zoom: 10 
        }}
        width="400px"
        height="400px"
      >{console.log(this.props.listMarkers[0])}
        {
          this.props.listMarkers.map(marker => (
            <Placemark
              key={marker.id}
              geometry={{ coordinates: marker.coordinates }}
              properties={{
                hintContent: 'Значок Алексей',
                balloonContent: 'Beautiful marker'
              }}
            />
          ))
        }
      </Map>
    </YMaps>
    );
  }
}

export default YandexMap;