
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Link, Loader2 } from 'lucide-react';
import { isValidUrl } from '@/utils/urlUtils';

interface URLInputProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
}

const URLInput = ({ onSubmit, isLoading }: URLInputProps) => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      setError('Please enter a URL');
      return;
    }
    
    if (!isValidUrl(url)) {
      setError('Please enter a valid URL (must start with http:// or https://)');
      return;
    }
    
    setError('');
    onSubmit(url);
    setUrl('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
    if (error) setError('');
  };

  return (
    <Card className="p-8 bg-white/70 backdrop-blur-sm border-0 shadow-xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="url"
              placeholder="https://example.com/your-very-long-url-here"
              value={url}
              onChange={handleInputChange}
              className="pl-10 h-14 text-lg border-2 border-gray-200 focus:border-blue-500 transition-colors"
              disabled={isLoading}
            />
          </div>
          <Button
            type="submit"
            size="lg"
            disabled={isLoading || !url.trim()}
            className="h-14 px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold transition-all duration-200 transform hover:scale-105"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Shortening...
              </>
            ) : (
              'Shorten URL'
            )}
          </Button>
        </div>
        
        {error && (
          <p className="text-red-500 text-sm mt-2 animate-in fade-in-50">{error}</p>
        )}
      </form>
      
      <div className="mt-6 text-center text-gray-500 text-sm">
        Enter any long URL to create a short, shareable link instantly
      </div>
    </Card>
  );
};

export default URLInput;
