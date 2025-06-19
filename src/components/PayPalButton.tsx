
import { Card } from '@/components/ui/card';
import { Heart, Coffee, Zap } from 'lucide-react';

const PayPalButton = () => {
  return (
    <Card className="mt-16 p-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 shadow-lg">
      <div className="text-center">
        <Heart className="h-12 w-12 text-blue-600 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Support Tiny-Tools</h3>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          Help us keep Tiny-Tools free and fast for everyone. Your support means the world! ❤️
        </p>
        
        <div className="flex justify-center">
          <a 
            href="https://www.paypal.com/donate/?hosted_button_id=SZMD5T2ARX5AJ" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block hover:opacity-80 transition-opacity duration-300"
          >
            <img 
              src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif" 
              alt="Donate with PayPal button" 
              className="border-0"
            />
          </a>
        </div>
        
        <p className="text-xs text-gray-500 mt-4">
          Secure donations powered by PayPal
        </p>
      </div>
    </Card>
  );
};

export default PayPalButton;
