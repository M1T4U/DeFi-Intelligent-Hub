
import * as React from 'react';
import { APP_NAME } from '../constants';
import { WalletState, Chain } from '../types';
import { Page } from '../App'; // Import Page type
import ChainSelector from './ChainSelector';
import AppIcon from './common/AppIcon'; // Import new AppIcon

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  wallet: WalletState;
  connectWallet: (chain?: Chain) => void;
  disconnectWallet: () => void;
  setChain: (chain: Chain) => void;
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

// SVG Icons
const SunIcon: React.FC<{className?: string}> = (props: {className?: string}) => {
  const { className } = props;
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );
};

const MoonIcon: React.FC<{className?: string}> = ({className}) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
);

const WalletIcon: React.FC<{className?: string}> = ({className}) => (
 <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
  </svg>
);

const NavLink: React.FC<{
  page: Page;
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  children: React.ReactNode;
}> = ({ page, currentPage, setCurrentPage, children }: { page: Page; currentPage: Page; setCurrentPage: (page: Page) => void; children: React.ReactNode }) => {
  const isActive = page === currentPage;
  return (
    <button
      onClick={() => setCurrentPage(page)}
      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors
        ${isActive 
          ? 'bg-accent-light dark:bg-accent-dark text-white dark:text-primary-dark' // Ensure contrast for text on yellow
          : 'text-text-muted-light dark:text-text-muted-dark hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-text-light dark:hover:text-text-dark'
        }`}
      aria-current={isActive ? 'page' : undefined}
    >
      {children}
    </button>
  );
};


const Header: React.FC<HeaderProps> = ({
    isDarkMode,
    toggleDarkMode,
    wallet,
    connectWallet,
    disconnectWallet,
    setChain,
    currentPage,
    setCurrentPage,
}: HeaderProps) => {
  const availableChains = Object.values(Chain);

  const handleConnect = () => {
    if (!wallet.isConnected) {
      connectWallet(wallet.chain);
    } else {
      disconnectWallet();
    }
  };
  
  return (
    <header className="bg-secondary-light/90 dark:bg-secondary-dark/90 backdrop-blur-md shadow-lg p-3 sm:p-4 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <AppIcon className="h-8 w-8 sm:h-10 sm:w-10" />
          <h1 
            className={`font-digital text-xl sm:text-3xl font-bold 
            ${isDarkMode ? 'text-accent-dark text-shadow-digital-glow-dark' : 'text-accent-light text-shadow-digital-glow-light'}`}
          >
            {APP_NAME}
          </h1>
        </div>

        <nav className="hidden md:flex items-center space-x-1 sm:space-x-2">
          <NavLink page="dashboard" currentPage={currentPage} setCurrentPage={setCurrentPage}>Dashboard</NavLink>
          <NavLink page="analysis" currentPage={currentPage} setCurrentPage={setCurrentPage}>Analysis</NavLink>
          <NavLink page="settings" currentPage={currentPage} setCurrentPage={setCurrentPage}>Settings</NavLink>
        </nav>

        <div className="flex items-center space-x-1 sm:space-x-3">
          <ChainSelector 
            selectedChain={wallet.chain} 
            onChainChange={setChain}
            availableChains={availableChains}
          />
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <SunIcon className="w-5 h-5 text-yellow-400" /> : <MoonIcon className="w-5 h-5 text-gray-600" />}
          </button>
          <button
            onClick={handleConnect}
            className="flex items-center bg-accent-light hover:bg-yellow-500 dark:bg-accent-dark dark:hover:bg-yellow-600 text-primary-dark font-semibold py-2 px-3 sm:px-4 rounded-lg text-sm transition-colors shadow hover:shadow-md"
          >
            <WalletIcon className="w-4 h-4 mr-1 sm:mr-2"/>
            {wallet.isConnected ? `Disconnect` : 'Connect'}
          </button>
        </div>
      </div>
      {/* Mobile Navigation */}
      <nav className="md:hidden flex items-center justify-around mt-3 pt-2 border-t border-gray-300 dark:border-gray-600">
          <NavLink page="dashboard" currentPage={currentPage} setCurrentPage={setCurrentPage}>Dashboard</NavLink>
          <NavLink page="analysis" currentPage={currentPage} setCurrentPage={setCurrentPage}>Analysis</NavLink>
          <NavLink page="settings" currentPage={currentPage} setCurrentPage={setCurrentPage}>Settings</NavLink>
      </nav>
       {wallet.isConnected && wallet.address && (
          <div className="container mx-auto mt-2 text-right">
            <p className="text-xs text-text-muted-light dark:text-text-muted-dark">
              Connected: {`${wallet.address.substring(0,6)}...${wallet.address.substring(wallet.address.length - 4)}`} ({wallet.chain})
            </p>
          </div>
        )}
    </header>
  );
};

export default Header;
 