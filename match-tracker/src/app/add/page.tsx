"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMatches, MatchType } from '@/context/MatchContext';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function AddMatchPage() {
  const router = useRouter();
  const { addMatch } = useMatches();
  
  const [formData, setFormData] = useState({
    teamHome: '',
    teamAway: '',
    date: new Date().toISOString().slice(0, 16),
    type: 'tv' as MatchType,
    sport: 'Football',
    scoreHome: '',
    scoreAway: '',
    duration: '',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addMatch({
      teamHome: formData.teamHome,
      teamAway: formData.teamAway,
      date: formData.date,
      type: formData.type,
      sport: formData.sport,
      scoreHome: formData.scoreHome ? parseInt(formData.scoreHome) : undefined,
      scoreAway: formData.scoreAway ? parseInt(formData.scoreAway) : undefined,
      duration: formData.duration ? parseInt(formData.duration) : undefined,
      notes: formData.notes,
    });
    router.push('/matches');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6 flex items-center">
        <Link href="/" className="mr-4 text-gray-500 hover:text-gray-900">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-2xl font-bold">Log a Match</h1>
      </div>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Home Team</label>
            <input
              type="text"
              name="teamHome"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.teamHome}
              onChange={handleChange}
              data-testid="input-home-team"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Away Team</label>
            <input
              type="text"
              name="teamAway"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.teamAway}
              onChange={handleChange}
              data-testid="input-away-team"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Score (Home)</label>
            <input
              type="number"
              name="scoreHome"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.scoreHome}
              onChange={handleChange}
              data-testid="input-score-home"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Score (Away)</label>
            <input
              type="number"
              name="scoreAway"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.scoreAway}
              onChange={handleChange}
              data-testid="input-score-away"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date & Time</label>
            <input
              type="datetime-local"
              name="date"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.date}
              onChange={handleChange}
              data-testid="input-date"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sport</label>
            <select
              name="sport"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.sport}
              onChange={handleChange}
              data-testid="select-sport"
            >
              <option value="Football">Football</option>
              <option value="Basketball">Basketball</option>
              <option value="Tennis">Tennis</option>
              <option value="Volleyball">Volleyball</option>
              <option value="Rugby">Rugby</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Duration (Minutes)</label>
            <input
              type="number"
              name="duration"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.duration}
              onChange={handleChange}
              placeholder="e.g. 90"
              data-testid="input-duration"
            />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">How did you watch it?</label>
          <div className="flex space-x-4">
            <label className={`flex-1 flex items-center justify-center px-4 py-3 border rounded-md cursor-pointer transition-colors ${formData.type === 'tv' ? 'bg-blue-50 border-blue-500 text-blue-700' : 'border-gray-300 hover:bg-gray-50'}`}>
              <input
                type="radio"
                name="type"
                value="tv"
                checked={formData.type === 'tv'}
                onChange={handleChange}
                className="sr-only"
                data-testid="radio-tv"
              />
              <span className="font-medium">On TV / Stream</span>
            </label>
            <label className={`flex-1 flex items-center justify-center px-4 py-3 border rounded-md cursor-pointer transition-colors ${formData.type === 'live' ? 'bg-green-50 border-green-500 text-green-700' : 'border-gray-300 hover:bg-gray-50'}`}>
              <input
                type="radio"
                name="type"
                value="live"
                checked={formData.type === 'live'}
                onChange={handleChange}
                className="sr-only"
                data-testid="radio-live"
              />
              <span className="font-medium">Live at Stadium</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
          <textarea
            name="notes"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.notes}
            onChange={handleChange}
            data-testid="input-notes"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors"
          data-testid="submit-match"
        >
          Save Match
        </button>
      </form>
    </div>
  );
}
