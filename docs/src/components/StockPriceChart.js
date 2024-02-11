import React, { useState, useEffect } from "react";
import { Chart, registerables } from "chart.js";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns";

// Register the components required for Chart.js
Chart.register(...registerables);

const StockPriceChart = ({ stockData, showAfterData }) => {
  // Convert the stock data from an object to an array of { time, price } pairs
  const dataPoints = Object.entries(stockData)
    .map(([timestamp, price]) => ({
      time: new Date(parseInt(timestamp) + 18000000),
      price,
    }))
    .sort((a, b) => a.time - b.time); // Sort by time

  // Find the middle index
  const middleIndex = Math.floor(dataPoints.length / 2);

  // Map to labels and prices
  const labels = dataPoints.map((dp) => dp.time);
  const prices = dataPoints.map((dp) => dp.price);

  const data = {
    labels,
    datasets: [
      {
        label: "Price",
        data: showAfterData
          ? prices
          : prices.map((price, index) => (index <= middleIndex ? price : null)),
        borderColor: "white",
        borderWidth: 4,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false, // This will allow the chart to fill the container
    scales: {
      x: {
        display: false, // This will hide the x-axis line along with its labels and gridlines
      },
      y: {
        display: false, // This will hide the y-axis line along with its labels and gridlines
      },
    },
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
      tooltip: {
        enabled: true, // Enable tooltips
        backgroundColor: "rgba(0, 0, 0, 0.8)", // Tooltip background color
        titleColor: "white", // We set the title color to white
        bodyColor: "white", // We set the body color to white
        borderColor: "white", // Border color of the tooltip can be set to white for consistency
        borderWidth: 1, // Border width of the tooltip
        callbacks: {
          // Only show the price in the tooltip body
          title: () => "", // Hide the title
          label: function (context) {
            // Display only the price in the tooltip body
            return `${context.parsed.y}`;
          },
        },
      },
    },
    // Set the background color of the chart to be transparent
    backgroundColor: "transparent",
  };

  // const options = {
  //   responsive: true,
  //   maintainAspectRatio: false, // Ensure the chart fills the container
  //   scales: {
  //     x: {
  //       grid: {
  //         display: false, // Hide the grid lines for the x-axis
  //       },
  //       ticks: {
  //         display: false, // Hide the tick labels for the x-axis
  //       },
  //     },
  //     y: {
  //       grid: {
  //         display: false, // Hide the grid lines for the y-axis
  //       },
  //       ticks: {
  //         display: false, // Hide the tick labels for the y-axis
  //       },
  //     },
  //   },
  //   plugins: {
  //     legend: {
  //       display: false, // Hide the legend
  //     },
  //     tooltip: {
  //       enabled: false, // Disable tooltips
  //     },
  //   },
  //   // Set the background color of the chart to be transparent
  //   backgroundColor: "transparent",
  // };

  // Style for the chart container
  const chartContainerStyle = {
    position: "relative", // Relative positioning for the chart container
    width: "100%",
    height: "100%", // Set to '100%' to fill the parent
  };

  return (
    <div style={chartContainerStyle}>
      <Line data={data} options={options} />
    </div>
  );
};

export default StockPriceChart;
