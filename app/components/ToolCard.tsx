'use client';

import { useState } from 'react';
import { supabase } from '../utils/supabase';

interface ToolCardProps {
  tool: {
    id: number;
    name: string;
    description: string;
    website_url: string;
    categories: string[];
    tags: string[];
    clicks: number;
    logo_url?: string | null;
  };
}

export default function ToolCard({ tool }: ToolCardProps) {
  const [clicks, setClicks] = useState(tool.clicks);

  const handleClick = async () => {
    try {
      // 更新点击量
      const { error } = await supabase
        .from('tools')
        .update({ clicks: clicks + 1 })
        .eq('id', tool.id);

      if (error) throw error;
      
      setClicks(prev => prev + 1);
    } catch (error) {
      console.error('Error updating clicks:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-lg bg-apple-gray6 flex items-center justify-center mr-4">
          {tool.logo_url ? (
            <img src={tool.logo_url} alt={tool.name} className="w-8 h-8" />
          ) : (
            <span className="text-2xl">{tool.name.charAt(0)}</span>
          )}
        </div>
        <h3 className="text-xl font-semibold text-gray-900">{tool.name}</h3>
      </div>

      <div className="mb-4">
        {tool.categories.map((category, index) => (
          <span
            key={index}
            className="inline-block bg-apple-gray6 text-apple-gray px-3 py-1 rounded-full text-sm mr-2 mb-2"
          >
            {category}
          </span>
        ))}
      </div>

      <p className="text-gray-600 mb-4">{tool.description}</p>

      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {tool.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-block bg-apple-gray6 text-apple-gray px-2 py-1 rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="text-sm text-apple-gray">
          {clicks} clicks
        </div>
      </div>

      <a
        href={tool.website_url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className="mt-4 block w-full text-center bg-apple-blue text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-200"
      >
        Visit Website
      </a>
    </div>
  );
} 