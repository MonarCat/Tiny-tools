
import { useState } from 'react';
import URLInput from './URLInput';
import ShortenedURL from './ShortenedURL';
import { generateShortUrl, createShortUrl } from '@/utils/urlUtils';
import { useToast } from '@/hooks/use-toast';

interface ShortenedLink {
  original: string;
  shortened: string;
  clicks: number;
  createdAt: Date;
}

const URLShortener = () => {
  const [shortenedLinks, setShortenedLinks] = useState<ShortenedLink[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleShortenUrl = async (url: string) => {
    setIsLoading(true);
    
    // Simulate API delay for better UX
    await new Promise(resolve => setTimeout(resolve, 800));
    
    try {
      const shortCode = generateShortUrl();
      const shortenedUrl = createShortUrl(shortCode);
      
      const newLink: ShortenedLink = {
        original: url,
        shortened: shortenedUrl,
        clicks: Math.floor(Math.random() * 50), // Simulate some clicks
        createdAt: new Date()
      };
      
      setShortenedLinks(prev => [newLink, ...prev.slice(0, 4)]); // Keep only 5 most recent
      
      toast({
        title: "URL Shortened!",
        description: "Your link is ready to share.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to shorten URL. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <URLInput onSubmit={handleShortenUrl} isLoading={isLoading} />
      
      {shortenedLinks.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Your Shortened Links
          </h2>
          <div className="space-y-4">
            {shortenedLinks.map((link, index) => (
              <ShortenedURL
                key={index}
                original={link.original}
                shortened={link.shortened}
                clicks={link.clicks}
                createdAt={link.createdAt}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default URLShortener;
