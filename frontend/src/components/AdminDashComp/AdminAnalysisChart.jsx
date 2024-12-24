import React from "react";
import PieChartBooking from "./Charts/PieChartBooking";
import LineChartEarning from "./Charts/LineChartEarning";

const AdminAnalysisChart = () => {
  return (
    <div className="flex justify-center w-full mt-20 absolute left-3 md:static">
      {/* Grid layout with responsive columns */}
      <div className="grid grid-cols-1 lg:grid-cols-4 justify-center w-[95%] gap-5  ">
        <PieChartBooking />
        <LineChartEarning />
      </div>
    </div>
  );
};

export default AdminAnalysisChart;
