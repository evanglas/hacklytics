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
      time: new Date(parseInt(timestamp) * 1000 + 1000 * 60 * 60 * 5), // Convert to milliseconds and add 4 hours (for EST),
      price,
    }))
    .sort((a, b) => a.time - b.time); // Sort by time

  // console.log(stockData);
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
        borderColor: "purple",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "time",
        time: {
          unit: "minute",
          displayFormats: {
            minute: "h:mm a",
          },
        },
      },
      y: {
        beginAtZero: false,
      },
    },
  };

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
