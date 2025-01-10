"use client";
import React, { useState, useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2"; // Chart.js
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import "chart.js/auto";

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const [overviewData, setOverviewData] = useState({
    totalUsers: 0,
    totalSales: 0,
    pendingOrders: 0,
    completedOrders: 0,
  });

  const [chartData, setChartData] = useState({
    barChart: {
      labels: ["January", "February", "March", "April"],
      datasets: [
        {
          label: "Sales",
          data: [300, 500, 100, 400],
          backgroundColor: "rgba(54, 162, 235, 0.6)",
        },
      ],
    },
    pieChart: {
      labels: ["Completed", "Pending", "Cancelled"],
      datasets: [
        {
          data: [60, 30, 10],
          backgroundColor: ["#36A2EB", "#FFCE56", "#FF6384"],
        },
      ],
    },
  });

  // Simulating fetching data
  useEffect(() => {
    // Simulating dynamic data fetch
    setOverviewData({
      totalUsers: 1200,
      totalSales: 50000,
      pendingOrders: 20,
      completedOrders: 300,
    });
  }, []);

  return (
    <div className="flex justify-center items-center w-full">
      <div className="p-4 space-y-6 ">
        {/* Overview Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Total Users */}
          <div className="bg-default-200 p-4 rounded-lg shadow-md flex flex-col items-center">
            <h3 className="text-lg font-semibold">Total Users</h3>
            <p className="text-xl">{overviewData.totalUsers}</p>
          </div>

          {/* Card 2: Total Sales */}
          <div className="bg-default-200 p-4 rounded-lg shadow-md flex flex-col items-center">
            <h3 className="text-lg font-semibold">Total Sales</h3>
            <p className="text-xl">${overviewData.totalSales}</p>
          </div>

          {/* Card 3: Pending Orders */}
          <div className="bg-default-200 p-4 rounded-lg shadow-md flex flex-col items-center">
            <h3 className="text-lg font-semibold">Pending Orders</h3>
            <p className="text-xl">{overviewData.pendingOrders}</p>
          </div>

          {/* Card 4: Completed Orders */}
          <div className="bg-default-200 p-4 rounded-lg shadow-md flex flex-col items-center">
            <h3 className="text-lg font-semibold">Completed Orders</h3>
            <p className="text-xl">{overviewData.completedOrders}</p>
          </div>
        </div>

        {/* Chart Section */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Bar Chart */}
          <div className="bg-default-200 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">
              Sales Data (Bar Chart)
            </h3>
            <Bar data={chartData.barChart} />
          </div>

          {/* Pie Chart */}
          <div className="bg-default-200 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">
              Order Status (Pie Chart)
            </h3>
            <Pie data={chartData.pieChart} />
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-default-200 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="border px-4 py-2">Order ID</th>
                <th className="border px-4 py-2">Customer</th>
                <th className="border px-4 py-2">Amount</th>
                <th className="border px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {/* Dynamic Table Rows */}
              {[
                {
                  id: 1,
                  customer: "John Doe",
                  amount: "$120",
                  status: "Completed",
                },
                {
                  id: 2,
                  customer: "Jane Smith",
                  amount: "$250",
                  status: "Pending",
                },
                {
                  id: 3,
                  customer: "Michael Brown",
                  amount: "$80",
                  status: "Completed",
                },
              ].map((order) => (
                <tr key={order.id}>
                  <td className="border px-4 py-2">{order.id}</td>
                  <td className="border px-4 py-2">{order.customer}</td>
                  <td className="border px-4 py-2">{order.amount}</td>
                  <td className="border px-4 py-2">{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
