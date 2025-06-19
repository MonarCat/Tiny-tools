
import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Heart, Home } from 'lucide-react';

const DonationSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    // In a real app, you might want to verify the payment with Stripe
    // For now, we'll just show success if we have a session ID
    if (sessionId) {
      setIsVerified(true);
    }
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8 text-center">
        <div className="mb-6">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Thank You! 🎉
          </h1>
          <p className="text-gray-600">
            Your donation has been processed successfully. You're amazing for supporting Tiniest!
          </p>
        </div>
        
        <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg p-4 mb-6">
          <Heart className="h-8 w-8 text-pink-600 mx-auto mb-2" />
          <p className="text-sm text-gray-700">
            Your support helps us keep Tiniest free, fast, and reliable for everyone.
          </p>
        </div>
        
        <div className="space-y-3">
          <Button asChild className="w-full">
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Return to Tiniest
            </Link>
          </Button>
          
          <p className="text-xs text-gray-500">
            You should receive a confirmation email from Stripe shortly.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default DonationSuccess;
