
import * as React from 'react';

interface AppIconProps {
  className?: string;
}

const AppIcon: React.FC<AppIconProps> = (props: AppIconProps) => {
  const { className } = props;
  return (
    <svg 
      className={className} 
      viewBox="0 0 64 64" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Application Icon"
    >
      {/* Base rounded square: Uses primary-dark which is near black */}
      <rect width="64" height="64" rx="12" className="fill-primary-dark"/>
      
      {/* Alien body: Uses accent-light/dark which is Binance Yellow */}
      <rect x="16" y="12" width="32" height="20" rx="4" className="fill-accent-light dark:fill-accent-dark"/>
      
      {/* Eyes: Dark gray/black for contrast on yellow body */}
      <circle cx="26" cy="22" r="4" className="fill-gray-800 dark:fill-black"/>
      <circle cx="38" cy="22" r="4" className="fill-gray-800 dark:fill-black"/>
      
      {/* Neck: Binance Yellow */}
      <rect x="28" y="32" width="8" height="10" className="fill-accent-light dark:fill-accent-dark"/>
      
      {/* Mouth/Chest Plate: Dark gray/black for contrast on yellow body */}
      <path d="M22 36C22 34.8954 22.8954 34 24 34H40C41.1046 34 42 34.8954 42 36V40H22V36Z" className="fill-gray-700 dark:fill-gray-900"/>
      
      {/* Base platform: Blacker than primary-dark */}
      <rect x="12" y="44" width="40" height="8" rx="2" className="fill-black"/>
      
      {/* Platform detail: Binance Yellow */}
      <rect x="18" y="46" width="28" height="4" rx="1" className="fill-accent-light dark:fill-accent-dark"/>
    </svg>
  );
};

export default AppIcon;
