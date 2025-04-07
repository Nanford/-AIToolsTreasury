'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { supabase } from '@/app/utils/supabase';
import { AITool, Category } from '@/app/types';

// In both files:
const schema = yup.object().shape({
    name: yup.string().required('Tool name is required'),
    description: yup.string().required('Description is required'),
    website_url: yup.string().url('Please enter a valid URL').required('Website URL is required'),
    logo_url: yup.string().url('Please enter a valid URL').nullable().optional(),
    categories: yup.array().of(yup.string()).min(1, 'Please select at least one category'),
    tags: yup.array().of(yup.string()),
  });

type FormData = {
  name: string;
  description: string;
  website_url: string;
  logo_url?: string;
  categories: string[];
  tags: string[];
};

export default function NewTool() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  
  const availableCategories: Category[] = [
    'Multimodal',
    'TextGeneration',
    'ImageGeneration',
    'AudioGeneration',
    'VideoGeneration',
    'Programming',
    'NichePopular'
  ];

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<FormData>({
    resolver: yupResolver(schema) as any,
    defaultValues: {
      categories: [],
      tags: []
    }
  });

  // 监视categories字段的变化
  const selectedCategories = watch('categories');

  // 创建新工具
  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    setError(null);

    try {
      data.tags = tags;

      const { error } = await supabase
        .from('tools')
        .insert({
          name: data.name,
          description: data.description,
          website_url: data.website_url,
          logo_url: data.logo_url || null,
          categories: data.categories,
          tags: data.tags,
          clicks: 0,
        });

      if (error) {
        throw error;
      }

      router.push('/admin/dashboard');
    } catch (error: any) {
      console.error('Error creating tool:', error);
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  // 添加标签
  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      const newTags = [...tags, tagInput.trim()];
      setTags(newTags);
      setValue('tags', newTags);
      setTagInput('');
    }
  };

  // 删除标签
  const handleRemoveTag = (tagToRemove: string) => {
    const newTags = tags.filter(tag => tag !== tagToRemove);
    setTags(newTags);
    setValue('tags', newTags);
  };

  // 检查分类是否被选中
  const isCategorySelected = (category: Category) => {
    return selectedCategories?.includes(category);
  };

  // 切换分类选择
  const toggleCategory = (category: Category) => {
    const current = [...(selectedCategories || [])];
    const index = current.indexOf(category);
    
    if (index === -1) {
      current.push(category);
    } else {
      current.splice(index, 1);
    }
    
    setValue('categories', current);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Add New AI Tool</h1>
            <Link 
              href="/admin/dashboard" 
              className="text-apple-blue hover:text-apple-blue/80 text-sm font-medium"
            >
              Back to Dashboard
            </Link>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit as any)} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Tool Name
              </label>
              <input
                type="text"
                id="name"
                {...register('name')}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-apple-blue focus:border-apple-blue sm:text-sm"
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                rows={3}
                {...register('description')}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-apple-blue focus:border-apple-blue sm:text-sm"
              />
              {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
            </div>

            <div>
              <label htmlFor="website_url" className="block text-sm font-medium text-gray-700">
                Website URL
              </label>
              <input
                type="url"
                id="website_url"
                {...register('website_url')}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-apple-blue focus:border-apple-blue sm:text-sm"
              />
              {errors.website_url && <p className="mt-1 text-sm text-red-600">{errors.website_url.message}</p>}
            </div>

            <div>
              <label htmlFor="logo_url" className="block text-sm font-medium text-gray-700">
                Logo URL (optional)
              </label>
              <input
                type="url"
                id="logo_url"
                {...register('logo_url')}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-apple-blue focus:border-apple-blue sm:text-sm"
              />
              {errors.logo_url && <p className="mt-1 text-sm text-red-600">{errors.logo_url.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categories
              </label>
              <div className="flex flex-wrap gap-2">
                {availableCategories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => toggleCategory(category)}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      isCategorySelected(category)
                        ? 'bg-apple-blue text-white'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              {errors.categories && <p className="mt-1 text-sm text-red-600">{errors.categories.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <div className="flex items-center">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-apple-blue focus:border-apple-blue sm:text-sm"
                  placeholder="Add a tag and press Enter"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="ml-2 px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-apple-blue hover:bg-apple-blue/90"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag, index) => (
                  <div key={index} className="bg-gray-100 rounded-full px-3 py-1 text-sm flex items-center">
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 text-gray-500 hover:text-gray-700"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <Link
                href="/admin/dashboard"
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 mr-3"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={submitting}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-apple-blue hover:bg-apple-blue/90"
              >
                {submitting ? 'Creating...' : 'Create Tool'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}