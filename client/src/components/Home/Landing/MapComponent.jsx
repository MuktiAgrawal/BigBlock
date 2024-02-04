// MapComponent.jsx
import React from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

const MapComponent = ({ onMarkerClick }) => {
  const [position, setPosition] = React.useState(null);

  const handleMapClick = (event) => {
    setPosition({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
    onMarkerClick({ lat: event.latLng.lat(), lng: event.latLng.lng() });
  };

  const WrappedMapComponent = withGoogleMap(() => (
    <GoogleMap
      defaultCenter={{ lat: 0, lng: 0 }}
      defaultZoom={2}
      onClick={handleMapClick}
      containerElement={<div style={{ height: '100%' }} />} 
      mapElement={<div style={{ height: '100%' }} />}
    >
      {position && <Marker position={position} />}
    </GoogleMap>
  ));

  return <WrappedMapComponent />;
};

export default MapComponent;
