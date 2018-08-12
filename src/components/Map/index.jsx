import React, { PureComponent } from 'react';
import { YMaps, Map, Placemark, Polyline } from "react-yandex-maps";

class YandexMap extends PureComponent {

  handleDragMarkers = (event, id) => {
    event.stopPropagation();
    const newCords = event.originalEvent.target.geometry._coordinates;

    let listMarkers = [...this.props.listMarkers];
    listMarkers.some((marker, index) => {
      if (marker.id === id) {
        listMarkers.splice(index, 1, {
          id: id,
          coordinates: newCords,
        });

        this.props.handleState(listMarkers);

        return true;
      }
      return false;
    });
    return 0;
  }

  getPolyline = listMarkers => {
    const polyline = listMarkers.map(marker => {
      return marker.coordinates;
    });

    return polyline;
  }

  render() {
    const { listMarkers } = this.props;
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
                onDragEnd={(event) => this.handleDragMarkers(event, marker.id)}
              />
            ))
          }
          <Polyline
            geometry={{
              coordinates: this.getPolyline(listMarkers),
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