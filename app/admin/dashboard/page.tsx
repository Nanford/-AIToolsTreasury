'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AITool, User } from '../../types';
import { supabase } from '../../utils/supabase';

export default function AdminDashboard() {
  const [tools, setTools] = useState<AITool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  // 检查用户是否已登录
  useEffect(() => {
    async function checkAuth() {
      const { data, error } = await supabase.auth.getSession();
      
      if (error || !data.session) {
        router.push('/admin/login');
        return;
      }

      const userData = {
        id: data.session.user.id,
        email: data.session.user.email || '',
        role: 'admin' as const
      };
      
      setUser(userData);
      fetchTools();
    }

    checkAuth();
  }, [router]);

  // 获取所有工具
  const fetchTools = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('tools')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setTools(data as AITool[]);
    } catch (error: any) {
      console.error('Error fetching tools:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // 删除工具
  const handleDeleteTool = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this tool?')) {
      try {
        const { error } = await supabase
          .from('tools')
          .delete()
          .eq('id', id);

        if (error) {
          throw error;
        }

        // 更新状态，移除被删除的工具
        setTools(tools.filter(tool => tool.id !== id));
      } catch (error: any) {
        console.error('Error deleting tool:', error);
        alert(`Failed to delete: ${error.message}`);
      }
    }
  };

  // 登出
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-apple-blue"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            {user && (
              <span className="text-sm text-gray-500">
                Logged in as: {user.email}
              </span>
            )}
            <button
              onClick={handleLogout}
              className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-apple-red hover:bg-apple-red/90"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">AI Tools</h2>
            <Link
              href="/admin/tools/new"
              className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-apple-blue hover:bg-apple-blue/90"
            >
              Add New Tool
            </Link>
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            {tools.length === 0 ? (
              <div className="px-4 py-5 sm:p-6 text-center text-gray-500">
                No tools found. Start by adding a new tool.
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {tools.map((tool) => (
                  <li key={tool.id}>
                    <div className="px-4 py-5 sm:px-6 flex items-center justify-between">
                      <div className="flex flex-col">
                        <h3 className="text-lg font-medium text-gray-900">{tool.name}</h3>
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{tool.description}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {tool.categories.map((category, index) => (
                            <span 
                              key={index} 
                              className="text-xs bg-apple-gray6 text-apple-blue px-2 py-0.5 rounded-full"
                            >
                              {category}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Link
                          href={`/admin/tools/edit/${tool.id}`}
                          className="text-apple-blue hover:text-apple-blue/80 text-sm font-medium"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDeleteTool(tool.id)}
                          className="text-apple-red hover:text-apple-red/80 text-sm font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}