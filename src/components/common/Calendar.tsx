import React, { useEffect, useState } from 'react'
import CalendarFilter from './CalendarFilter';
import X2JS from 'x2js';
import response from '../../samples/fetch_calendar.json';

export interface Cal_event {
  "event-date": string;
  "event-start": string;
  "event-end": string;
  "event-name": string;
  "event-desc": string;
  "event-loc": string;
}

export interface Day_obj {
  day: number;
  month: number;
  year: number;
}

export const FILTER_TYPE = "event-loc";
export const EVENT_DATE = "event-date";
export const EVENT_NAME = "event-name";
export const EVENT_COLORS = ["red", "yellow", "green", "orange", "purple", "grey", "CadetBlue", "DarkKhaki", "DeepPink"];
export const MON_REPORT_TYPES = ["MONTHLY_CALENDAR", "NEXT_MONTH_CALENDAR", "NEXT_TWO_MONTH_CALENDAR", "NEXT_THREE_MONTH_CALENDAR", "NEXT_FOUR_MONTH_CALENDAR", "NEXT_FIVE_MONTH_CALENDAR"];

export const FILTER_TYPE_COLOR = [
  {
      "type": "Delhi",
      "color":"red",
      "icon":"square"
  },
  {
      "type": "Port Dover",
      "color":"yellow",
      "icon":"square"
  },
  {
      "type": "Port Rowan",
      "color":"green",
      "icon":"circle"
  },
  {
      "type": "Simcore",
      "color":"orange",
      "icon":"circle"
  },
  {
      "type": "Waterford",
      "color":"purple",
      "icon":"circle"
  },
  {
      "type": "All",
      "color":"grey",
      "icon":"square"
  }
]



const Calendar = () => {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentEvent, setCurrentEvent] = useState<Cal_event[]>([]);
  const [currentFilter, setCurrentFilter] = useState<string[]>([]);
  const [filterColorType, setFilterColorType] = useState();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    // const currE = await fetch_get("MONTHLY_CALENDAR");
    const currE = response
    let set = new Set();
    let arr = [];

    currE.map((item: Cal_event) => {
      set.add(item[FILTER_TYPE]);
    });

    console.log('currE',currE)

    setCurrentEvent(currE);
  };

  const fetch_get = async (monthReport: string) => {
    // try {
    //   const response = await axios.get(`${base_url}/scripts/mwimain.dll/144/M2L_TAG/${monthReport}?commandsearch&exp=tag_type calendar`, {
    //     headers: {
    //       "Content-Type": "text/xml",
    //     },
    //   });
    //   const x2js = new X2JS();
    //   const jsonData: any = x2js.xml2js(response);
    //   return jsonData.div.xml.event;
    // } catch (error) {
    //   throw error;
    // }
  };

  const daysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    return new Date(year, month, 0).getDate(); // get the last date.getMonth() + 1's last date
  };

  const generateMonth = () => {
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const days = daysInMonth(currentDate);
    const startingDay = firstDayOfMonth.getDay(); // show the date thorugh number ex) mon => 1
    const calendarArray = [];

    for (let i = 0; i < startingDay; i++) {
      calendarArray.push(0);
    }

    for (let i = 1; i <= days; i++) {
      calendarArray.push({ day: i, month: currentDate.getMonth() + 1, year: currentDate.getFullYear() });
    }

    return calendarArray;
  };

  const prevMonth = () => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    setCurrentDate(newDate);
  };

  const nextMonth = () => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    setCurrentDate(newDate);
  };

  const weeks = () => {
    const daysArray = generateMonth();
    const weeksArray = [];

    for (let i = 0; i < daysArray.length; i += 7) {
      weeksArray.push(daysArray.slice(i, i + 7));
    }
    return weeksArray;
  };

  const changeStrToDate = (dateString: string) => {
    const dateObject = new Date(dateString);
    const month = dateObject.getMonth() + 1;
    const day = dateObject.getDate();

    return { month, day };
  };

  const eventTag = (dayObj: Day_obj) => {
    if (currentFilter.length > 0) {
      return currentEvent.map((item: Cal_event) => {
        return currentFilter.map((type) => {
          if (type === item[FILTER_TYPE] && changeStrToDate(item[EVENT_DATE]).day == dayObj.day && changeStrToDate(item[EVENT_DATE]).month == dayObj.month) {
            return `${item[EVENT_NAME]?.substring(0, 10)} ${item[FILTER_TYPE]} ${getColor(item[FILTER_TYPE])}`;
          }
        });
      });
    } else {
      return currentEvent.map((item: Cal_event) => {
        if (changeStrToDate(item[EVENT_DATE]).day == dayObj.day && changeStrToDate(item[EVENT_DATE]).month == dayObj.month) {
          return `${item[EVENT_NAME]?.substring(0, 10)} ${item[FILTER_TYPE]} ${getColor(item[FILTER_TYPE])} `;
        }
      });
    }
  };

  const getColor = (event_type:String) => {
    let result = FILTER_TYPE_COLOR?.filter((item) => {
      return item.type == event_type;
    });
    return result[0]?.color;
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex" }}>
        <button className="border-2 border-black-500 w-10" onClick={prevMonth}>
          &lt;
        </button>
        <h2 className="text-xl ">{currentDate.toLocaleString("default", { month: "long", year: "numeric" })}</h2>
        <button className="border-2 border-black-500  w-10" onClick={nextMonth}>
          &gt;
        </button>
        <CalendarFilter setCurrentFilter={setCurrentFilter} currentEvent={currentEvent} />
      </div>
      <div style={{ width: 630 }}>
        <div style={{ display: "flex" }}>
          {daysOfWeek.map((item, key) => {
            return (
              <div key={key} style={{ textAlign: "right", width: 90 }}>
                {item}
              </div>
            );
          })}
        </div>

        {weeks().map((week, weekIndex) => (
          <div key={weekIndex} style={{ display: "flex" }}>
            {week.map((dayObj: any, dayIndex) => (
              <div key={dayIndex} style={{ width: 90, height: 100, textAlign: "center" }} className="border-2 border-black-500">
                <div>{dayObj.day}</div>
                <div>{eventTag(dayObj)}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
