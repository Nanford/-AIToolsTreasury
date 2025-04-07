'use client';

import { useState, useEffect } from 'react';
import { toolsData } from '../../../scripts/seed-data';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

export default function SeedPage() {
  const [logs, setLogs] = useState<string[]>([]);
  const [isSeeding, setIsSeeding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || user.email !== 'support@hootoolai.com') {
        router.push('/admin/login');
        return;
      }
      setIsLoading(false);
    } catch (error) {
      router.push('/admin/login');
    }
  };

  const handleSeed = async () => {
    setIsSeeding(true);
    setLogs(['开始导入数据...']);

    try {
      for (const tool of toolsData) {
        const { error } = await supabase
          .from('tools')
          .insert([tool]);

        if (error) {
          setLogs(prev => [...prev, `错误: ${tool.name} - ${error.message}`]);
        } else {
          setLogs(prev => [...prev, `成功: ${tool.name} 已导入`]);
        }
      }
      setLogs(prev => [...prev, '数据导入完成！']);
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : '未知错误';
      setLogs(prev => [...prev, `错误: ${errorMessage}`]);
    }

    setIsSeeding(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">加载中...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">数据导入工具</h1>
        <button
          onClick={() => supabase.auth.signOut().then(() => router.push('/admin/login'))}
          className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
        >
          退出登录
        </button>
      </div>
      
      <button
        onClick={handleSeed}
        disabled={isSeeding}
        className={`px-6 py-3 rounded-lg text-white font-medium transition-all ${
          isSeeding 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-[#007AFF] hover:bg-[#0066CC]'
        }`}
      >
        {isSeeding ? '导入中...' : '开始导入数据'}
      </button>

      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">导入日志:</h2>
        <div className="space-y-2">
          {logs.map((log, index) => (
            <p key={index} className={`${
              log.startsWith('错误') ? 'text-red-600' : 
              log.startsWith('成功') ? 'text-green-600' : 
              'text-gray-700'
            }`}>
              {log}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}