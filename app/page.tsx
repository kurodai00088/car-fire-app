"use client";

import { useState } from "react";

export default function Home() {
  const [carPrice, setCarPrice] = useState(500);
  const [monthlyCost, setMonthlyCost] = useState(5);
  const [years, setYears] = useState(10);
  const [rate, setRate] = useState(5);

  const invested =
    carPrice * Math.pow(1 + rate / 100, years);

  const runningCost = monthlyCost * 12 * years;

  const totalLoss = invested + runningCost;

  return (
    <main className="min-h-screen p-10 bg-gray-100">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow">

        <h1 className="text-3xl font-bold mb-6">
          Car FIRE Calculator
        </h1>

        <div className="space-y-4">

          <div>
            <label>Car Price (万円)</label>
            <input
              type="number"
              value={carPrice}
              onChange={(e) => setCarPrice(Number(e.target.value))}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label>Monthly Cost (万円)</label>
            <input
              type="number"
              value={monthlyCost}
              onChange={(e) => setMonthlyCost(Number(e.target.value))}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label>Years</label>
            <input
              type="number"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label>Investment Return (%)</label>
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full border p-2 rounded"
            />
          </div>

        </div>

        <div className="mt-8 space-y-3 text-lg">

          <p>
            Investment Value:
            <span className="font-bold">
              {invested.toFixed(0)}万円
            </span>
          </p>

          <p>
            Running Cost:
            <span className="font-bold">
              {runningCost.toFixed(0)}万円
            </span>
          </p>

          <p className="text-2xl font-bold text-red-500">
            Total Difference:
            {totalLoss.toFixed(0)}万円
          </p>

        </div>

      </div>
    </main>
  );
}