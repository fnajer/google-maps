import React, { Component } from 'react';
import { YMaps, Map, Placemark } from "react-yandex-maps";

const YandexMap = (props) => (
  <YMaps>
    <Map
      state={{ 
        center: [55.76, 37.64], 
        zoom: 10 
      }}
      width="400px"
      height="400px"
    >
      <Placemark
        geometry={{ coordinates: [55.75, 37.57] }}
        properties={{
          hintContent: 'Значок Алексей',
          balloonContent: 'Beautiful marker'
        }}
      />
    </Map>
  </YMaps>
)

export default YandexMap;