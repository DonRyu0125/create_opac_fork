import axios from 'axios'
import React, { useEffect, useState } from 'react'
import X2JS from 'x2js'

interface DataType {
	DATABASE_TYPE: string
	ACCESSION_NUMBER?: string
	REFD?: string
	DESCRIPTION: string
	LEGAL_TITLE: string
	DATE: string
	IMAG_URL: string
	SISN: string
}

const TimeLine = ({DB_TYPE}:{DB_TYPE?:string}) => {
    const [loading, setLoading] = useState(false)
    useEffect(()=>{
        fetch_get()
    },[])
	const fetch_get = async () => {
		setLoading(true)
		const baseURL =
			'/SCRIPTS/MWIMAIN.DLL?UNIONSEARCH&SIMPLE_EXP=Y&APPLICATION=UNION_VIEW&REPORT=WEB_UNION_SUM_TIMELINE&EXP=UNION_TIME_CL%20%40'
		const databaseParam = DB_TYPE ? `&DATABASE=${DB_TYPE}` : ''
		const url = `${baseURL}${databaseParam}`
        try {
            const response = await axios.get(url, {
                headers: {
                    Accept: 'application/xml',
                },
                responseType: 'text', 
            });
    
            const x2js = new X2JS();
            const jsonData = x2js.xml2js(response.data); 
        
            const records = jsonData.root.record.map((record: any) => ({
                sisn: Number(record.sisn), 
                date: record.DATE.split('--')[0],
                database_type: record.DATABASE_TYPE.toLowerCase(), 
            }));
        
            return records;
        } catch (error) {
            console.error('Error fetching or converting XML:', error.message);
        }
		setLoading(false)
	}
	return <div></div>
}

export default TimeLine
