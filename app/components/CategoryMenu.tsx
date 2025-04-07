import { Category } from '../types';

type CategoryMenuProps = {
  selectedCategory: Category;
  onCategoryChange: (category: Category) => void;
};

export default function CategoryMenu({ selectedCategory, onCategoryChange }: CategoryMenuProps) {
  const categories: Category[] = [
    'All',
    'Multimodal',
    'TextGeneration',
    'ImageGeneration',
    'AudioGeneration',
    'VideoGeneration',
    'Programming',
    'NichePopular'
  ];

  const categoryDisplayNames: Record<Category, string> = {
    'All': 'All Tools',
    'Multimodal': 'Multimodal',
    'TextGeneration': 'Text Generation',
    'ImageGeneration': 'Image Generation',
    'AudioGeneration': 'Audio Generation',
    'VideoGeneration': 'Video Generation',
    'Programming': 'Programming',
    'NichePopular': 'Popular Niche Tools'
  };

  return (
    <div className="max-w-6xl mx-auto px-4 mb-8">
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 shadow-sm hover:translate-y-[-2px] ${
              selectedCategory === category
                ? 'bg-[#007AFF] text-white hover:bg-[#0066CC]'
                : 'bg-white text-gray-900 hover:bg-gray-100'
            }`}
          >
            {categoryDisplayNames[category]}
          </button>
        ))}
      </div>
    </div>
  );
}