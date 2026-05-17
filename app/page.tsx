"use client";

import { useMemo, useState } from "react";

import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";

export default function Home() {
  const [purchaseType, setPurchaseType] = useState("cash");

  const [carPrice, setCarPrice] = useState("500");
  const [monthlyCost, setMonthlyCost] = useState("3");
  const [years, setYears] = useState("10");
  const [rate, setRate] = useState("5");

  const [loanYears, setLoanYears] = useState("5");
  const [loanRate, setLoanRate] = useState("3");

  const numericCarPrice = Number(carPrice) || 0;
  const numericMonthlyCost = Number(monthlyCost) || 0;
  const numericYears = Number(years) || 0;
  const numericRate = Number(rate) || 0;

  const numericLoanYears = Number(loanYears) || 0;
  const numericLoanRate = Number(loanRate) || 0;

  const {
    invested,
    runningCost,
    totalLoss,
    loanTotal,
    monthlyLoanPayment,
    chartData,
  } = useMemo(() => {
    // 将来資産（車を買わず投資した場合）
    const investedValue =
      numericCarPrice *
      Math.pow(1 + numericRate / 100, numericYears);

    // 維持費
    const running =
      numericMonthlyCost * 12 * numericYears;

    // ローン計算
    let totalLoanCost = numericCarPrice;
    let monthlyPayment = 0;

    if (purchaseType === "loan") {
      const principal = numericCarPrice * 10000;
      const monthlyInterest = numericLoanRate / 100 / 12;
      const payments = numericLoanYears * 12;

      monthlyPayment =
        (principal *
          (monthlyInterest *
            Math.pow(1 + monthlyInterest, payments))) /
        (Math.pow(1 + monthlyInterest, payments) - 1);

      totalLoanCost = (monthlyPayment * payments) / 10000;
    }

    const total =
      investedValue +
      running +
      (purchaseType === "loan"
        ? totalLoanCost - numericCarPrice
        : 0);

    // グラフ（将来資産のみ）
    const chartData = [];

    for (let i = 0; i <= numericYears; i++) {
      const investedIfNoCar =
        numericCarPrice *
        Math.pow(1 + numericRate / 100, i);

      chartData.push({
        year: i,
        investment: Math.round(investedIfNoCar),
      });
    }

    return {
      invested: investedValue,
      runningCost: running,
      totalLoss: total,
      loanTotal: totalLoanCost,
      monthlyLoanPayment: monthlyPayment / 10000,
      chartData,
    };
  }, [
    purchaseType,
    numericCarPrice,
    numericMonthlyCost,
    numericYears,
    numericRate,
    numericLoanYears,
    numericLoanRate,
  ]);

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">

      {/* Background */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.15),transparent_25%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.12),transparent_25%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 py-10">

        {/* Header */}
        <div className="mb-12">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-sm mb-6">
            Car × FIRE Simulator
          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-center">

            <div>
              <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
                その車、人生を何年遅らせる？
              </h1>

              <p className="text-zinc-400">
                車を買う代わりに投資した場合の資産差を可視化
              </p>
            </div>

            <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-3xl p-8">

              <p className="text-sm text-cyan-100 mb-2">
                LIFE IMPACT
              </p>

              <p className="text-5xl font-black">
                {Number.isFinite(totalLoss) ? totalLoss.toFixed(0) : 0}
                <span className="text-xl ml-1">万円</span>
              </p>

              <p className="mt-4 text-cyan-50">
                その車を買わなければ、
                <br />
                <span className="font-bold text-white">
                  {years}年後に資産差が発生
                </span>
              </p>

            </div>

          </div>
        </div>

        {/* Main */}
        <div className="grid xl:grid-cols-[420px_1fr] gap-8">

          {/* Input */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">

            <h2 className="text-xl font-bold mb-6">
              条件入力
            </h2>

            <div className="grid grid-cols-2 gap-3 mb-6">

              <button
                onClick={() => setPurchaseType("cash")}
                className={`p-3 rounded-xl ${
                  purchaseType === "cash"
                    ? "bg-cyan-400 text-black"
                    : "bg-zinc-900"
                }`}
              >
                一括
              </button>

              <button
                onClick={() => setPurchaseType("loan")}
                className={`p-3 rounded-xl ${
                  purchaseType === "loan"
                    ? "bg-cyan-400 text-black"
                    : "bg-zinc-900"
                }`}
              >
                ローン
              </button>

            </div>

            <div className="space-y-4">

              <InputCard label="車両価格" unit="万円" value={carPrice} setValue={setCarPrice} />
              <InputCard label="月維持費" unit="万円" value={monthlyCost} setValue={setMonthlyCost} />
              <InputCard label="投資年数" unit="年" value={years} setValue={setYears} />
              <InputCard label="利回り" unit="%" value={rate} setValue={setRate} />

              {purchaseType === "loan" && (
                <>
                  <InputCard label="ローン年数" unit="年" value={loanYears} setValue={setLoanYears} />
                  <InputCard label="金利" unit="%" value={loanRate} setValue={setLoanRate} />
                </>
              )}

            </div>

          </div>

          {/* Chart */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">

            <h3 className="text-2xl font-bold mb-6">
              車を買わない場合の資産推移
            </h3>

            <div className="h-[400px]">

              <ResponsiveContainer width="100%" height="100%">

                <AreaChart data={chartData}>

                  <CartesianGrid stroke="#333" opacity={0.3} />

                  <XAxis
                    dataKey="year"
                    tickFormatter={(v) => `${v}年`}
                  />

                  <YAxis />

                  <Tooltip
                    formatter={(value) => {
                      if (typeof value !== "number") return ["0万円", "資産"];
                      return [`${value.toLocaleString()}万円`, "資産"];
                    }}
                  />

                  <Area
                    type="monotone"
                    dataKey="investment"
                    stroke="#22d3ee"
                    fill="#22d3ee"
                    fillOpacity={0.2}
                    strokeWidth={3}
                  />

                </AreaChart>

              </ResponsiveContainer>

            </div>

          </div>

        </div>

      </div>
    </main>
  );
}

type InputCardProps = {
  label: string;
  unit: string;
  value: string;
  setValue: (v: string) => void;
};

function InputCard({ label, unit, value, setValue }: InputCardProps) {
  return (
    <div>
      <label className="text-sm text-zinc-400">{label}</label>

      <input
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-lg"
      />

      <span className="text-xs text-zinc-500">{unit}</span>
    </div>
  );
}