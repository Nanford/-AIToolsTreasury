
// scripts/seed-data.js
import { supabase } from '../app/utils/supabase';

const tools = [
  {
    name: "ChatGPT",
    description: "OpenAI's flagship product, GPT-4o model supports text, image, and voice input/output, leading the AI assistant industry.",
    website_url: "https://chat.openai.com",
    logo_url: null,
    categories: ["Multimodal", "TextGeneration", "ImageGeneration"],
    tags: ["AI Assistant", "Language Model", "Multimodal"],
    clicks: 145
  },
  {
    name: "Claude",
    description: "Anthropic's Claude 3.7 Sonnet features enhanced multimodal capabilities, excelling at documents, charts, and complex visuals, with emphasis on safety and privacy.",
    website_url: "https://claude.ai",
    logo_url: null,
    categories: ["Multimodal", "TextGeneration"],
    tags: ["AI Assistant", "Document Analysis", "Safety"],
    clicks: 120
  },
  {
    name: "Gemini",
    description: "Google's multimodal AI model supports text and image analysis, with Gemini Advanced providing more powerful problem-solving abilities and complex task handling.",
    website_url: "https://gemini.google.com",
    logo_url: null,
    categories: ["Multimodal", "TextGeneration"],
    tags: ["Google", "Problem Solving", "Research"],
    clicks: 110
  },
  {
    name: "Perplexity",
    description: "AI search engine providing real-time web search results and deep research capabilities, handling text and image inputs to assist with research and learning.",
    website_url: "https://www.perplexity.ai",
    logo_url: null,
    categories: ["Multimodal", "Programming"],
    tags: ["Search Engine", "Research", "Information Retrieval"],
    clicks: 95
  },
  {
    name: "Midjourney",
    description: "Top-tier AI image generation tool known for high-quality, artistic visuals, creating beautiful images from text prompts.",
    website_url: "https://www.midjourney.com",
    logo_url: null,
    categories: ["ImageGeneration"],
    tags: ["Art", "Creative", "Design"],
    clicks: 180
  },
  {
    name: "DALL-E",
    description: "OpenAI's image generation model that transforms text descriptions into unique visual content with multiple style options.",
    website_url: "https://openai.com/dall-e-3",
    logo_url: null,
    categories: ["ImageGeneration"],
    tags: ["OpenAI", "Creative Design", "Text-to-Image"],
    clicks: 165
  },
  {
    name: "StyleGAN",
    description: "Generative model architecture designed specifically for image synthesis, capable of producing a range of high-quality, realistic synthetic images.",
    website_url: "https://github.com/NVlabs/stylegan3",
    logo_url: null,
    categories: ["ImageGeneration"],
    tags: ["Style Transfer", "NVIDIA", "Deep Learning"],
    clicks: 75
  },
  {
    name: "ElevenLabs",
    description: "Leading AI voice generator offering highly realistic text-to-speech and voice cloning capabilities, capturing human intonation and emotion.",
    website_url: "https://elevenlabs.io",
    logo_url: null,
    categories: ["AudioGeneration"],
    tags: ["Voice Cloning", "Text-to-Speech", "Audio"],
    clicks: 130
  },
  {
    name: "Udio",
    description: "AI music generation tool allowing users to define specific music genres, moods, and even include custom lyrics through text prompts.",
    website_url: "https://udio.com",
    logo_url: null,
    categories: ["AudioGeneration"],
    tags: ["Music Creation", "AI Composer", "Lyrics"],
    clicks: 85
  },
  {
    name: "Adobe Podcast",
    description: "Audio enhancement tool for podcasters and content creators, automatically removing background noise and boosting low frequencies for professional sound.",
    website_url: "https://podcast.adobe.com",
    logo_url: null,
    categories: ["AudioGeneration"],
    tags: ["Audio Enhancement", "Podcast", "Noise Removal"],
    clicks: 70
  },
  {
    name: "Runway Gen-2",
    description: "Multimodal model specializing in video generation, allowing users to create video content through text prompts, images, or video references.",
    website_url: "https://runwayml.com",
    logo_url: null,
    categories: ["VideoGeneration"],
    tags: ["Creative Tool", "Animation", "Film"],
    clicks: 115
  },
  {
    name: "Sora",
    description: "OpenAI's video generation model capable of creating high-quality, realistic video scenes from text descriptions.",
    website_url: "https://openai.com/sora",
    logo_url: null,
    categories: ["VideoGeneration"],
    tags: ["Text-to-Video", "OpenAI", "Cinematic"],
    clicks: 150
  },
  {
    name: "Descript",
    description: "Combines AI-driven video and audio editing with a text-based editing interface, perfect for podcasters, YouTubers, and social media creators.",
    website_url: "https://www.descript.com",
    logo_url: null,
    categories: ["VideoGeneration"],
    tags: ["Video Editing", "Audio Editing", "Content Creation"],
    clicks: 95
  },
  {
    name: "GitHub Copilot",
    description: "AI assistant for developers, providing real-time code completion suggestions and converting natural language prompts into code.",
    website_url: "https://github.com/features/copilot",
    logo_url: null,
    categories: ["Programming"],
    tags: ["Code Generation", "Developer Tool", "GitHub"],
    clicks: 175
  },
  {
    name: "Codeium",
    description: "Lightweight IDE extension offering code autocomplete, AI chat, and code search in VS Code, JetBrains, and 40+ other IDEs.",
    website_url: "https://codeium.com",
    logo_url: null,
    categories: ["Programming"],
    tags: ["Code Assistance", "IDE Extension", "Autocomplete"],
    clicks: 90
  },
  {
    name: "Cursor",
    description: "AI-centered code editor that deeply integrates AI functionality into the development environment rather than as an add-on.",
    website_url: "https://cursor.sh",
    logo_url: null,
    categories: ["Programming"],
    tags: ["Code Editing", "Developer Tool", "IDE"],
    clicks: 105
  },
  {
    name: "Grok",
    description: "xAI's AI chatbot with no usage limits, integrated with X platform, great for raw, direct conversations.",
    website_url: "https://grok.x.ai",
    logo_url: null,
    categories: ["NichePopular", "Multimodal"],
    tags: ["Social Media", "X Platform", "Elon Musk"],
    clicks: 140
  },
  {
    name: "v0",
    description: "AI-powered prototyping tool that generates interactive mockups, ideal for rapid transition from design idea to working prototype.",
    website_url: "https://v0.dev",
    logo_url: null,
    categories: ["NichePopular", "ImageGeneration"],
    tags: ["UI Design", "Prototyping", "Design Tool"],
    clicks: 80
  },
  {
    name: "Genie",
    description: "Google DeepMind's generative model capable of turning still images into 2D platform games or entire virtual worlds.",
    website_url: "https://genie.deepmind.com",
    logo_url: null,
    categories: ["NichePopular", "ImageGeneration"],
    tags: ["Game Generation", "Virtual Worlds", "Google DeepMind"],
    clicks: 65
  },
  {
    name: "Sesame",
    description: "Emerging open-source voice model showing promise for surpassing ElevenLabs with fine-tuning, demonstrating potential in the voice generation space.",
    website_url: "https://github.com/sesame-ai",
    logo_url: null,
    categories: ["NichePopular", "AudioGeneration"],
    tags: ["Voice Generation", "Open Source", "Voice Model"],
    clicks: 55
  },
  {
    name: "DeepSeek",
    description: "V3 and new R1 models available for free use on their site with engaging search experience and low-cost API access.",
    website_url: "https://deepseek.com",
    logo_url: null,
    categories: ["NichePopular", "Programming"],
    tags: ["Multimodal", "API", "Search"],
    clicks: 75
  },
  {
    name: "NotebookLM",
    description: "Best for turning text into podcasts, generating fun 10-minute podcast episodes, though primarily used for entertainment purposes.",
    website_url: "https://notebooklm.google.com",
    logo_url: null,
    categories: ["NichePopular", "Programming"],
    tags: ["Text Processing", "Podcast Generation", "Entertainment"],
    clicks: 60
  }
];

async function seedDatabase() {
  console.log('Starting data import...');
  
  for (const tool of tools) {
    const { error } = await supabase
      .from('tools')
      .insert(tool);
    
    if (error) {
      console.error(`Error adding ${tool.name}:`, error);
    } else {
      console.log(`Added: ${tool.name}`);
    }
  }
  
  console.log('Data import complete!');
}

// Uncomment the line below to run the seed function
// seedDatabase();

export { tools, seedDatabase };