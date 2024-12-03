import React, { useState } from 'react';
import { MapContainer, Marker, TileLayer, Popup, LayersControl } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import 'leaflet/dist/leaflet.css';
import 'react-leaflet-markercluster/dist/styles.min.css';
import L from 'leaflet';

// Import custom PNG icons
import archiveIcon from './archive.png';
import bookIcon from './book.png';
import museumIcon from './museum.png';

// Dummy JSON data for filtering
const markersData = [
  { id: 1, position: [49.8397, 24.0297], category: 'history', name: 'Marker 1' },
  { id: 2, position: [52.2297, 21.0122], category: 'science', name: 'Marker 2' },
  { id: 3, position: [50.4501, 30.5234], category: 'art', name: 'Marker 3' },
  { id: 4, position: [48.8566, 2.3522], category: 'science', name: 'Marker 4' },
];

// Function to create an icon from PNG
const createIcon = (iconUrl: string): L.Icon => {
  return L.icon({
    iconUrl,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

// Icons for each category
const icons: Record<string, L.Icon> = {
  history: createIcon(bookIcon),
  science: createIcon(archiveIcon),
  art: createIcon(museumIcon),
};

const InteractiveMap: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const filteredMarkers = filter === 'all' ? markersData : markersData.filter(marker => marker.category === filter);

  return (
    <div className="w-full p-9 bg-gradient-to-r from-blue-100 via-white to-blue-50">
      <div className="mb-4 bg-blue-100 border border-blue-300 rounded-lg p-4 shadow-md">
        <label htmlFor="filter" className="mr-2 font-medium text-blue-700">
          Filter by Category:
        </label>
        <select
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded p-2 shadow-inner bg-blue-50 focus:ring-blue-300 focus:outline-none"
        >
          <option value="all">All</option>
          <option value="history">History</option>
          <option value="science">Science</option>
          <option value="art">Art</option>
        </select>
      </div>
      <MapContainer
        className="markercluster-map"
        center={[51.0, 19.0]}
        zoom={4}
        maxZoom={18}
        style={{ height: '90vh', borderRadius: '10px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}
      >
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="OpenStreetMap">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="OpenTopoMap">
            <TileLayer
              url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://opentopomap.org/">OpenTopoMap</a> contributors'
            />
          </LayersControl.BaseLayer>
        </LayersControl>
        {/* @ts-ignore */}
        <MarkerClusterGroup>
          {filteredMarkers.map((marker) => (
            <Marker
              key={marker.id}
              position={marker.position}
              icon={icons[marker.category] || createIcon('./fallback.png')}
            >
              <Popup>
                <div className="p-2 bg-white rounded">
                  <h3 className="font-bold text-blue-600">{marker.name}</h3>
                  <p className="text-gray-700">Category: {marker.category}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
};

export default InteractiveMap;
