
import { Zap } from 'lucide-react';

interface TinyToolsLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const TinyToolsLogo = ({ size = 'md', className = '' }: TinyToolsLogoProps) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16'
  };

  return (
    <div className={`relative ${className}`}>
      {/* Outer glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-teal-400 rounded-xl blur-xl opacity-30 animate-pulse"></div>
      
      {/* Main logo container */}
      <div className="relative bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 text-white rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
        <div className="p-3 flex items-center justify-center">
          <div className="relative">
            {/* Lightning bolt icon */}
            <Zap className={`${sizeClasses[size]} drop-shadow-lg`} />
            
            {/* Small accent dots */}
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-300 rounded-full animate-ping"></div>
            <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-white rounded-full opacity-80"></div>
          </div>
        </div>
        
        {/* Inner gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/20 rounded-xl"></div>
      </div>
    </div>
  );
};

export default TinyToolsLogo;
