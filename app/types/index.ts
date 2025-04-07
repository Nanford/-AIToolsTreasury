export type AITool = {
  id: string;
  name: string;
  description: string;
  website_url: string;
  logo_url?: string;
  categories: string[];
  tags: string[];
  clicks: number;
  created_at: string;
};

export type Category = 
  | 'All'
  | 'Multimodal'
  | 'TextGeneration'
  | 'ImageGeneration'
  | 'AudioGeneration'
  | 'VideoGeneration'
  | 'Programming'
  | 'NichePopular';

export type User = {
  id: string;
  email: string;
  role: 'admin' | 'user';
};