import React, { useState } from 'react'
import { MapContainer, Marker, TileLayer, Popup, LayersControl } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-markercluster'
import 'leaflet/dist/leaflet.css'
import 'react-leaflet-markercluster/dist/styles.min.css'
import L from 'leaflet'
import archiveIcon from './archive.png'
import libraryIcon from './book.png'
import museumIcon from './museum.png'
import useConstants from '@/hooks/useConstants'

const COLOR_MAP: any = {
	library: 'rgba(255, 0, 0, 0.7)',
	archive: 'rgba(12, 74, 110, 0.7)',
	museum: 'rgba(255, 255, 0, 0.7)',
}

// Add background circle to icons using CSS
const createIcon = (iconUrl: string, bgColor: string): L.DivIcon => {
	return L.divIcon({
		className: 'custom-icon',
		html: `
      <div style="
        background: ${bgColor};
        width: 20px;
        height: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
      ">
        <img src="${iconUrl}" style="width: 16px; height: 16px;" />
      </div>
    `,
		iconSize: [16, 16],
		iconAnchor: [16, 16],
		popupAnchor: [0, -16],
	})
}

const icons: Record<string, L.DivIcon> = {
	library: createIcon(libraryIcon, COLOR_MAP.library),
	archive: createIcon(archiveIcon, COLOR_MAP.archive),
	museum: createIcon(museumIcon, COLOR_MAP.museum),
}

const createClusterIcon = function (cluster: any, iconUrl: string, bgColor: string) {
	return L.divIcon({
		className: 'custom-icon',
		html: `
      <div style="
        background: ${bgColor};
        width: 4vw;
        height: 8vh;
        display: flex;
		flex-direction:column;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
      ">
      <div><img src="${iconUrl}" style="width: 20px; height: 20px;" /></div>
		<div>${cluster.getChildCount()}</div>
      </div>
    `,
	})
}

const markersData = [
	{ id: 1, position: [49.159556, -122.724923], category: 'library', name: 'Marker 1' },
	{ id: 2, position: [49.084539, -122.727088], category: 'archive', name: 'Marker 2' },
	{ id: 3, position: [49.093413, -122.892859], category: 'museum', name: 'Marker 3' },
	{ id: 4, position: [49.09398, -122.838094], category: 'archive', name: 'Marker 4' },
	{ id: 5, position: [49.009094, -122.792537], category: 'library', name: 'Marker 5' },
	{ id: 6, position: [49.068806, -122.804678], category: 'museum', name: 'Marker 6' },
	{ id: 7, position: [49.061598, -122.855615], category: 'library', name: 'Marker 7' },
	{ id: 8, position: [49.012973, -122.839129], category: 'archive', name: 'Marker 8' },
	{ id: 9, position: [49.07587, -122.863916], category: 'library', name: 'Marker 9' },
	{ id: 10, position: [49.108439, -122.843965], category: 'archive', name: 'Marker 10' },
	{ id: 6, position: [49.068806, -122.804678], category: 'museum', name: 'Marker 6' },
	{ id: 6, position: [49.068806, -122.804678], category: 'museum', name: 'Marker 6' },
	{ id: 6, position: [49.068806, -122.804678], category: 'museum', name: 'Marker 6' },
	{ id: 6, position: [49.068806, -122.804678], category: 'museum', name: 'Marker 6' },
	{ id: 6, position: [49.068806, -122.804678], category: 'museum', name: 'Marker 6' },
	{ id: 6, position: [49.068806, -122.804678], category: 'museum', name: 'Marker 6' },
	{ id: 6, position: [49.068806, -122.804678], category: 'museum', name: 'Marker 6' },
	{ id: 6, position: [49.068806, -122.804678], category: 'museum', name: 'Marker 6' },
	{ id: 6, position: [49.068806, -122.804678], category: 'museum', name: 'Marker 6' },
	{ id: 6, position: [49.068806, -122.804678], category: 'museum', name: 'Marker 6' },
	{ id: 6, position: [49.068806, -122.804678], category: 'museum', name: 'Marker 6' },
	{ id: 6, position: [49.068806, -122.804678], category: 'museum', name: 'Marker 6' },
	{ id: 6, position: [49.068806, -122.804678], category: 'museum', name: 'Marker 6' },
	{ id: 6, position: [49.068806, -122.804678], category: 'museum', name: 'Marker 6' },
	{ id: 6, position: [49.068806, -122.804678], category: 'museum', name: 'Marker 6' },
]

