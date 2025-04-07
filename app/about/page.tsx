import Header from '../components/Header';
import Footer from '../components/Footer';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-8">
          <h1 className="text-3xl font-bold text-apple-blue mb-6">About AI Tools Treasury</h1>
          
          <p className="mb-4">
            Welcome to AI Tools Treasury, your ultimate guide to the world of artificial intelligence tools. 
            Our mission is to provide a comprehensive, up-to-date directory of the most useful AI tools 
            available today.
          </p>
          
          <p className="mb-4">
            In the rapidly evolving landscape of artificial intelligence, it can be challenging to keep track 
            of all the new tools, services, and platforms being developed. That's where AI Tools Treasury 
            comes in - we curate and categorize the best AI tools so you can easily find exactly what you 
            need for your projects.
          </p>
          
          <h2 className="text-2xl font-semibold text-apple-indigo mt-8 mb-4">What We Offer</h2>
          
          <ul className="list-disc pl-5 mb-6 space-y-2">
            <li>A comprehensive collection of AI tools across multiple categories</li>
            <li>Detailed descriptions and direct links to each tool</li>
            <li>Regular updates as new tools emerge and existing ones evolve</li>
            <li>Intuitive search and filtering to find exactly what you need</li>
            <li>A clean, user-friendly interface for easy navigation</li>
          </ul>
          
          <h2 className="text-2xl font-semibold text-apple-indigo mt-8 mb-4">Our Categories</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="border border-apple-gray5 rounded-lg p-4">
              <h3 className="font-medium text-lg mb-2 text-apple-blue">Multimodal AI</h3>
              <p className="text-sm text-gray-600">Tools that combine multiple types of AI capabilities such as text, image, and voice processing.</p>
            </div>
            
            <div className="border border-apple-gray5 rounded-lg p-4">
              <h3 className="font-medium text-lg mb-2 text-apple-green">Text Generation</h3>
              <p className="text-sm text-gray-600">AI systems that create human-like text, from creative writing to technical documentation.</p>
            </div>
            
            <div className="border border-apple-gray5 rounded-lg p-4">
              <h3 className="font-medium text-lg mb-2 text-apple-pink">Image Generation</h3>
              <p className="text-sm text-gray-600">Tools that create images from text descriptions or manipulate existing images.</p>
            </div>
            
            <div className="border border-apple-gray5 rounded-lg p-4">
              <h3 className="font-medium text-lg mb-2 text-apple-purple">Audio Generation</h3>
              <p className="text-sm text-gray-600">AI systems that create or manipulate audio, including music, voice, and sound effects.</p>
            </div>
            
            <div className="border border-apple-gray5 rounded-lg p-4">
              <h3 className="font-medium text-lg mb-2 text-apple-orange">Video Generation</h3>
              <p className="text-sm text-gray-600">Tools that create or edit video content using AI technology.</p>
            </div>
            
            <div className="border border-apple-gray5 rounded-lg p-4">
              <h3 className="font-medium text-lg mb-2 text-apple-teal">Programming</h3>
              <p className="text-sm text-gray-600">AI assistants that help with coding, debugging, and software development.</p>
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold text-apple-indigo mt-8 mb-4">Contact Us</h2>
          
          <p className="mb-8">
            Have suggestions for AI tools we should add? Questions about our directory? 
            We'd love to hear from you! Please visit our <a href="/contact" className="text-apple-blue hover:underline">Contact page</a> to 
            get in touch with our team.
          </p>
        </div>
      </div>
      
      <Footer />
    </main>
  );
} 