import React, { useState } from 'react';
import * as Slider from '@radix-ui/react-slider';

const timelineEvents = [
  { startYear: 1500, endYear: 1600, description: 'Event 1', color: 'bg-red-400' },
  { startYear: 1600, endYear: 1700, description: 'Event 2', color: 'bg-green-400' },
  { startYear: 1650, endYear: 1680, description: 'Event 3', color: 'bg-blue-400' },
  { startYear: 1800, endYear: 1900, description: 'Event 4', color: 'bg-yellow-400' },
];

const CustomTimeline = () => {
  const [timelineRange, setTimelineRange] = useState([1500, 1600]);
  const [viewRange, setViewRange] = useState([1500, 2000]);

  const handleScroll = (direction) => {
    setViewRange((prevRange) => {
      const delta = direction === 'left' ? -500 : 500;
      const newStart = prevRange[0] + delta;
      const newEnd = prevRange[1] + delta;
      return [newStart, newEnd];
    });
  };

  const calculateEventRows = () => {
    const rows = [];

    timelineEvents
      .sort((a, b) => (b.endYear - b.startYear) - (a.endYear - a.startYear)) // Sort by range size (largest first)
      .forEach((event) => {
        let placed = false;

        for (let row of rows) {
          const conflict = row.some(
            (e) =>
              (event.startYear >= e.startYear && event.startYear <= e.endYear) ||
              (event.endYear >= e.startYear && event.endYear <= e.endYear)
          );

          if (!conflict) {
            row.push(event);
            placed = true;
            break;
          }
        }

        if (!placed) {
          rows.push([event]);
        }
      });

    return rows;
  };

  const eventRows = calculateEventRows();

  return (
    <div className="flex flex-col items-center p-4">
      <div className="relative w-full overflow-x-hidden">
        <div className="flex justify-between w-full mb-2 text-sm">
          {Array.from({ length: (viewRange[1] - viewRange[0]) / 100 + 1 }, (_, i) => viewRange[0] + i * 100).map((year, index) => (
            <div key={index} className="text-center">
              <div>{year}</div>
            </div>
          ))}
        </div>

        <div className="flex w-full mb-4 justify-between">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={() => handleScroll('left')}
          >
            &larr; Scroll Left
          </button>
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={() => handleScroll('right')}
          >
            Scroll Right &rarr;
          </button>
        </div>

        <div className="relative w-full overflow-y-auto" style={{ height: '150px' }}>
          {eventRows.map((row, rowIndex) => (
            <div key={rowIndex} className="relative">
              {row.map((event, index) => (
                <div
                  key={index}
                  className={`absolute h-6 rounded ${event.color}`}
                  style={{
                    top: `${rowIndex * 24}px`,
                    left: `${((event.startYear - viewRange[0]) / (viewRange[1] - viewRange[0])) * 100}%`,
                    width: `${((event.endYear - event.startYear) / (viewRange[1] - viewRange[0])) * 100}%`,
                  }}
                >
                  <span className="absolute text-xs left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 whitespace-nowrap">
                    {event.description}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center mt-10">

          <Slider.Root
            className="relative flex items-center w-full h-4 mx-4"
            min={viewRange[0]}
            max={viewRange[1]}
            step={10}
            value={timelineRange}
            onValueChange={(value) => setTimelineRange(value)}
          >
            <Slider.Track className="relative w-full h-2 bg-gray-300 rounded">
              <Slider.Range className="absolute h-full bg-blue-500 rounded" />
            </Slider.Track>
            <Slider.Thumb className="w-4 h-4 bg-blue-500 rounded-full" />
            <Slider.Thumb className="w-4 h-4 bg-blue-500 rounded-full" />
          </Slider.Root>

        </div>
      </div>
    </div>
  );
};

export default CustomTimeline;
