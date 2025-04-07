'use client';

import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import CategoryMenu from './components/CategoryMenu';
import ToolCard from './components/ToolCard';
import { supabase } from './utils/supabase';
import { AITool, Category } from './types';

export default function Home() {
  const [tools, setTools] = useState<AITool[]>([]);
  const [filteredTools, setFilteredTools] = useState<AITool[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 获取工具数据
  useEffect(() => {
    async function fetchTools() {
      setIsLoading(true);
      try {
        let query = supabase
          .from('tools')
          .select('*')
          .order('clicks', { ascending: false });
        
        const { data, error } = await query;

        if (error) {
          throw error;
        }

        if (data) {
          setTools(data as AITool[]);
          setFilteredTools(data as AITool[]);
        }
      } catch (error: any) {
        console.error('Error fetching tools:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTools();
  }, []);

  // 根据分类筛选工具
  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredTools(tools);
    } else {
      const filtered = tools.filter(tool => 
        tool.categories.includes(selectedCategory)
      );
      setFilteredTools(filtered);
    }
  }, [selectedCategory, tools]);

  // 处理搜索
  const handleSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) {
      // 如果搜索词为空，恢复到当前分类的所有工具
      if (selectedCategory === 'All') {
        setFilteredTools(tools);
      } else {
        setFilteredTools(tools.filter(tool => 
          tool.categories.includes(selectedCategory)
        ));
      }
      return;
    }

    const search = searchTerm.toLowerCase();
    const searchResults = tools.filter(tool => {
      // 如果当前选择了分类，也需要考虑分类筛选
      const matchesCategory = selectedCategory === 'All' || 
        tool.categories.includes(selectedCategory);
      
      if (!matchesCategory) {
        return false;
      }

      // 搜索名称、描述和标签
      return (
        tool.name.toLowerCase().includes(search) ||
        tool.description.toLowerCase().includes(search) ||
        tool.tags.some(tag => tag.toLowerCase().includes(search))
      );
    });

    setFilteredTools(searchResults);
  };

  return (
    <div className="min-h-screen flex flex-col bg-apple-gray6">
      <Header />
      
      <main className="flex-grow container mx-auto px-4">
        <SearchBar onSearch={handleSearch} />
        <CategoryMenu selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
        
        {isLoading ? (
          <div className="flex justify-center items-center my-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-apple-blue"></div>
          </div>
        ) : error ? (
          <div className="text-center text-apple-red my-10">
            <p>Error loading tools: {error}</p>
          </div>
        ) : filteredTools.length === 0 ? (
          <div className="text-center my-20">
            <p className="text-lg text-apple-gray">No tools found for the selected criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
            {filteredTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
