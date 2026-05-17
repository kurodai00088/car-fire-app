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

  const [purchaseType, setPurchaseType] =
    useState("cash");

  const [carPrice, setCarPrice] =
    useState("500");

  const [monthlyCost, setMonthlyCost] =
    useState("3");

  const [years, setYears] =
    useState("10");

  const [rate, setRate] =
    useState("5");

  const [loanYears, setLoanYears] =
    useState("5");

  const [loanRate, setLoanRate] =
    useState("3");

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

    // 将来資産（車なし）
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

    // グラフデータ（将来資産のみ）
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

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-sm font-medium mb-6">
            Car × FIRE Simulator
          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-center">

            <div>

              <h1 className="text-5xl md:text-7xl font-black leading-[1.05] tracking-tight mb-6">
                その車、
                <br />
                <span className="bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">
                  人生を何年
                </span>
                遅らせる？
              </h1>

              <p className="text-zinc-400 text-lg leading-relaxed max-w-xl">
                車に使うお金を投資した場合の将来資産をシミュレーションします。
              </p>

            </div>

            {/* Impact */}
            <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-[32px] p-8 shadow-[0_0_80px_rgba(34,211,238,0.25)] border border-white/10">

              <p className="uppercase tracking-[0.25em] text-sm text-cyan-100 mb-3">
                LIFE IMPACT
              </p>

              <p className="text-6xl font-black mb-3">
                {totalLoss.toFixed(0)}
                <span className="text-2xl ml-2">万円</span>
              </p>

              <p className="text-cyan-50 text-xl leading-relaxed">
                その車を買わなければ、
                <span className="font-black text-white">
                  {years}年後に
                  {totalLoss.toFixed(0)}万円
                </span>
                多く資産を持てる可能性があります。
              </p>

            </div>

          </div>

        </div>

        {/* Main */}
        <div className="grid xl:grid-cols-[420px_1fr] gap-8">

          {/* Sidebar */}
          <div className="bg-white/[0.04] border border-white/10 backdrop-blur-2xl rounded-[32px] p-8 h-fit sticky top-6">

            <h2 className="text-2xl font-bold mb-8">
              条件入力
            </h2>

            {/* Purchase */}
            <div className="mb-8">

              <div className="grid grid-cols-2 gap-3">

                <button
                  onClick={() => setPurchaseType("cash")}
                  className={`rounded-2xl p-4 font-bold ${
                    purchaseType === "cash"
                      ? "bg-cyan-400 text-black"
                      : "bg-zinc-900"
                  }`}
                >
                  一括
                </button>

                <button
                  onClick={() => setPurchaseType("loan")}
                  className={`rounded-2xl p-4 font-bold ${
                    purchaseType === "loan"
                      ? "bg-cyan-400 text-black"
                      : "bg-zinc-900"
                  }`}
                >
                  ローン
                </button>

              </div>

            </div>

            <div className="space-y-5">

              <InputCard label="車両価格" unit="万円" value={carPrice} setValue={setCarPrice} />
              <InputCard label="月維持費" unit="万円" value={monthlyCost} setValue={setMonthlyCost} />
              <InputCard label="投資年数" unit="年" value={years} setValue={setYears} />
              <InputCard label="想定利回り" unit="%" value={rate} setValue={setRate} />

              {purchaseType === "loan" && (
                <>
                  <InputCard label="ローン年数" unit="年" value={loanYears} setValue={setLoanYears} />
                  <InputCard label="ローン金利" unit="%" value={loanRate} setValue={setLoanRate} />
                </>
              )}

            </div>

          </div>

          {/* Chart */}
          <div className="bg-white/[0.04] border border-white/10 backdrop-blur-2xl rounded-[32px] p-8">

            <div className="mb-8">

              <p className="text-cyan-300 text-sm tracking-[0.2em]">
                Asset Growth
              </p>

              <h3 className="text-3xl font-black">
                この車を買わない場合の資産推移
              </h3>

            </div>

            <div className="h-[420px]">

              <ResponsiveContainer width="100%" height="100%">

                <AreaChart data={chartData}>

                  <defs>
                    <linearGradient id="investment" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
                    </linearGradient>
                  </defs>

                  <CartesianGrid stroke="#334155" opacity={0.25} vertical={false} />

                  <XAxis
                    dataKey="year"
                    stroke="#94a3b8"
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v) => `${v}年`}
                  />

                  <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} />

                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#09090b",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "16px",
                    }}
                    formatter={(value: number) => [`${value}万円`, "将来資産"]}
                  />

                  <Area
                    type="monotone"
                    dataKey="investment"
                    stroke="#22d3ee"
                    fill="url(#investment)"
                    strokeWidth={4}
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

function InputCard({ label, unit, value, setValue }: any) {
  return (
    <div>
      <label className="text-sm text-zinc-400">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-xl font-bold"
      />
      <span className="text-zinc-500 text-sm">{unit}</span>
    </div>
  );
}