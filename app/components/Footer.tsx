import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-16 py-8 text-center text-apple-gray border-t border-apple-gray5">
      <div className="container mx-auto px-4">
        <p className="text-sm mb-2">
          © {new Date().getFullYear()} AI Tools Treasury - The Ultimate AI Tools Directory
        </p>
        <div className="flex justify-center space-x-4 mt-2">
          <Link href="/" className="text-apple-blue hover:text-apple-purple transition-colors text-sm">
            Home
          </Link>
          <Link href="/about" className="text-apple-blue hover:text-apple-purple transition-colors text-sm">
            About
          </Link>
          <Link href="/contact" className="text-apple-blue hover:text-apple-purple transition-colors text-sm">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
