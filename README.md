# AI Tools Treasury 🚀

AI Tools Treasury is a comprehensive directory of AI tools, showcasing the latest and most innovative artificial intelligence solutions across various categories.

## Features ✨

- 🔍 **Smart Search**: Search AI tools by name, category, or keywords
- 📱 **Responsive Design**: Optimized for all devices with Apple's classic color scheme
- 🏷️ **Category Filtering**: Easy filtering by tool categories:
  - Multimodal
  - Text Generation
  - Image Generation
  - Audio Generation
  - Video Generation
  - Programming
  - Popular Niche Tools
- 📊 **Popularity Tracking**: Tools ranked by click-through rates
- 🔐 **Admin Panel**: Secure admin interface for content management

## Tech Stack 💻

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL)
- **Deployment**: Vercel
- **Authentication**: Supabase Auth
- **Styling**: Custom Tailwind configuration with Apple's classic color scheme

## Getting Started 🌟

### Prerequisites

- Node.js 18.0 or later
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/aitoolstreasury.git
cd aitoolstreasury
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Setup 📦

1. Create a new Supabase project
2. Set up the following tables:
   - tools (for AI tool entries)
   - categories (for tool categories)
   - clicks (for tracking tool popularity)

## Admin Access 👑

Admin functionality is available at `/admin/login` for authorized users (support@hootoolai.com).

## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request.

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact 📧

For any queries, please reach out to support@hootoolai.com

---

Made with ❤️ for the AI community
