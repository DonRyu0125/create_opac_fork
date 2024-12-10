import React, { useEffect, useState } from 'react'
import { MapContainer, Marker, TileLayer, Popup, LayersControl } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-markercluster'
import 'leaflet/dist/leaflet.css'
import 'react-leaflet-markercluster/dist/styles.min.css'
import L from 'leaflet'
import archiveIcon from './archive.png'
import libraryIcon from './book.png'
import museumIcon from './museum.png'
import useConstants from '@/hooks/useConstants'
import { Label } from '@radix-ui/react-dropdown-menu'
import CollapseList from '../CollapseList'
import CheckboxWithLabel from '../CheckboxWithLabel'
import axios from 'axios'
import X2JS from 'x2js'
import Spinner from '../event-calendar/Spinner'
import markersData from './dummy02.json'

const DB_TYPE_MAP = {
	library: 'Library',
	archive: 'Archive',
	museum: 'Museum',
}

const COLOR_MAP: any = {
	library: 'rgba(255, 0, 0, 0.7)',
	archive: 'rgba(12, 74, 110, 0.7)',
	museum: 'rgba(255, 255, 0, 0.7)',
}

interface DataType {
	DATABASE_TYPE: string
	ACCESSION_NUMBER: string
	DESCRIPTION: string
	LEGAL_TITLE: string
	DECIMAL_LATITUDE: string
	DECIMAL_LONGITUD: string
	ORIGIN_COUNTRY: string
	ORIGIN_PRV_STATE: string
	ORIGIN_CITY: string
}

type LocationData = {
	countries: string[]
	provinces: string[]
	cities: string[]
}

