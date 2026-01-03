"use client";

import { useMatches, Match } from '@/context/MatchContext';
import { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts'; // Wait, I need to install recharts first?
// Or I can build simple CSS charts to avoid heavy dependencies if not requested.
// The prompt asked for "nice statistics".
// I'll avoid installing recharts for now to keep it lightweight and use simple CSS bars or just numbers for MVP.
// If I need charts, I can install recharts. Recharts is standard for React.
// Let's stick to simple stats cards and lists for now, maybe simple CSS progress bars.

export default function StatsPage() {
  const { matches } = useMatches();

  const stats = useMemo(() => {
    const total = matches.length;
    const live = matches.filter(m => m.type === 'live').length;
    const tv = matches.filter(m => m.type === 'tv').length;
    const minutes = matches.reduce((acc, m) => acc + (m.duration || 0), 0);
    
    // Team frequency
    const teams: Record<string, number> = {};
    matches.forEach(m => {
      teams[m.teamHome] = (teams[m.teamHome] || 0) + 1;
      teams[m.teamAway] = (teams[m.teamAway] || 0) + 1;
    });
    
    const topTeams = Object.entries(teams)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);

    // Sports frequency
    const sports: Record<string, number> = {};
    matches.forEach(m => {
      sports[m.sport] = (sports[m.sport] || 0) + 1;
    });
    
    const topSports = Object.entries(sports)
      .sort(([, a], [, b]) => b - a);

    return { total, live, tv, topTeams, topSports, minutes };
  }, [matches]);

  if (matches.length === 0) {
    return (
        <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-gray-700">No stats available</h2>
            <p className="text-gray-500">Log some matches to see your statistics.</p>
        </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Your Year in Sports</h1>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
            <div className="text-3xl font-bold text-blue-600">{stats.total}</div>
            <div className="text-gray-500 text-sm uppercase tracking-wide">Total Matches</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
            <div className="text-3xl font-bold text-green-600">{stats.live}</div>
            <div className="text-gray-500 text-sm uppercase tracking-wide">Watched Live</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
            <div className="text-3xl font-bold text-purple-600">{stats.tv}</div>
            <div className="text-gray-500 text-sm uppercase tracking-wide">Watched on TV</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
            <div className="text-3xl font-bold text-orange-600">{stats.minutes}</div>
            <div className="text-gray-500 text-sm uppercase tracking-wide">Minutes Watched</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Top Teams */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="font-bold text-lg mb-4">Top Teams Watched</h3>
            <div className="space-y-4">
                {stats.topTeams.map(([team, count], idx) => (
                    <div key={team}>
                        <div className="flex justify-between text-sm mb-1">
                            <span className="font-medium">{idx + 1}. {team}</span>
                            <span className="text-gray-500">{count} matches</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2">
                            <div 
                                className="bg-blue-500 h-2 rounded-full" 
                                style={{ width: `${(count / stats.total) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Sports Breakdown */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="font-bold text-lg mb-4">Sports Breakdown</h3>
            <div className="space-y-4">
                {stats.topSports.map(([sport, count]) => (
                    <div key={sport}>
                        <div className="flex justify-between text-sm mb-1">
                            <span className="font-medium">{sport}</span>
                            <span className="text-gray-500">{count} matches</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2">
                            <div 
                                className="bg-orange-500 h-2 rounded-full" 
                                style={{ width: `${(count / stats.total) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}
