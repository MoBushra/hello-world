"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export type MatchType = 'live' | 'tv';

export interface Match {
  id: string;
  teamHome: string;
  teamAway: string;
  date: string;
  type: MatchType;
  sport: string;
  duration?: number;
  notes?: string;
  scoreHome?: number;
  scoreAway?: number;
}

interface MatchContextType {
  matches: Match[];
  addMatch: (match: Omit<Match, 'id'>) => void;
  deleteMatch: (id: string) => void;
}

const MatchContext = createContext<MatchContextType | undefined>(undefined);

export function MatchProvider({ children }: { children: React.ReactNode }) {
  const [matches, setMatches] = useState<Match[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('matches');
    if (saved) {
      try {
        setMatches(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse matches from local storage');
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('matches', JSON.stringify(matches));
    }
  }, [matches, isLoaded]);

  const addMatch = (match: Omit<Match, 'id'>) => {
    const newMatch = { ...match, id: crypto.randomUUID() };
    setMatches(prev => [newMatch, ...prev]);
  };

  const deleteMatch = (id: string) => {
    setMatches(prev => prev.filter(m => m.id !== id));
  };

  return (
    <MatchContext.Provider value={{ matches, addMatch, deleteMatch }}>
      {children}
    </MatchContext.Provider>
  );
}

export function useMatches() {
  const context = useContext(MatchContext);
  if (context === undefined) {
    throw new Error('useMatches must be used within a MatchProvider');
  }
  return context;
}
