import React, { Component } from "react";
import CanvasJSReact from "@canvasjs/react-charts";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
const PieChartBooking = () => {
  {
    const options = {
      animationEnabled: true,
      title: {
        text: "Booking vs Cancel Today",
        fontSize: 20, // Change this to the desired font size
      },

      subtitles: [
        {
          text: "71% Positive",
          verticalAlign: "center",
          fontSize: 16,
          dockInsidePlotArea: true,
        },
      ],
      data: [
        {
          type: "doughnut",
          showInLegend: true,
          indexLabel: "{name}: {y}",
          yValueFormatString: "#,###'%'",
          dataPoints: [
            { name: "Total Booking", y: 50 },
            { name: "Total Pending", y: 31 },
            { name: "Total Cancel", y: 19 },
          ],
        },
      ],
    };
    return (
      <div className="col-span-2 bg-white shadow-2xl md:p-5">
        <CanvasJSChart
          options={options}
          /* onRef={ref => this.chart = ref} */
        />
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
      </div>
    );
  }
};

export default PieChartBooking;
