import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const Map = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
  </GoogleMap>
))

// class Map extends Component {
//   constructor(props) {
//     super(props);

//     this.state =  {};
//   }
//   render() {
//     return (
//       <div className="">
        
//       </div>
//     );
//   }
// }

export default Map;