type SelectType = {
	[key: string]: number
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

const InteractiveMap: React.FC = () => {
	const { message } = useConstants()
	const [allData, setAllData] = useState<any>([])
	const [filteredData, setFilteredData] = useState<any>([])
	const [loading, setLoading] = useState(false)
	const [selectType, setSelectedType] = useState<SelectType>({})
	const [currentFilter, setCurrentFilter] = useState<any[]>([])

	const [selectedDatabases, setSelectedDatabases] = useState<string[]>([])
	const [selectedCountries, setSelectedCountries] = useState<string[]>([])
	const [selectedProvinces, setSelectedProvinces] = useState<string[]>([])
	const [selectedCities, setSelectedCities] = useState<string[]>([])

	const [ckTypes, setCkTypes] = useState<any>({
		databases: [],
		countries: [],
		provinces: [],
		cities: [],
	})
	useEffect(() => {
		fetch_get()
	}, [])

	useEffect(() => {
		if (
			selectedDatabases.length > 0 ||
			selectedCountries.length > 0 ||
			selectedProvinces.length > 0 ||
			selectedCities.length > 0
		) {
			const nData = allData.filter((item: any) => {
				const matchesDatabase =
					selectedDatabases.length > 0
						? selectedDatabases.includes(item.DATABASE_TYPE)
						: true
				const matchesCountry =
					selectedCountries.length > 0
						? selectedCountries.includes(item.ORIGIN_COUNTRY)
						: true
				const matchesProvince =
					selectedProvinces.length > 0
						? selectedProvinces.includes(item.ORIGIN_PRV_STATE)
						: true
				const matchesCity =
					selectedCities.length > 0 ? selectedCities.includes(item.ORIGIN_CITY) : true

				return matchesDatabase && matchesCountry && matchesProvince && matchesCity
			})
			setFilteredData(nData)
		} else {
			setFilteredData(allData)
		}
	}, [selectedDatabases, selectedCountries, selectedProvinces, selectedCities, allData])

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.id) return
		let map = { ...selectType }
		if (map[e.target.id] > 0) {
			delete map[e.target.id]
		} else {
			map[e.target.id] = 1
		}
		setSelectedType(map)
		setCurrentFilter(Object.keys(map))
	}

	const handleDatabaseChange = (database: string) => {
		setSelectedDatabases((prev) =>
			prev.includes(database) ? prev.filter((d) => d !== database) : [...prev, database]
		)
	}

	const handleCountryChange = (country: string) => {
		setSelectedCountries((prev) =>
			prev.includes(country) ? prev.filter((c) => c !== country) : [...prev, country]
		)
	}

	const handleProvinceChange = (province: string) => {
		setSelectedProvinces((prev) =>
			prev.includes(province) ? prev.filter((p) => p !== province) : [...prev, province]
		)
	}

	const handleCityChange = (city: string) => {
		setSelectedCities((prev) =>
			prev.includes(city) ? prev.filter((c) => c !== city) : [...prev, city]
		)
	}

	const fetch_get = async () => {
		// setLoading(true)
		// let HOME_SESSID = getSessionID()
		// const response = await axios.get(
		// 	`${HOME_SESSID}?SEARCH&REPORT=WEB_UNION_SUM_MAP&APPLICATION=UNION_VIEW&DATABASE=UNION_VIEW&EXP=%2B%2B%40`,
		// 	{
		// 		headers: {
		// 			Accept: 'application/xml',
		// 		},
		// 	}
		// )
		// const x2js = new X2JS()
		// const jsonData = x2js.xml2js(response.data)
		// const updatedRecords = jsonData?.xml?.record.map((record) => {
		// 	if (!isNaN(record.DECIMAL_LATITUDE) && !isNaN(record.DECIMAL_LONGITUD)) {
		// 		record.DECIMAL_LATITUDE = parseFloat(record.DECIMAL_LATITUDE)
		// 		record.DECIMAL_LONGITUD = parseFloat(record.DECIMAL_LONGITUD)
		// 	}
		// 	return record
		// })
		setAllData(markersData)
		setFilteredData(markersData)
		const databases = Array.from(new Set(markersData.map((item) => item.DATABASE_TYPE)))
		const countries = Array.from(new Set(markersData.map((item) => item.ORIGIN_COUNTRY)))
		const provinces = Array.from(new Set(markersData.map((item) => item.ORIGIN_PRV_STATE)))
		const cities = Array.from(new Set(markersData.map((item) => item.ORIGIN_CITY)))
		setCkTypes({ databases, countries, provinces, cities })
		// setLoading(false)
	}

	console.log('selectedCountries', selectedCountries)
	console.log('selectedProvinces', selectedProvinces)
	console.log('selectedCities', selectedCities)

	// const getUniqueValues = (field: string) => {
	// 	const uniqueValues = Array.from(new Set(filteredData.map((item:any) => item[field])))
	// 	return uniqueValues
	// }

	return (
		<div className="w-full relative flex">
			{loading && (
				<div className="absolute z-[1000] w-full h-full">
					<Spinner height={'h-full'} spinHeight={'h-10'} spinWidth={'w-10'} />
				</div>
			)}
			<div className="w-1/4 rounded border border-primary p-2 overflow-y-auto custom-scrollbar mr-2">
				<Label className="font-bold">{message.filterBy}</Label>
				<div className="flex flex-col space-y-4 max-h-[87vh] ">
					<CollapseList title={'Database'}>
						<div className="space-y-3 border-t p-4">
							{ckTypes?.databases.map((item: string, key: number) => (
								<CheckboxWithLabel
									key={key}
									callback={() => handleDatabaseChange(item)}
									label={item}
									checked={selectedCountries.includes(item)}
								/>
							))}

						</div>
					</CollapseList>
					<CollapseList title={'Country'} expand={true}>
						<div className="space-y-3 border-t p-4">
							{ckTypes?.countries.map((item: string, key: number) => (
								<CheckboxWithLabel
									key={key}
									callback={() => handleCountryChange(item)}
									label={item}
									checked={selectedCountries.includes(item)}
								/>
							))}
						</div>
					</CollapseList>

					<CollapseList title={'Province'} expand={true}>
						<div className="space-y-3 border-t p-4">
							{ckTypes?.provinces.map((item: string, key: number) => (
								<CheckboxWithLabel
									key={key}
									callback={() => handleProvinceChange(item)}
									label={item}
									checked={selectedProvinces.includes(item)}
								/>
							))}
						</div>
					</CollapseList>

					<CollapseList title={'City'} expand={true}>
						<div className="space-y-3 border-t p-4">
							{ckTypes?.cities.map((item: string, key: number) => (
								<CheckboxWithLabel
									key={key}
									callback={() => handleCityChange(item)}
									label={item}
									checked={selectedCities.includes(item)}
								/>
							))}
						</div>
					</CollapseList>
				</div>
			</div>
			<div className="w-3/4">
				<MapContainer
					className="markercluster-map"
					center={[49.1044, -122.8011]}
					zoom={3}
					maxZoom={18}
					style={{
						height: '90vh',
						borderRadius: '10px',
						boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
					}}>
					<LayersControl position="topright">
						<LayersControl.BaseLayer checked name="Street Map">
							<TileLayer
								url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
								attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
							/>
						</LayersControl.BaseLayer>
						<LayersControl.BaseLayer name="Topo Map">
							<TileLayer
								url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
								attribution='&copy; <a href="https://opentopomap.org/">OpenTopoMap</a> contributors'
							/>
						</LayersControl.BaseLayer>
						<LayersControl.BaseLayer name="Light Map">
							<TileLayer
								url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
								attribution='&copy; <a href="https://www.carto.com/">CARTO</a>'
							/>
						</LayersControl.BaseLayer>
						<LayersControl.BaseLayer name="Satellite Map">
							<TileLayer
								url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
								attribution="Tiles &copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics, and the GIS User Community"
							/>
						</LayersControl.BaseLayer>
					</LayersControl>
					<MarkerClusterGroup
						key={`L${filteredData.filter((item) => item.DATABASE_TYPE === DB_TYPE_MAP.library)}`}
						spiderfyDistanceMultiplier={2}
						showCoverageOnHover={false}
						iconCreateFunction={(cluster) =>
							createClusterIcon(cluster, archiveIcon, COLOR_MAP.library)
						}>
						{filteredData?.map((marker: any, key: number) => {
							if (marker.DATABASE_TYPE === DB_TYPE_MAP.library) {
								return (
									<Marker
										key={`L${marker.DATABASE_TYPE}-${marker.ACCESSION_NUMBER}`}
										position={[
											marker.DECIMAL_LATITUDE,
											marker.DECIMAL_LONGITUD,
										]}
										icon={icons['archive']}>
										<Popup>
											<div className="p-2 bg-white rounded">
												<h3 className="font-bold text-blue-600">
													{marker.REFD}
												</h3>
											</div>
										</Popup>
									</Marker>
								)
							}
						})}
					</MarkerClusterGroup>
					<MarkerClusterGroup
						key={`A${filteredData.filter((item) => item.DATABASE_TYPE === DB_TYPE_MAP.archive)}`}
						spiderfyDistanceMultiplier={2}
						showCoverageOnHover={false}
						iconCreateFunction={(cluster) =>
							createClusterIcon(cluster, archiveIcon, COLOR_MAP.archive)
						}>
						{filteredData?.map((marker: any, key: number) => {
							if (marker.DATABASE_TYPE === DB_TYPE_MAP.archive) {
								return (
									<Marker
										key={`A${marker.DATABASE_TYPE}-${marker.REFD}`}
										position={[
											marker.DECIMAL_LATITUDE,
											marker.DECIMAL_LONGITUD,
										]}
										icon={icons['archive']}>
										<Popup>
											<div className="p-2 bg-white rounded">
												<h3 className="font-bold text-blue-600">
													{marker.REFD}
												</h3>
											</div>
										</Popup>
									</Marker>
								)
							}
						})}
					</MarkerClusterGroup>
					<MarkerClusterGroup
						key={`M${filteredData.filter((item) => item.DATABASE_TYPE === DB_TYPE_MAP.museum)}`}
						spiderfyDistanceMultiplier={2}
						showCoverageOnHover={false}
						iconCreateFunction={(cluster) =>
							createClusterIcon(cluster, museumIcon, COLOR_MAP.museum)
						}>
						{filteredData?.map((marker: any, key: number) => {
							if (marker.DATABASE_TYPE === DB_TYPE_MAP.museum) {
								return (
									<Marker
										key={`M${marker.DATABASE_TYPE}-${marker.ACCESSION_NUMBER}}`}
										position={[
											marker.DECIMAL_LATITUDE,
											marker.DECIMAL_LONGITUD,
										]}
										icon={icons['museum']}>
										<Popup>
											<div className="p-2 bg-white rounded">
												<h3 className="font-bold text-blue-600">
													{marker.ACCESSION_NUMBER}
												</h3>
											</div>
										</Popup>
									</Marker>
								)
							}
						})}
					</MarkerClusterGroup>
				</MapContainer>
			</div>
		</div>
	)
}

export default InteractiveMap
