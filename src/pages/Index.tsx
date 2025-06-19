
import URLShortener from '@/components/URLShortener';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-4">
            Tiniest
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            The tiniest URL shortener. Fast, reliable, and completely free. Now with API support for developers.
          </p>
        </div>
        <URLShortener />
      </div>
    </div>
  );
};

export default Index;
