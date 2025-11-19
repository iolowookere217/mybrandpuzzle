"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const leaderboardData = [
  {
    rank: 1,
    name: "Maria Santos",
    solved: 12,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=maria",
  },
  {
    rank: 2,
    name: "Alex Johnson",
    solved: 10,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
  },
  {
    rank: 3,
    name: "David Chen",
    solved: 8,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
  },
  {
    rank: 4,
    name: "Sarah Williams",
    solved: 7,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
  },
  {
    rank: 5,
    name: "Michael Brown",
    solved: 6,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
  },
  {
    rank: 6,
    name: "Emma Davis",
    solved: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma",
  },
  {
    rank: 7,
    name: "James Wilson",
    solved: 4,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=james",
  },
  {
    rank: 8,
    name: "Olivia Moore",
    solved: 3,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=olivia",
  },
  {
    rank: 9,
    name: "William Taylor",
    solved: 2,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=william",
  },
  {
    rank: 10,
    name: "Sophia Anderson",
    solved: 1,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sophia",
  },
];

const prizes = [
  50000, 30000, 20000, 15000, 12000, 10000, 8000, 6000, 5000, 4000,
];

export default function LeaderboardPage() {
  const [timeRemaining, setTimeRemaining] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const endOfDay = new Date(now);
      endOfDay.setHours(23, 59, 59, 999);
      const diff = endOfDay.getTime() - now.getTime();

      setTimeRemaining({
        hours: Math.floor(diff / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatNumber = (n: number) => String(n).padStart(2, "0");

  const getRankStyle = (rank: number) => {
    if (rank === 1) return "text-yellow-400";
    if (rank === 2) return "text-gray-300";
    if (rank === 3) return "text-amber-600";
    return "text-dark-400";
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-dark-100 font-[family-name:var(--font-orbitron)] mb-4">
          Daily Leaderboard
        </h1>
        <p className="text-dark-400">
          Top 10 players win prizes every 24 hours!
        </p>
      </div>

      {/* Countdown Timer */}
      <Card className="gaming-card mb-8">
        <CardContent className="p-6">
          <div className="text-center">
            <h3 className="text-lg font-bold text-dark-100 mb-4">
              Time Until Reset
            </h3>
            <div className="flex justify-center gap-4">
              <div className="bg-dark-800 rounded-xl p-4 min-w-[80px]">
                <p className="text-3xl sm:text-4xl font-bold text-primary-500 font-mono">
                  {formatNumber(timeRemaining.hours)}
                </p>
                <p className="text-xs text-dark-500 mt-1">HOURS</p>
              </div>
              <div className="bg-dark-800 rounded-xl p-4 min-w-[80px]">
                <p className="text-3xl sm:text-4xl font-bold text-primary-500 font-mono">
                  {formatNumber(timeRemaining.minutes)}
                </p>
                <p className="text-xs text-dark-500 mt-1">MINS</p>
              </div>
              <div className="bg-dark-800 rounded-xl p-4 min-w-[80px]">
                <p className="text-3xl sm:text-4xl font-bold text-primary-500 font-mono">
                  {formatNumber(timeRemaining.seconds)}
                </p>
                <p className="text-xs text-dark-500 mt-1">SECS</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Prize Pool */}
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <Card className="gaming-card border-yellow-500/30">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-dark-400 mb-1">1st Place</p>
            <p className="text-2xl font-bold text-yellow-400">N50,000</p>
          </CardContent>
        </Card>
        <Card className="gaming-card border-gray-400/30">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-dark-400 mb-1">2nd Place</p>
            <p className="text-2xl font-bold text-gray-300">N30,000</p>
          </CardContent>
        </Card>
        <Card className="gaming-card border-amber-600/30">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-dark-400 mb-1">3rd Place</p>
            <p className="text-2xl font-bold text-amber-600">N20,000</p>
          </CardContent>
        </Card>
      </div>

      {/* Leaderboard Table */}
      <Card className="gaming-card">
        <CardHeader>
          <CardTitle className="text-lg">Current Rankings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {leaderboardData.map((entry) => (
              <div
                key={entry.rank}
                className={
                  "flex items-center justify-between p-3 rounded-lg " +
                  (entry.rank <= 3
                    ? "bg-dark-800/70 border border-primary-500/20"
                    : "bg-dark-800/30")
                }>
                <div className="flex items-center gap-4">
                  <span
                    className={
                      "text-lg font-bold w-8 " + getRankStyle(entry.rank)
                    }>
                    #{entry.rank}
                  </span>
                  <Image
                    src={entry.avatar}
                    alt={entry.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-semibold text-dark-100">{entry.name}</p>
                    <p className="text-xs text-dark-400">
                      {entry.solved} campaigns solved
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={
                      "font-bold " +
                      (entry.rank <= 3 ? "text-primary-500" : "text-dark-300")
                    }>
                    N{prizes[entry.rank - 1].toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
