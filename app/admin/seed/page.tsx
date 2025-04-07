'use client';

import { useState } from 'react';
import { toolsData, seedDatabase } from '../../../scripts/seed-data';

export default function SeedPage() {
  const [logs, setLogs] = useState<string[]>([]);
  const [isSeeding, setIsSeeding] = useState(false);

  const handleSeed = async () => {
    setIsSeeding(true);
    setLogs(prev => [...prev, 'Starting database seeding...']);
    
    try {
      await seedDatabase();
      setLogs(prev => [...prev, 'Database seeding completed successfully!']);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Unknown error occurred';
      
      setLogs(prev => [...prev, `Error: ${errorMessage}`]);
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <div className="min-h-screen bg-apple-gray6 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Database Seeding Tool</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <button
            onClick={handleSeed}
            disabled={isSeeding}
            className={`px-4 py-2 rounded-md ${
              isSeeding
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-apple-blue text-white hover:bg-blue-600'
            }`}
          >
            {isSeeding ? 'Seeding...' : 'Seed Database'}
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Logs</h2>
          <div className="space-y-2">
            {logs.map((log, index) => (
              <p key={index} className="text-sm font-mono">
                {log}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}