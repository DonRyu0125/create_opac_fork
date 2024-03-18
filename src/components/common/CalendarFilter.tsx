import React, { useState } from 'react'
import { Cal_event, EVENT_COLORS, FILTER_TYPE } from './Calendar';

interface MyComponentProps {
    setCurrentFilter: React.Dispatch<React.SetStateAction<string[]>>;
    currentEvent: Cal_event[];
  }

const CalendarFilter: React.FC<MyComponentProps> = ({ setCurrentFilter,currentEvent }) => {
    const [selectType, setSelectedType] = useState<any>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let map = selectType;
      if (map[e.target.name] > 0) {
        delete map[e.target.name];
      } else {
        map[e.target.name] = 1;
      }
  
      setSelectedType(map);
      setCurrentFilter(Object.keys(map));
    };
  
    const showFilter = (currentEvent: Cal_event[]) => {
      let set = new Set();
      let filter_color_map = [];
  
      currentEvent?.map((item: Cal_event) => {
        set.add(item[FILTER_TYPE]);
      });
  
      filter_color_map = Array.from(set).map((item, key) => {
        return { type: item, color: EVENT_COLORS[key] };
      });
  
      return filter_color_map.map((item: any, key: number) => {
        return (
          <label key={key} style={{display:'flex'}}>
            <input  type="checkbox" checked={selectType[item.type] === 1} 
            onChange={(e) => handleChange(e)} name={item.type} />
            <div style={{backgroundColor:`${item.color}`}}>{item.type}</div>
          </label>
        );
      });
    };
  
    // Put type color at the array
    // Get the type during comparing
  
    const resetFilter = () => {
      setSelectedType({});
      setCurrentFilter([]);
    };
  
    return (
      <div>
        <div>{showFilter(currentEvent)}</div>
        <button onClick={resetFilter}>Reset</button>
      </div>
    );
  };

export default CalendarFilter
