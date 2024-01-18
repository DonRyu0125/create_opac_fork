import React from 'react';
import MapGL from 'react-map-gl';

type Props = {};

const Map = (props: Props) => {
  return (
    <div className='w-1/2 h-1/2'>
      <MapGL
        initialViewState={{
          longitude: -122.4,
          latitude: 37.8,
          zoom: 14,
        }}
        style={{ width: 600, height: 400 }}
        mapStyle='mapbox://styles/mapbox/streets-v9'
      />
    </div>
  );
};

export default Map;
