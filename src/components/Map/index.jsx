import React, { PureComponent } from 'react';
import { YMaps, Map, Placemark, Polyline } from "react-yandex-maps";

class YandexMap extends PureComponent {

  render() {
    const { listMarkers, polyline, handleDragMarkers } = this.props;
    const mapState = {
      center: listMarkers.length > 0 ? listMarkers[listMarkers.length - 1].coordinates : [55.76, 37.64],
      zoom: 9
    };

    return (
      <YMaps>
        <Map
          state={mapState}
          width="400px"
          height="400px"
        >
          {
            listMarkers.map(marker => (
              <Placemark
                key={marker.id}
                geometry={{ coordinates: marker.coordinates }}
                properties={{
                  hintContent: `#${marker.id}`,
                  balloonContent: `Beautiful marker #${marker.id}`,
                }}
                options={{
                  draggable: true,
                }}
                //onGeometryChange={handleDragMarkers}
                onDragEnd={(event) => handleDragMarkers(event, marker.id)}
              />
            ))
          }
          <Polyline
            geometry={{
              coordinates: polyline,
            }}
            options={{
              strokeColor: '#000000',
              strokeWidth: 4,
            }}
          />
        </Map>
      </YMaps>
    );
  }
}

export default YandexMap;