"use client";

import { useMatches } from '@/context/MatchContext';
import { Trash2, Tv, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function MatchesPage() {
  const { matches, deleteMatch } = useMatches();

  // Sort matches by date descending
  const sortedMatches = [...matches].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  if (matches.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">No matches tracked yet</h2>
        <p className="text-gray-500 mb-6">Start tracking your sports journey today!</p>
        <Link href="/add" className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
          Log First Match
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Match History</h1>
      <div className="space-y-4">
        {sortedMatches.map((match) => (
          <div key={match.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center text-xs text-gray-500 mb-1">
                  <span className="bg-gray-100 px-2 py-0.5 rounded mr-2">{match.sport}</span>
                  <span>{new Date(match.date).toLocaleDateString()}</span>
                  <span className="mx-1">•</span>
                  <span>{new Date(match.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                </div>
                
                <div className="flex items-center space-x-2 my-2">
                   <div className="font-bold text-lg">{match.teamHome}</div>
                   <div className="text-gray-400 text-sm">vs</div>
                   <div className="font-bold text-lg">{match.teamAway}</div>
                   {(match.scoreHome !== undefined && match.scoreAway !== undefined) && (
                     <div className="ml-4 bg-gray-50 px-2 py-1 rounded font-mono font-bold text-gray-800">
                       {match.scoreHome} - {match.scoreAway}
                     </div>
                   )}
                </div>

                <div className="flex items-center text-sm text-gray-600 mt-2">
                  {match.type === 'live' ? (
                    <div className="flex items-center text-green-700 bg-green-50 px-2 py-0.5 rounded-full text-xs font-medium">
                      <MapPin className="w-3 h-3 mr-1" />
                      Live
                    </div>
                  ) : (
                    <div className="flex items-center text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full text-xs font-medium">
                      <Tv className="w-3 h-3 mr-1" />
                      TV
                    </div>
                  )}
                  {match.notes && (
                    <div className="ml-3 text-gray-500 italic truncate max-w-xs">
                      "{match.notes}"
                    </div>
                  )}
                </div>
              </div>

              <button 
                onClick={() => deleteMatch(match.id)}
                className="text-gray-400 hover:text-red-500 p-2 transition-colors"
                title="Delete match"
                data-testid={`delete-match-${match.id}`}
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
