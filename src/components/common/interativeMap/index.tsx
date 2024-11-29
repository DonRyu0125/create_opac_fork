import React, { useState, useEffect } from 'react'
import {
	MapContainer,
	TileLayer,
	Marker,
	Circle,
	Popup,
	useMapEvent,
	Tooltip,
	useMap,
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerIconShadow from 'leaflet/dist/images/marker-shadow.png'

const DefaultIcon = L.icon({
	iconUrl: markerIcon,
	shadowUrl: markerIconShadow,
})
L.Marker.prototype.options.icon = DefaultIcon

interface Pin {
	id: number
	lat: number
	lng: number
	category: string
	description: string
}

const generatePins = (): Pin[] => {
	const pins: Pin[] = []
	const categories = ['A', 'B', 'C']

	for (let category of categories) {
		for (let i = 0; i < 10; i++) {
			pins.push({
				id: pins.length,
				lat: 49.28 + Math.random() * 0.1 - 0.05,
				lng: -122.79 + Math.random() * 0.1 - 0.05,
				category,
				description: `Description for ${category} Pin ${i}`,
			})
		}
	}
	return pins
}

const initialData = generatePins()

const InteractiveMap: React.FC = () => {
	const [pins, setPins] = useState<Pin[]>([])
	const [zoomLevel, setZoomLevel] = useState<number>(12)

	const categoryLocations = [
		{ category: 'A', center: [49.35, -122.8] },
		{ category: 'B', center: [49.25, -122.8] },
		{ category: 'C', center: [49.28, -122.7] },
	]

	const handleZoomChange = (map: L.Map) => {
		const zoom = map.getZoom()
		setZoomLevel(zoom)
	}

	const MapEventHandler: React.FC = () => {
		const map = useMapEvent('zoomend', () => handleZoomChange(map))
		return null
	}

	useEffect(() => {
		if (zoomLevel >= 14) {
			setPins(initialData)
		} else {
			setPins([])
		}
	}, [zoomLevel])

	return (
		<MapContainer
			center={[49.2827, -122.7919]}
			zoom={12}
			style={{ width: '100%', height: '600px' }}
			whenCreated={(map) => handleZoomChange(map)}>
			<TileLayer
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				attribution="&copy; OpenStreetMap contributors"
			/>
			<MapEventHandler />
			{categoryLocations.map((group, index) => {
				const categoryPins = initialData.filter((pin) => pin.category === group.category)
				const pinCount = categoryPins.length
				const circleColor =
					group.category === 'A' ? 'blue' : group.category === 'B' ? 'green' : 'red'
				return (
					<React.Fragment key={index}>
						<Circle
							center={group.center}
							radius={3000}
							pathOptions={{
								color: circleColor,
								fillColor: circleColor,
								fillOpacity: 0.3,
							}}
						/>
						<Tooltip
							direction="center"
							offset={[0, 0]}
							permanent
							className="circle-text-tooltip">
							{group.category}
						</Tooltip>
						{zoomLevel < 14 && pinCount > 0 && (
							<Tooltip direction="center" offset={[0, 0]} permanent>
								{pinCount} Pins
							</Tooltip>
						)}
						{zoomLevel >= 14 &&
							categoryPins.map((pin) => (
								<Marker key={pin.id} position={[pin.lat, pin.lng]}>
									<Popup>{pin.description}</Popup>
								</Marker>
							))}
					</React.Fragment>
				)
			})}
		</MapContainer>
	)
}

export default InteractiveMap
