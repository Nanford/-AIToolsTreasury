import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-apple-blue to-apple-purple text-white py-8 mb-8 rounded-b-2xl">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              <Link href="/">AI Tools Treasury</Link>
            </h1>
            <p className="text-sm md:text-base opacity-90 max-w-2xl">
              Explore the ultimate collection of AI tools for creative, productivity and professional use
            </p>
          </div>
          <div className="mt-4 md:mt-0 space-x-4">
            <Link 
              href="/admin/login" 
              className="bg-white text-apple-blue px-4 py-2 rounded-full hover:bg-gray-100 transition duration-200"
            >
              Admin Login
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
} 