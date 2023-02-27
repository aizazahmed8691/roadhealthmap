import React, { useEffect } from 'react';
import { Map, GoogleApiWrapper } from 'react-google-maps';
const MapContainer = (props) => {
  useEffect(() => {
    console.log(props);
  }, []);

  return (
    <Map
      google={props.google}
      zoom={8}
      style={{ width: '100%', height: '100%', position: 'relative' }}
      initialCenter={{ lat: 37.7749, lng: -122.4194 }}
    />
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBXW3cDat5ckzuuglIlL7AYrIr0SXpis1Q'
})(MapContainer);