import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import useConstants from '@/hooks/useConstants'
import { getImage, getSessionID } from '@/lib/utils'
import axios from 'axios'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { RefreshCw } from 'lucide-react'
import { useEffect, useState } from 'react'
import { LayersControl, MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-markercluster'
import 'react-leaflet-markercluster/dist/styles.min.css'
import { v4 as uuidv4 } from 'uuid'
import X2JS from 'x2js'
import Button from '../admin/Button'
import CollapseList from '../CollapseList'
import Spinner from '../event-calendar/Spinner'
import archiveIcon from '../../../assets/icons/archive.png'
import libraryIcon from '../../../assets/icons/library.png'
import museumIcon from '../../../assets/icons/museum.png'
import './style.css'
import dummy from './dummy.json'
import useJSONData from '@/hooks/useJSONData'

const DB_TYPE_MAP = {
	library: 'Library',
	archive: 'Archive',
	museum: 'Museum',
}

interface DataType {
	database_type: string
	accession_number?: string
	refd?: string
	description: string
	title: string
	decimal_latitude: any
	decimal_longitude: any
	origin_country: string
	origin_prv_state: string
	origin_city: string
	date: string
	imag_url: string
	sisn: string
	gen_note?:string
	author?:string
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

const COLOR_MAP: any = {
	library: 'rgba(255, 0, 0, 0.7)',
	archive: 'rgba(12, 74, 110, 0.7)',
	museum: 'rgba(255, 255, 0, 0.7)',
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
		min-width:55px;
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

const InteractiveMap = ({ DB_TYPE }: { DB_TYPE?: string }) => {
	const { archives, museum, library } = useConstants()
	const { message } = useConstants()
	const [allData, setAllData] = useState<any>([])
	const [filteredData, setFilteredData] = useState<any>([])
	const [selectedDatabases, setSelectedDatabases] = useState<string[]>([])
	const [selectedCountries, setSelectedCountries] = useState<string[]>([])
	const [selectedProvinces, setSelectedProvinces] = useState<string[]>([])
	const [selectedCities, setSelectedCities] = useState<string[]>([])
	const [ckTypes, setCkTypes] = useState<any>({
		databases: [],
		countries: [],
	})
	const biblio_data: any =
		useJSONData({
			selector: '#BIBLIO_WEB_MAP',
		}).data ?? []
	const collection_data: any =
		useJSONData({
			selector: '#COLLECTIONS_WEB_MAP',
		}).data ?? []
	const description_data: any =
		useJSONData({
			selector: '#DESCRIPTION_WEB_MAP',
		}).data ?? []

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
						? selectedDatabases.includes(item.database_type)
						: true
				const matchesCountry =
					selectedCountries.length > 0
						? selectedCountries.includes(item.origin_country)
						: true
				const matchesProvince =
					selectedProvinces.length > 0
						? selectedProvinces.includes(item.origin_prv_state)
						: true
				const matchesCity =
					selectedCities.length > 0 ? selectedCities.includes(item.origin_city) : true

				return matchesDatabase && matchesCountry && matchesProvince && matchesCity
			})
			setFilteredData(nData)
		} else {
			setFilteredData(allData)
		}
	}, [selectedDatabases, selectedCountries, selectedProvinces, selectedCities, allData])

	const fetch_get = async () => {
		let files = [
			...(biblio_data?.xml?.record || []),
			...(collection_data?.xml?.record || []),
			...(description_data?.xml?.record || []),
		]
		const updatedRecords = files.map((record: DataType) => {
			record.decimal_latitude = parseFloat(record.decimal_latitude ?? 0)
			record.decimal_longitude = parseFloat(record.decimal_longitude ?? 0)
			return record
		})
		console.log('updatedRecords', updatedRecords)
		setAllData(updatedRecords ?? [])
		setFilteredData(updatedRecords ?? [])
		const countries = Array.from(
			new Set(updatedRecords?.map((item: any) => item.origin_country))
		)
		setCkTypes({ countries })
	}

	const handleDatabaseChange = (database: string) => {
		setSelectedDatabases((prev) =>
			prev.includes(database) ? prev.filter((d) => d !== database) : [...prev, database]
		)
		setSelectedCountries([])
		setSelectedProvinces([])
		setSelectedCities([])
	}

	const handleCountryChange = (country: string) => {
		setSelectedCountries((prev) =>
			prev.includes(country) ? prev.filter((c) => c !== country) : [...prev, country]
		)
		setSelectedProvinces([])
		setSelectedCities([])
	}

	const handleProvinceChange = (province: string) => {
		setSelectedProvinces((prev) =>
			prev.includes(province) ? prev.filter((p) => p !== province) : [...prev, province]
		)
		setSelectedCities([])
	}

	const handleCityChange = (city: string) => {
		setSelectedCities((prev) =>
			prev.includes(city) ? prev.filter((c) => c !== city) : [...prev, city]
		)
	}

	const getUniqueValuesP = () => {
		const nData = allData.filter((item: any) => {
			const matchesDatabase =
				selectedDatabases.length > 0 ? selectedDatabases.includes(item.database_type) : true
			const matchesCountry =
				selectedCountries.length > 0
					? selectedCountries.includes(item.origin_country)
					: true

			return matchesDatabase && matchesCountry
		})
		const uniqueValues = Array.from(new Set(nData?.map((item: any) => item.origin_prv_state)))
		return uniqueValues
	}

	const getUniqueValuesC = () => {
		const nData = allData.filter((item: any) => {
			const matchesDatabase =
				selectedDatabases.length > 0 ? selectedDatabases.includes(item.database_type) : true
			const matchesCountry =
				selectedCountries.length > 0
					? selectedCountries.includes(item.origin_country)
					: true
			const matchesProvince =
				selectedProvinces.length > 0
					? selectedProvinces.includes(item.origin_prv_state)
					: true

			return matchesDatabase && matchesCountry && matchesProvince
		})
		const uniqueValues = Array.from(new Set(nData?.map((item: any) => item.origin_city)))
		return uniqueValues
	}

	const resetMap = () => {
		setSelectedDatabases([])
		setSelectedCountries([])
		setSelectedProvinces([])
		setSelectedCities([])
		setFilteredData(allData)
	}

	const getNumberofType = (type: string, fileterType: string) => {
		let arr = allData.filter((item: any) => item[type] === fileterType) ?? []
		return `(${arr.length})`
	}

	return (
		<div className="w-full relative md:flex">
			<div className="mb-2 md:mb-0 md:w-1/4 rounded border border-primary mr-2 relative">
				<div className="flex justify-between items-center bg-primary p-2">
					<div className={'text-white'}>{message.filterBy}</div>
					<Button onClick={resetMap} className={'bg-black text-white'}>
						<RefreshCw />
					</Button>
				</div>
				<div className="flex flex-col space-y-4 max-h-[90vh] mb-2 p-2 overflow-y-auto custom-scrollbar">
					{!DB_TYPE && (
						<CollapseList title={message.Type} expand={true}>
							<div className="space-y-3 border-t p-4">
								<div className="flex">
									<div className={'flex items-center space-x-2'}>
										<Checkbox
											onClick={(e) =>
												handleDatabaseChange(DB_TYPE_MAP.archive)
											}
											checked={selectedDatabases.includes(
												DB_TYPE_MAP.archive
											)}
										/>
										<div
											style={{ background: `${COLOR_MAP.archive}` }}
											className={`w-[30px] h-[30px] flex justify-center items-center rounded-full shadow-md`}>
											<img src={archiveIcon} className="w-5 h-5" />
										</div>
										<Label className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
											{DB_TYPE_MAP.archive}
										</Label>
										<div>
											{getNumberofType('database_type', DB_TYPE_MAP.archive)}
										</div>
									</div>
								</div>
								<div className="flex">
									<div className={'flex items-center space-x-2'}>
										<Checkbox
											onClick={() =>
												handleDatabaseChange(DB_TYPE_MAP.library)
											}
											checked={selectedDatabases.includes(
												DB_TYPE_MAP.library
											)}
										/>
										<div
											style={{ background: `${COLOR_MAP.library}` }}
											className={`w-[30px] h-[30px] flex justify-center items-center rounded-full shadow-md`}>
											{' '}
											<img src={libraryIcon} className=" w-5 h-5" />
										</div>
										<Label className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
											{DB_TYPE_MAP.library}
										</Label>
										<div>
											{getNumberofType('database_type', DB_TYPE_MAP.library)}
										</div>
									</div>
								</div>
								<div className="flex">
									<div className={'flex items-center space-x-2'}>
										<Checkbox
											onClick={() => handleDatabaseChange(DB_TYPE_MAP.museum)}
											checked={selectedDatabases.includes(DB_TYPE_MAP.museum)}
										/>
										<div
											style={{ background: `${COLOR_MAP.museum}` }}
											className={`w-[30px] h-[30px] flex justify-center items-center rounded-full shadow-md`}>
											{' '}
											<img src={museumIcon} className="w-5 h-5" />
										</div>
										<Label className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
											{DB_TYPE_MAP.museum}
										</Label>
										<div>
											{getNumberofType('database_type', DB_TYPE_MAP.museum)}
										</div>
									</div>
								</div>
							</div>
						</CollapseList>
					)}
					<CollapseList title={message.country} expand={true}>
						<div className="space-y-3 border-t p-4">
							{ckTypes?.countries?.map((item: string, key: number) => {
								if (item) {
									return (
										item && (
											<div
												className={'flex items-center space-x-2'}
												key={key}>
												<Checkbox
													onClick={() => handleCountryChange(item)}
													checked={selectedCountries.includes(item)}
												/>
												<Label className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
													{item}
												</Label>
												<div>{getNumberofType('origin_country', item)}</div>
											</div>
										)
									)
								}
								return
							})}
						</div>
					</CollapseList>
					<CollapseList expand={true} title={message.provinceState}>
						<div className="space-y-3 border-t p-4">
							{selectedCountries.length > 0 ? (
								getUniqueValuesP()?.map((item: any, key: number) => {
									return (
										item && (
											<div
												className={'flex items-center space-x-2'}
												key={key}>
												<Checkbox
													onClick={() => handleProvinceChange(item)}
													checked={selectedProvinces.includes(item)}
												/>
												<Label className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
													{item}
												</Label>
												<div>
													{getNumberofType('origin_prv_state', item)}
												</div>
											</div>
										)
									)
								})
							) : (
								<div className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
									'Select the Country'
								</div>
							)}
						</div>
					</CollapseList>
					<CollapseList expand={true} title={message.city}>
						<div className="space-y-3 border-t p-4">
							{selectedProvinces.length > 0 ? (
								getUniqueValuesC()?.map((item: any, key: number) => {
									return (
										<div className={'flex items-center space-x-2'} key={key}>
											<Checkbox
												onClick={() => handleCityChange(item)}
												checked={selectedCities.includes(item)}
											/>
											<Label className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
												{item}
											</Label>
											<div>{getNumberofType('origin_city', item)}</div>
										</div>
									)
								})
							) : (
								<div className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
									'Select the Province'
								</div>
							)}
						</div>
					</CollapseList>
				</div>
			</div>
			<div className="md:w-3/4">
				<MapContainer
					className="markercluster-map"
					center={[49.1044, -122.8011]}
					zoom={10}
					maxZoom={18}
					style={{
						height: '90vh',
						borderRadius: '10px',
						boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
						zIndex: 8,
					}}>
					<LayersControl position="topright">
						<LayersControl.BaseLayer checked name="Street Map">
							<TileLayer
								url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
								attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
							/>
						</LayersControl.BaseLayer>
						<LayersControl.BaseLayer name="Topology Map">
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
					{/* @ts-ignore */}
					<MarkerClusterGroup
						key={`L${uuidv4()?.substring(15)}`}
						spiderfyDistanceMultiplier={2}
						showCoverageOnHover={false}
						iconCreateFunction={(cluster) =>
							createClusterIcon(cluster, libraryIcon, COLOR_MAP.library)
						}>
						{filteredData?.map((marker: DataType, key: number) => {
							if (marker.database_type === DB_TYPE_MAP.library) {
								return (
									<Marker
										key={`L${marker.database_type}-${marker.accession_number}`}
										position={[
											marker?.decimal_latitude,
											marker?.decimal_longitude,
										]}
										icon={icons['library']}>
										<Popup className="hidden md:block" offset={[-7, 0]}>
											<div className="w-[300px]">
												<a
													href={`/SCRIPTS/MWIMAIN.DLL?UNIONSEARCH&SIMPLE_EXP=Y&KEEP=Y&ERRMSG=[MESSAGES]no-record.html&APPLICATION=UNION_VIEW&DATABASE=${library.database_name}&language=144&REPORT=WEB_UNION_DETAIL&EXP=accession_number%20${marker.accession_number}`}
													target="_blank">
													<h3 className="text-lg font-bold text-blue-600  border-b pb-2">
														{marker.title ?? 'n/a'}
													</h3>
												</a>
												{marker?.imag_url && (
													<div className="bg-slate-100 h-48 mb-4">
														<img
															src={getImage(marker.imag_url)}
															alt="Library"
															className="w-full h-full object-contain rounded-t-lg "
														/>
													</div>
												)}
												<table className="w-full text-sm">
													<tbody>
														<tr className="border-b">
															<td className="font-semibold">
																accession_number
															</td>
															<td>
																{marker.accession_number ?? 'n/a'}{' '}
															</td>
														</tr>
														<tr className="border-b">
															<td className="font-semibold py-1 pr-2">
																Location
															</td>
															<td>
																{marker.origin_city},
																{marker.origin_prv_state}
															</td>
														</tr>
														<tr>
															<td className="font-semibold py-1 pr-2">
																Date
															</td>
															<td>{marker.date ?? 'n/a'}</td>
														</tr>
													</tbody>
												</table>
											</div>
										</Popup>
									</Marker>
								)
							}
						})}
					</MarkerClusterGroup>
					{/* @ts-ignore */}
					<MarkerClusterGroup
						key={`A${uuidv4()?.substring(15)}`}
						spiderfyDistanceMultiplier={2}
						showCoverageOnHover={false}
						iconCreateFunction={(cluster) =>
							createClusterIcon(cluster, archiveIcon, COLOR_MAP.archive)
						}>
						{filteredData?.map((marker: any, key: number) => {
							if (marker.database_type === DB_TYPE_MAP.archive) {
								return (
									<Marker
										key={`A${marker.database_type}-${marker.refd}`}
										position={[
											marker?.decimal_latitude,
											marker?.decimal_longitude,
										]}
										icon={icons['archive']}>
										<Popup className="hidden md:block" offset={[-7, 0]}>
											<div className="w-[300px]">
												<a
													href={`/SCRIPTS/MWIMAIN.DLL?UNIONSEARCH&SIMPLE_EXP=Y&KEEP=Y&ERRMSG=[MESSAGES]no-record.html&APPLICATION=UNION_VIEW&DATABASE=${archives.database_name}&language=144&REPORT=WEB_UNION_DETAIL&EXP=refd%20${marker.refd}`}
													target="_blank">
													<h3 className="text-lg font-bold text-blue-600  border-b pb-2">
														{marker.title ?? 'n/a'}
													</h3>
												</a>
												{marker?.imag_url && (
													<div className="bg-slate-100 h-48 mb-4">
														<img
															src={getImage(marker.imag_url)}
															alt="Archive"
															className="w-full h-full object-contain rounded-t-lg "
														/>
													</div>
												)}
												<table className="w-full text-sm">
													<tbody>
														<tr className="border-b">
															<td className="font-semibold">refd</td>
															<td>{marker.refd ?? 'n/a'} </td>
														</tr>
														<tr className="border-b">
															<td className="font-semibold py-1 pr-2">
																Location
															</td>
															<td>
																{marker.origin_city},
																{marker.origin_prv_state}
															</td>
														</tr>
														<tr>
															<td className="font-semibold py-1 pr-2">
																Date
															</td>
															<td>{marker.date ?? 'n/a'}</td>
														</tr>
													</tbody>
												</table>
											</div>
										</Popup>
									</Marker>
								)
							}
						})}
					</MarkerClusterGroup>
					{/* @ts-ignore */}
					<MarkerClusterGroup
						key={`M${uuidv4()?.substring(15)}`}
						spiderfyDistanceMultiplier={2}
						showCoverageOnHover={false}
						iconCreateFunction={(cluster) =>
							createClusterIcon(cluster, museumIcon, COLOR_MAP.museum)
						}>
						{filteredData?.map((marker: any, key: number) => {
							if (marker.database_type === DB_TYPE_MAP.museum) {
								return (
									<Marker
										key={`M${marker.database_type}-${marker.accession_number}}`}
										position={[
											marker?.decimal_latitude,
											marker?.decimal_longitude,
										]}
										icon={icons['museum']}>
										<Popup className="hidden md:block" offset={[-7, 0]}>
											<div className="w-[300px]">
												<a
													href={`/SCRIPTS/MWIMAIN.DLL?UNIONSEARCH&SIMPLE_EXP=Y&KEEP=Y&ERRMSG=[MESSAGES]no-record.html&APPLICATION=UNION_VIEW&DATABASE=${museum.database_name}&language=144&REPORT=WEB_UNION_DETAIL&EXP=accession_number%20${marker.accession_number}`}
													target="_blank">
													<h3 className="text-lg font-bold text-blue-600 border-b pb-2 overflow-x-auto">
														{marker.title ?? 'n/a'}
													</h3>
												</a>
												{marker?.imag_url && (
													<div className="bg-slate-100 h-48 mb-4">
														<img
															src={getImage(marker.imag_url)}
															alt="Museum"
															className="w-full h-full object-contain rounded-t-lg "
														/>
													</div>
												)}
												<table className="w-full text-sm">
													<tbody>
														<tr className="border-b">
															<td className="font-semibold">
																Accession Number
															</td>
															<td className="overflow-x-auto">
																{marker.accession_number ?? 'n/a'}{' '}
															</td>
														</tr>
														<tr className="border-b">
															<td className="font-semibold py-1 pr-2">
																Location
															</td>
															<td className="overflow-x-auto">
																{marker.origin_city},
																{marker.origin_prv_state}
															</td>
														</tr>
														<tr>
															<td className="font-semibold py-1 pr-2">
																Date
															</td>
															<td className="overflow-x-auto">
																{marker.date ?? 'n/a'}
															</td>
														</tr>
													</tbody>
												</table>
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
