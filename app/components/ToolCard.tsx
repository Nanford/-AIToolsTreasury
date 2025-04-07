import { useState } from 'react';
import { AITool, Category } from '../types';
import { createClient } from '@supabase/supabase-js';

type ToolCardProps = {
  tool: AITool;
};

export default function ToolCard({ tool }: ToolCardProps) {
  const [clicks, setClicks] = useState(tool.clicks || 0);

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleClick = async () => {
    try {
      const newClicks = clicks + 1;
      setClicks(newClicks);
      
      const { error } = await supabase
        .from('tools')
        .update({ clicks: newClicks })
        .eq('id', tool.id);

      if (error) {
        console.error('Error updating clicks:', error);
      }
    } catch (error) {
      console.error('Error handling click:', error);
    }
  };

  const isValidUrl = (urlString: string | null): boolean => {
    if (!urlString) return false;
    try {
      const urlToCheck = urlString.startsWith('http') ? urlString : `https://${urlString}`;
      new URL(urlToCheck);
      return true;
    } catch (e) {
      return false;
    }
  };

  const getValidUrl = (url: string): string => {
    return url.startsWith('http') ? url : `https://${url}`;
  };

  // Get first letter for placeholder logo
  const firstLetter = tool.name.charAt(0).toUpperCase();
  const fallbackImageUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(firstLetter)}&background=007AFF&color=fff`;

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:transform hover:translate-y-[-5px] flex flex-col h-full overflow-hidden">
      <a 
        href={isValidUrl(tool.website_url) ? getValidUrl(tool.website_url) : '#'}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className="p-6 flex flex-col h-full"
      >
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 relative mr-4 flex-shrink-0">
            {tool.logo_url && isValidUrl(tool.logo_url) ? (
              <img 
                src={getValidUrl(tool.logo_url)}
                alt={`${tool.name} logo`}
                className="rounded-md object-contain w-full h-full"
                onError={(e) => {
                  e.currentTarget.src = fallbackImageUrl;
                }}
              />
            ) : (
              <div className="w-12 h-12 bg-gradient-to-r from-[#007AFF] to-[#0066CC] rounded-md flex items-center justify-center text-white font-bold text-xl">
                {firstLetter}
              </div>
            )}
          </div>
          <h3 className="text-lg font-bold text-[#007AFF]">{tool.name}</h3>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {tool.categories.map((category, index) => (
            <span 
              key={index} 
              className="text-xs bg-gray-100 text-[#007AFF] px-2 py-0.5 rounded-full"
            >
              {category}
            </span>
          ))}
        </div>
        
        <p className="text-sm text-gray-600 line-clamp-3 flex-grow mb-4">{tool.description}</p>
        
        <div className="flex justify-between items-center mt-auto">
          <div className="flex flex-wrap gap-1">
            {tool.tags.slice(0, 3).map((tag, index) => (
              <span 
                key={index} 
                className="text-xs text-gray-500 bg-gray-50 px-2 py-0.5 rounded-full"
              >
                #{tag}
              </span>
            ))}
            {tool.tags.length > 3 && (
              <span className="text-xs text-gray-500">+{tool.tags.length - 3}</span>
            )}
          </div>
          {isValidUrl(tool.website_url) && (
            <span className="text-[#007AFF] font-medium text-sm">访问网站 →</span>
          )}
        </div>
      </a>
      <div className="px-6 pb-4 text-sm text-gray-500">
        点击量: {clicks}
      </div>
    </div>
  );
} 