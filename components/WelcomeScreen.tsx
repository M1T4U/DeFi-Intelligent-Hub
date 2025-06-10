
import * as React from 'react';
import AppIcon from './common/AppIcon'; // Re-use existing AppIcon
import { Chain } from '../types';

interface WelcomeScreenProps {
  connectWallet: (chain?: Chain) => void;
}

// New Binance Logo Icon
const BinanceLogoIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 96 96" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M68.2086 31.8554L48.0001 11.6469L27.7916 31.8554L37.8959 41.9597L48.0001 31.8554L58.1043 41.9597L68.2086 31.8554Z" />
    <path d="M84.3531 48L74.2488 37.8957L64.1446 48L74.2488 58.1042L84.3531 48Z" />
    <path d="M68.2086 64.1445L48.0001 84.353L27.7916 64.1445L37.8959 54.0402L48.0001 64.1445L58.1043 54.0402L68.2086 64.1445Z" />
    <path d="M48.0001 44.1176L35.7319 31.8554L11.647 48L35.7319 64.1445L48.0001 51.8823L60.2682 64.1445L84.3531 48L60.2682 31.8554L48.0001 44.1176ZM48.0001 48L41.9601 54.04L48.0001 60.08L54.0401 54.04L48.0001 48Z" />
  </svg>
);


const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ connectWallet }) => {
  const isDark = document.documentElement.classList.contains('dark');
  const accentColorClass = isDark ? 'text-accent-dark' : 'text-accent-light'; // This will be yellow

  const dancingElements = [
    { Icon: BinanceLogoIcon, size: 'w-20 h-20 md:w-28 md:h-28', animation: 'animate-float-orbit-1', delay: 'animation-delay-0s', opacity: 'opacity-60' },
    { Icon: BinanceLogoIcon, size: 'w-12 h-12 md:w-16 md:h-16', animation: 'animate-float-orbit-2', delay: 'animation-delay-1s', opacity: 'opacity-50' },
    { Icon: AppIcon, size: 'w-16 h-16 md:w-20 md:h-20', animation: 'animate-float-orbit-3', delay: 'animation-delay-0.5s', opacity: 'opacity-70' },
    { Icon: BinanceLogoIcon, size: 'w-12 h-12 md:w-16 md:h-16', animation: 'animate-pulse-glow', delay: 'animation-delay-1.5s', opacity: 'opacity-40' },
    { Icon: BinanceLogoIcon, size: 'w-10 h-10 md:w-12 md:h-12', animation: 'animate-subtle-rotate', delay: 'animation-delay-2s', opacity: 'opacity-60' },
    { Icon: BinanceLogoIcon, size: 'w-10 h-10 md:w-14 md:h-14', animation: 'animate-float-orbit-2', delay: 'animation-delay-2.5s', opacity: 'opacity-30' },
    { Icon: BinanceLogoIcon, size: 'w-12 h-12 md:w-16 md:h-16', animation: 'animate-pulse-glow', delay: 'animation-delay-0.2s', opacity: 'opacity-50' },
    { Icon: AppIcon, size: 'w-14 h-14 md:w-18 md:h-18', animation: 'animate-float-orbit-1', delay: 'animation-delay-3s', opacity: 'opacity-40' },
    { Icon: BinanceLogoIcon, size: 'w-8 h-8 md:w-10 md:h-10', animation: 'animate-subtle-rotate', delay: 'animation-delay-0.8s', opacity: 'opacity-35' },
  ];

  // Function to generate unique positions for each element
  const getPosition = (index: number) => {
    const positions = [
      'top-1/4 left-1/4', 'top-1/3 right-1/4', 'bottom-1/4 left-1/3', 
      'top-1/2 right-1/3', 'bottom-1/3 left-1/4', 'top-1/4 right-1/3',
      'bottom-1/2 left-1/2 transform -translate-x-1/2', 'top-1/5 right-1/5', 'bottom-1/5 left-1/6'
    ];
    return positions[index % positions.length];
  };


  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen w-full bg-black text-white overflow-hidden">
      {/* Dancing Elements Container */}
      <div className="absolute inset-0 z-0">
        {dancingElements.map(({ Icon, size, animation, delay, opacity }, index) => (
          <div
            key={index}
            className={`absolute ${getPosition(index)} ${size} ${accentColorClass} ${animation} ${delay} ${opacity} transition-opacity duration-500`}
            style={{ animationDuration: `${15 + index * 2}s` }} // Vary animation durations
          >
            <Icon className="w-full h-full" />
          </div>
        ))}
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center p-4">
        <div className="mb-8">
          <AppIcon className={`w-24 h-24 sm:w-32 sm:w-32 ${accentColorClass}`} />
        </div>
        <h1 
          className="font-digital text-4xl sm:text-6xl font-bold mb-4 tracking-wide"
        >
          <span className={`${accentColorClass} text-shadow-digital-glow-yellow-intense`}>DeFi</span>
          <span className="text-digital-blue-green text-shadow-digital-glow-blue-green-intense"> Intelligence Hub</span>
        </h1>
        {/* Subtitle with light blue color */}
        <p className="text-lg sm:text-xl text-sky-400 mb-8 max-w-xl font-semibold">
          Unlock the full potential of your DeFi portfolio with AI-powered analytics and insights.
        </p>
        <button
          onClick={() => connectWallet()}
          className={`bg-accent-light hover:bg-yellow-500 dark:bg-accent-dark dark:hover:bg-yellow-600 text-primary-dark 
                      font-bold py-3 px-8 rounded-lg text-lg transition-all duration-300 
                      transform hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 
                      ${isDark ? 'focus:ring-yellow-300' : 'focus:ring-yellow-400'}`}
        >
          Connect Your Wallet
        </button>
        <p className="mt-12 text-xs text-gray-500">
          Securely connect to view your dashboard and start optimizing.
        </p>
      </div>
    </div>
  );
};

export default WelcomeScreen;
