export type Category = 
  | 'All'
  | 'Multimodal'
  | 'TextGeneration'
  | 'ImageGeneration'
  | 'AudioGeneration'
  | 'VideoGeneration'
  | 'Programming'
  | 'NichePopular';

export type AITool = {
  id: string;
  name: string;
  description: string;
  website_url: string;
  logo_url: string | null;
  categories: Category[];
  tags: string[];
  clicks: number;
}; 

export type User = {
  id: string;
  email: string;
  role: 'admin';
}; 