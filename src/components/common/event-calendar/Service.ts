
import axios from 'axios';
import X2JS from 'x2js'; // Ensure X2JS is installed
import { MAIN_MWI_APPLICATION, MONTH_REPORT } from './EventCalendar';
import { convertToArr } from '@/lib/utils';

export const fetch_get = async (currentDate: Date) => {
    const DATE_FIELD = 'TAG_FUNC_DATE';
    const DATE_WILDCARD = `${currentDate.getFullYear()}%2D0${currentDate.getMonth() + 1}%2D%2A`;

    try {
        const response = await axios.get(
            `/scripts/mwimain.dll/144/${MAIN_MWI_APPLICATION}/${MONTH_REPORT}?commandsearch&exp=${DATE_FIELD} ${DATE_WILDCARD}`,
            {
                headers: {
                    'Content-Type': 'text/xml',
                },
            }
        );
        const x2js = new X2JS();
        const jsonData: any = x2js.xml2js(response.data);
        const event = jsonData?.div?.xml?.event;

        if (!event) return [];
        return convertToArr(event);
    } catch (error) {
        throw error;
    }
};