const InteractiveMap: React.FC = () => {
	const { message } = useConstants()
	const [filter, setFilter] = useState<string>('all')
	const filteredMarkers =
		filter === 'all' ? markersData : markersData.filter((marker) => marker.category === filter)
	const libraryMarkers = filteredMarkers.filter((marker) => marker.category === 'library')
	const archiveMarkers = filteredMarkers.filter((marker) => marker.category === 'archive')
	const museumMarkers = filteredMarkers.filter((marker) => marker.category === 'museum')

	return (
		<div className="w-full">
			<div
				className={
					'relative flex justify-left items-center bg-primary h-[80px] rounded p-3 mb-2 '
				}>
				<label htmlFor="filter" className="mr-2 font-xl  text-white">
					{message.filterBy}
				</label>
				<select
					id="filter"
					value={filter}
					onChange={(e) => setFilter(e.target.value)}
					className="border rounded p-2 shadow-inner bg-blue-50 focus:ring-blue-300 focus:outline-none">
					<option value="all">All</option>
					<option value="library">Library</option>
					<option value="archive">Archive</option>
					<option value="museum">Museum</option>
				</select>
			</div>
			<MapContainer
				className="markercluster-map"
				center={[49.1044, -122.8011]}
				zoom={12}
				maxZoom={18}
				style={{
					height: '75vh',
					borderRadius: '10px',
					boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
				}}>
				<LayersControl position="topright">
					{/* OpenStreetMap Default */}
					<LayersControl.BaseLayer checked name="Street Map">
						<TileLayer
							url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
							attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
						/>
					</LayersControl.BaseLayer>

					{/* OpenTopoMap */}
					<LayersControl.BaseLayer name="Topo Map">
						<TileLayer
							url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
							attribution='&copy; <a href="https://opentopomap.org/">OpenTopoMap</a> contributors'
						/>
					</LayersControl.BaseLayer>

					{/* Carto Light Map */}
					<LayersControl.BaseLayer name="Light Map">
						<TileLayer
							url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
							attribution='&copy; <a href="https://www.carto.com/">CARTO</a>'
						/>
					</LayersControl.BaseLayer>

					{/* Esri World Imagery */}
					<LayersControl.BaseLayer name="Satellite Map">
						<TileLayer
							url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
							attribution="Tiles &copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics, and the GIS User Community"
						/>
					</LayersControl.BaseLayer>
				</LayersControl>

				{/* @ts-ignore */}
				<MarkerClusterGroup
					spiderfyDistanceMultiplier={2}
					showCoverageOnHover={false}
					iconCreateFunction={(cluster) =>
						createClusterIcon(cluster, libraryIcon, COLOR_MAP.library)
					}>
					{libraryMarkers.map((marker: any) => (
						<Marker key={marker.id} position={marker.position} icon={icons['library']}>
							<Popup>
								<div className="p-2 bg-white rounded">
									<h3 className="font-bold text-blue-600">{marker.name}</h3>
									<p className="text-gray-700">Category: {marker.category}</p>
								</div>
							</Popup>
						</Marker>
					))}
				</MarkerClusterGroup>
				{/* @ts-ignore */}
				<MarkerClusterGroup
					spiderfyDistanceMultiplier={2}
					showCoverageOnHover={false}
					iconCreateFunction={(cluster) =>
						createClusterIcon(cluster, archiveIcon, COLOR_MAP.archive)
					}>
					{archiveMarkers.map((marker: any) => (
						<Marker key={marker.id} position={marker.position} icon={icons['archive']}>
							<Popup>
								<div className="p-2 bg-white rounded">
									<h3 className="font-bold text-blue-600">{marker.name}</h3>
									<p className="text-gray-700">Category: {marker.category}</p>
								</div>
							</Popup>
						</Marker>
					))}
				</MarkerClusterGroup>
				{/* @ts-ignore */}
				<MarkerClusterGroup
					spiderfyDistanceMultiplier={2}
					showCoverageOnHover={false}
					iconCreateFunction={(cluster) =>
						createClusterIcon(cluster, museumIcon, COLOR_MAP.museum)
					}>
					{museumMarkers.map((marker: any) => (
						<Marker key={marker.id} position={marker.position} icon={icons['museum']}>
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
	)
}

export default InteractiveMap
