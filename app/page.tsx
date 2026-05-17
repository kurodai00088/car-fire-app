"use client";

import { useMemo, useState } from "react";

export default function Home() {
  const [carPrice, setCarPrice] = useState("500");
  const [monthlyCost, setMonthlyCost] = useState("3");
  const [years, setYears] = useState("10");
  const [rate, setRate] = useState("5");

  const numericCarPrice = Number(carPrice) || 0;
  const numericMonthlyCost = Number(monthlyCost) || 0;
  const numericYears = Number(years) || 0;
  const numericRate = Number(rate) || 0;

  const { invested, runningCost, totalLoss } = useMemo(() => {
    const investedValue =
      numericCarPrice *
      Math.pow(1 + numericRate / 100, numericYears);

    const running =
      numericMonthlyCost * 12 * numericYears;

    const total =
      investedValue + running;

    return {
      invested: investedValue,
      runningCost: running,
      totalLoss: total,
    };
  }, [
    numericCarPrice,
    numericMonthlyCost,
    numericYears,
    numericRate,
  ]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-zinc-800 text-white">

      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* Hero */}
        <div className="text-center mb-12">

          <p className="text-sm uppercase tracking-[0.3em] text-zinc-400 mb-3">
            Car × FIRE Simulator
          </p>

          <h1 className="text-5xl md:text-6xl font-black leading-tight mb-6">
            その車、
            <br />
            人生を何年遅らせる？
          </h1>

          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            車を保有した場合の維持費と、
            投資した場合の将来資産を比較。
            <br />
            「好き」と「資産形成」の差を可視化します。
          </p>

        </div>

        {/* Main */}
        <div className="grid lg:grid-cols-2 gap-8">

          {/* Input */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">

            <h2 className="text-2xl font-bold mb-8">
              条件入力
            </h2>

            <div className="space-y-6">

              <InputCard
                label="車両価格"
                unit="万円"
                value={carPrice}
                setValue={setCarPrice}
              />

              <InputCard
                label="月維持費（ガソリン代、整備代等）"
                unit="万円"
                value={monthlyCost}
                setValue={setMonthlyCost}
              />

              <InputCard
                label="投資年数"
                unit="年"
                value={years}
                setValue={setYears}
              />

              <InputCard
                label="想定利回り"
                unit="%"
                value={rate}
                setValue={setRate}
              />

            </div>

          </div>

          {/* Result */}
          <div className="bg-gradient-to-br from-blue-600 to-cyan-500 rounded-3xl p-8 shadow-2xl text-white flex flex-col justify-between">

            <div>

              <p className="uppercase tracking-[0.3em] text-sm text-blue-100 mb-4">
                Simulation Result
              </p>

              <h2 className="text-4xl font-black leading-tight mb-8">
                車を売って
                <br />
                投資した場合
              </h2>

              <div className="space-y-6">

                <div className="bg-white/10 rounded-2xl p-5">
                  <p className="text-sm text-blue-100 mb-2">
                    将来資産
                  </p>

                  <p className="text-4xl font-black">
                    {invested.toFixed(0)}
                    <span className="text-xl ml-1">
                      万円
                    </span>
                  </p>
                </div>

                <div className="bg-white/10 rounded-2xl p-5">
                  <p className="text-sm text-blue-100 mb-2">
                    維持費総額
                  </p>

                  <p className="text-4xl font-black">
                    {runningCost.toFixed(0)}
                    <span className="text-xl ml-1">
                      万円
                    </span>
                  </p>
                </div>

                <div className="bg-black/20 rounded-2xl p-6 border border-white/10">

                  <p className="text-sm text-blue-100 mb-3">
                    人生インパクト
                  </p>

                  <p className="text-5xl font-black mb-4">
                    {totalLoss.toFixed(0)}
                    <span className="text-2xl ml-2">
                      万円
                    </span>
                  </p>

                  <p className="text-xl leading-relaxed text-blue-50">
                    その車は、
                    <br />
                    <span className="font-black text-3xl text-white">
                     　　 {years}年で
                      {totalLoss.toFixed(0)}万円
                    </span>
                    <br />
                    　　　　　　　　の差を生む可能性があります
                  </p>

                </div>

              </div>

            </div>

            <div className="mt-10 text-sm text-blue-100">
              ※ 投資リターンは複利計算による簡易シミュレーションです
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
  setValue: (value: string) => void;
};

function InputCard({
  label,
  unit,
  value,
  setValue,
}: InputCardProps) {
  return (
    <div>
      <label className="block mb-2 text-zinc-300">
        {label}
      </label>

      <div className="relative">

        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={(e) => {
            if (e.target.value === "0") {
              setValue("");
            }
          }}
          onBlur={(e) => {
            if (e.target.value === "") {
              setValue("0");
            }
          }}
          className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-4 text-xl font-bold outline-none focus:border-blue-500"
        />

        <span className="absolute right-4 top-4 text-zinc-400">
          {unit}
        </span>

      </div>
    </div>
  );
}