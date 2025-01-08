import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import useConstants from '@/hooks/useConstants'
import { getSessionID } from '@/lib/utils'
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
import archiveIcon from './archive.png'
import libraryIcon from './book.png'
import museumIcon from './museum.png'
import './style.css'

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
	ACCESSION_NUMBER?: string
	REFD?: string
	DESCRIPTION: string
	LEGAL_TITLE: string
	DECIMAL_LATITUDE: any
	DECIMAL_LONGITUD: any
	ORIGIN_COUNTRY: string
	ORIGIN_PRV_STATE: string
	ORIGIN_CITY: string
	DATE: string
	IMAG_URL: string
	SISN: string
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

const InteractiveMap = ({ DB_TYPE }: { DB_TYPE: string }) => {
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
	const [loading, setLoading] = useState(false)

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

	const fetch_get = async () => {
		setLoading(true)
		let HOME_SESSID = getSessionID()
		const response = await axios.get(
			`${HOME_SESSID}?SEARCH&REPORT=WEB_UNION_SUM_MAP&APPLICATION=UNION_VIEW&DATABASE=${DB_TYPE}&EXP=%2B%2B%40`,
			{
				headers: {
					Accept: 'application/xml',
				},
			}
		)

		const x2js = new X2JS()
		const jsonData: any = x2js.xml2js(response.data)

		const updatedRecords = jsonData?.xml?.record?.map((record: DataType) => {
			record.DECIMAL_LATITUDE = parseFloat(record.DECIMAL_LATITUDE ?? 0)
			record.DECIMAL_LONGITUD = parseFloat(record.DECIMAL_LONGITUD ?? 0)
			return record
		})
		setAllData(updatedRecords ?? [])
		setFilteredData(updatedRecords ?? [])
		const countries = Array.from(
			new Set(updatedRecords?.map((item: any) => item.ORIGIN_COUNTRY))
		)
		setCkTypes({ countries })
		setLoading(false)
	}

	const getUniqueValuesP = () => {
		const nData = allData.filter((item: any) => {
			const matchesDatabase =
				selectedDatabases.length > 0 ? selectedDatabases.includes(item.DATABASE_TYPE) : true
			const matchesCountry =
				selectedCountries.length > 0
					? selectedCountries.includes(item.ORIGIN_COUNTRY)
					: true

			return matchesDatabase && matchesCountry
		})
		const uniqueValues = Array.from(new Set(nData?.map((item: any) => item.ORIGIN_PRV_STATE)))
		return uniqueValues
	}

	const getUniqueValuesC = () => {
		const nData = allData.filter((item: any) => {
			const matchesDatabase =
				selectedDatabases.length > 0 ? selectedDatabases.includes(item.DATABASE_TYPE) : true
			const matchesCountry =
				selectedCountries.length > 0
					? selectedCountries.includes(item.ORIGIN_COUNTRY)
					: true
			const matchesProvince =
				selectedProvinces.length > 0
					? selectedProvinces.includes(item.ORIGIN_PRV_STATE)
					: true

			return matchesDatabase && matchesCountry && matchesProvince
		})
		const uniqueValues = Array.from(new Set(nData?.map((item: any) => item.ORIGIN_CITY)))
		return uniqueValues
	}

	const resetMap = () => {
		setSelectedDatabases([])
		setSelectedCountries([])
		setSelectedProvinces([])
		setSelectedCities([])
		setFilteredData(allData)
	}

	return (
		<div className="w-full relative md:flex">
			{loading && (
				<div className="absolute w-full h-full bg-primary opacity-25" style={{zIndex:9}}>
			<Spinner height={'h-full'} spinHeight={'h-10'} spinWidth={'w-10'} />
		</div>
	)
}
			<div className="mb-2 md:mb-0 md:w-1/4 rounded border border-primary mr-2 relative">
				<div className="flex justify-between items-center bg-primary p-2">
					<div className={'text-white'}>{message.filterBy}</div>
					<Button onClick={resetMap} className={'bg-black text-white'}>
						<RefreshCw />
					</Button>
				</div>
				<div className="flex flex-col space-y-4 max-h-[90vh] mb-2 p-2 overflow-y-auto custom-scrollbar">
					{DB_TYPE === 'UNION_VIEW' && (
						<CollapseList title={'Database'} expand={true}>
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
									</div>
								</div>
							</div>
						</CollapseList>
					)}
					<CollapseList title={'Country'} expand={true}>
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
											</div>
										)
									)
								}
								return
							})}
						</div>
					</CollapseList>
					<CollapseList expand={true} title={'Province'}>
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
					<CollapseList expand={true} title={'City'}>
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
						zIndex:8
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
					{/* @ts-ignore */}
					<MarkerClusterGroup
						key={`L${uuidv4()?.substring(15)}`}
						spiderfyDistanceMultiplier={2}
						showCoverageOnHover={false}
						iconCreateFunction={(cluster) =>
							createClusterIcon(cluster, libraryIcon, COLOR_MAP.library)
						}>
						{filteredData?.map((marker: DataType, key: number) => {
							if (marker.DATABASE_TYPE === DB_TYPE_MAP.library) {
								return (
									<Marker
										key={`L${marker.DATABASE_TYPE}-${marker.ACCESSION_NUMBER}`}
										position={[
											marker?.DECIMAL_LATITUDE,
											marker?.DECIMAL_LONGITUD,
										]}
										icon={icons['library']}>
										<Popup className="hidden md:block" offset={[-7, 0]}>
											<div className="w-[300px]">
												<a
													href={`/SCRIPTS/MWIMAIN.DLL?UNIONSEARCH&SIMPLE_EXP=Y&KEEP=Y&ERRMSG=[MESSAGES]no-record.html&APPLICATION=UNION_VIEW&DATABASE=${library.database_name}&language=144&REPORT=WEB_UNION_DETAIL&EXP=ACCESSION_NUMBER%20${marker.ACCESSION_NUMBER}`}
													target="_blank">
													<h3 className="text-lg font-bold text-blue-600  border-b pb-2">
														{marker.LEGAL_TITLE ?? 'n/a'}
													</h3>
												</a>
												{marker?.IMAG_URL && (
													<div className="bg-slate-100 h-48 mb-4">
														<img
															src={marker.IMAG_URL}
															alt="Library"
															className="w-full h-full object-contain rounded-t-lg "
														/>
													</div>
												)}
												<table className="w-full text-sm">
													<tbody>
														<tr className="border-b">
															<td className="font-semibold">
																ACCESSION_NUMBER
															</td>
															<td>
																{marker.ACCESSION_NUMBER ?? 'n/a'}{' '}
															</td>
														</tr>
														<tr className="border-b">
															<td className="font-semibold py-1 pr-2">
																Location
															</td>
															<td>
																{marker.ORIGIN_CITY},
																{marker.ORIGIN_PRV_STATE}
															</td>
														</tr>
														<tr>
															<td className="font-semibold py-1 pr-2">
																Date
															</td>
															<td>{marker.DATE ?? 'n/a'}</td>
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
							if (marker.DATABASE_TYPE === DB_TYPE_MAP.archive) {
								return (
									<Marker
										key={`A${marker.DATABASE_TYPE}-${marker.REFD}`}
										position={[
											marker?.DECIMAL_LATITUDE,
											marker?.DECIMAL_LONGITUD,
										]}
										icon={icons['archive']}>
										<Popup className="hidden md:block" offset={[-7, 0]}>
											<div className="w-[300px]">
												<a
													href={`/SCRIPTS/MWIMAIN.DLL?UNIONSEARCH&SIMPLE_EXP=Y&KEEP=Y&ERRMSG=[MESSAGES]no-record.html&APPLICATION=UNION_VIEW&DATABASE=${archives.database_name}&language=144&REPORT=WEB_UNION_DETAIL&EXP=REFD%20${marker.REFD}`}
													target="_blank">
													<h3 className="text-lg font-bold text-blue-600  border-b pb-2">
														{marker.LEGAL_TITLE ?? 'n/a'}
													</h3>
												</a>
												{marker?.IMAG_URL && (
													<div className="bg-slate-100 h-48 mb-4">
														<img
															src={marker.IMAG_URL}
															alt="Archive"
															className="w-full h-full object-contain rounded-t-lg "
														/>
													</div>
												)}
												<table className="w-full text-sm">
													<tbody>
														<tr className="border-b">
															<td className="font-semibold">REFD</td>
															<td>{marker.REFD ?? 'n/a'} </td>
														</tr>
														<tr className="border-b">
															<td className="font-semibold py-1 pr-2">
																Location
															</td>
															<td>
																{marker.ORIGIN_CITY},
																{marker.ORIGIN_PRV_STATE}
															</td>
														</tr>
														<tr>
															<td className="font-semibold py-1 pr-2">
																Date
															</td>
															<td>{marker.DATE ?? 'n/a'}</td>
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
							if (marker.DATABASE_TYPE === DB_TYPE_MAP.museum) {
								return (
									<Marker
										key={`M${marker.DATABASE_TYPE}-${marker.ACCESSION_NUMBER}}`}
										position={[
											marker?.DECIMAL_LATITUDE,
											marker?.DECIMAL_LONGITUD,
										]}
										icon={icons['museum']}>
										<Popup className="hidden md:block" offset={[-7, 0]}>
											<div className="w-[300px]">
												<a
													href={`/SCRIPTS/MWIMAIN.DLL?UNIONSEARCH&SIMPLE_EXP=Y&KEEP=Y&ERRMSG=[MESSAGES]no-record.html&APPLICATION=UNION_VIEW&DATABASE=${museum.database_name}&language=144&REPORT=WEB_UNION_DETAIL&EXP=ACCESSION_NUMBER%20${marker.ACCESSION_NUMBER}`}
													target="_blank">
													<h3 className="text-lg font-bold text-blue-600 border-b pb-2 overflow-x-auto">
														{marker.LEGAL_TITLE ?? 'n/a'}
													</h3>
												</a>
												{marker?.IMAG_URL && (
													<div className="bg-slate-100 h-48 mb-4">
														<img
															src={marker.IMAG_URL}
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
																{marker.ACCESSION_NUMBER ?? 'n/a'}{' '}
															</td>
														</tr>
														<tr className="border-b">
															<td className="font-semibold py-1 pr-2">
																Location
															</td>
															<td className="overflow-x-auto">
																{marker.ORIGIN_CITY},
																{marker.ORIGIN_PRV_STATE}
															</td>
														</tr>
														<tr>
															<td className="font-semibold py-1 pr-2">
																Date
															</td>
															<td className="overflow-x-auto">
																{marker.DATE ?? 'n/a'}
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
		</div >
	)
}

export default InteractiveMap
