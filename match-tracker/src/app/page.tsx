"use client";

import Link from 'next/link';
import { useMatches } from '@/context/MatchContext';
import { PlusCircle, Trophy, Tv, MapPin } from 'lucide-react';

export default function Home() {
  const { matches } = useMatches();
  
  // Get recent matches (top 3)
  const recentMatches = [...matches]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <div className="space-y-8">
      <section className="text-center py-12 bg-white rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Track Every Match</h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Keep a record of every sports match you watch live or on TV. 
          See your statistics grow over the season.
        </p>
        <Link 
          href="/add" 
          className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
        >
          <PlusCircle className="w-6 h-6 mr-2" />
          Log a Match
        </Link>
      </section>

      {matches.length > 0 && (
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Recent Activity</h2>
            <Link href="/matches" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              View All
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentMatches.map(match => (
              <div key={match.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{match.sport}</span>
                    <span className="text-xs text-gray-400">{new Date(match.date).toLocaleDateString()}</span>
                  </div>
                  <div className="font-bold text-gray-900 mb-1">{match.teamHome} vs {match.teamAway}</div>
                  {match.scoreHome !== undefined && (
                     <div className="text-sm font-mono font-medium text-gray-600 mb-2">
                       {match.scoreHome} - {match.scoreAway}
                     </div>
                  )}
                </div>
                <div className="mt-4 pt-3 border-t border-gray-50 flex items-center text-xs font-medium">
                  {match.type === 'live' ? (
                    <span className="flex items-center text-green-600">
                      <MapPin className="w-3 h-3 mr-1" /> Live at Stadium
                    </span>
                  ) : (
                    <span className="flex items-center text-blue-600">
                      <Tv className="w-3 h-3 mr-1" /> Watched on TV
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl text-white shadow-lg">
          <Trophy className="w-8 h-8 mb-4 opacity-80" />
          <div className="text-2xl font-bold mb-1">{matches.length}</div>
          <div className="text-sm opacity-90">Total Matches Watched</div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-xl text-white shadow-lg">
           <MapPin className="w-8 h-8 mb-4 opacity-80" />
           <div className="text-2xl font-bold mb-1">{matches.filter(m => m.type === 'live').length}</div>
           <div className="text-sm opacity-90">Live Experiences</div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-xl text-white shadow-lg">
           <Tv className="w-8 h-8 mb-4 opacity-80" />
           <div className="text-2xl font-bold mb-1">{matches.filter(m => m.type === 'tv').length}</div>
           <div className="text-sm opacity-90">TV Broadcasts</div>
        </div>
      </section>
    </div>
  );
}
