const TimeInfo = () => {
  const generateYears = () => {
    const years = [];
    for (let i = -1000; i <= 2025; i += 20) {
      years.push(i);
    }
    return years;
  };

  const formatYear = (year: number) =>
    year < 0 ? `BC ${Math.abs(year)}` : year.toString();

  return (
    <div className="relative w-full h-24 bg-gray-50 overflow-x-auto flex items-center">
      <div
        className="relative flex items-center px-6 space-x-12"
        style={{ minWidth: "2000px" }}
      >
        {generateYears().map((year, index) => (
          <div
            key={index}
            className="relative flex flex-col items-center"
            style={{ width: "120px" }}
          >
            <div className="w-1 h-[2px] bg-blue-500 rounded-full" />
            <div className="text-xs mt-2 font-medium text-gray-700">
              {formatYear(year)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeInfo;
