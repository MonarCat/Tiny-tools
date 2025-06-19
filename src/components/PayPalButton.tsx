
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
          <form action="https://www.paypal.com/donate" method="post" target="_top">
            <input type="hidden" name="hosted_button_id" value="SZMD5T2ARX5AJ" />
            <input 
              type="image" 
              src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif" 
              name="submit" 
              title="PayPal - The safer, easier way to pay online!" 
              alt="Donate with PayPal button" 
              className="hover:opacity-80 transition-opacity duration-300 border-0"
            />
            <img 
              alt="" 
              src="https://www.paypal.com/en_US/i/scr/pixel.gif" 
              width={1} 
              height={1} 
              className="border-0"
            />
          </form>
        </div>
        
        <p className="text-xs text-gray-500 mt-4">
          Secure donations powered by PayPal
        </p>
      </div>
    </Card>
  );
};

export default PayPalButton;
