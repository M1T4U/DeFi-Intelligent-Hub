
import { useState, useEffect } from 'react';
import { useDarkMode } from './hooks/useDarkMode';
import { useWallet } from './hooks/useWallet';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import AnalysisPage from './components/AnalysisPage'; // New Page
import SettingsPage from './components/SettingsPage'; // New Page
import { APP_NAME } from './constants';

export type Page = 'dashboard' | 'analysis' | 'settings';

const App: React.FC = () => {
  const [isDarkMode, toggleDarkMode] = useDarkMode();
  const [wallet, connectWallet, disconnectWallet, setChain] = useWallet();
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');

  useEffect(() => {
    // Set CSS variables for Recharts tooltip and legend theming
    const rootStyle = document.documentElement.style;
    if (isDarkMode) {
      // Binance Dark Theme
      rootStyle.setProperty('--tooltip-bg', '#1E1E1E'); // secondary-dark (Very Dark Gray)
      rootStyle.setProperty('--tooltip-border', '#F0B90B'); // accent-dark (Binance Yellow)
      rootStyle.setProperty('--tooltip-text', '#EAEAEA'); // text-dark (Light Gray)
      rootStyle.setProperty('--legend-text-color', '#EAEAEA'); // text-dark
    } else {
      // Binance Light Theme
      rootStyle.setProperty('--tooltip-bg', '#FFFFFF'); // secondary-light (White)
      rootStyle.setProperty('--tooltip-border', '#BDBDBD'); // A medium gray for border in light mode
      rootStyle.setProperty('--tooltip-text', '#1E1E1E'); // text-light (Dark Gray)
      rootStyle.setProperty('--legend-text-color', '#1E1E1E'); // text-light
    }
  }, [isDarkMode]);

  useEffect(() => {
    // Apply/remove body background class based on wallet connection
    // to allow WelcomeScreen to have a plain black background.
    if (wallet.isConnected) {
      document.body.classList.add(isDarkMode ? 'bg-digital-artifacts-dark' : 'bg-digital-artifacts-light', 'animate-digital-drift');
      document.body.classList.remove('bg-black'); // Ensure black bg from welcome screen is removed
    } else {
      document.body.classList.remove('bg-digital-artifacts-dark', 'bg-digital-artifacts-light', 'animate-digital-drift');
      document.body.classList.add('bg-black'); // For welcome screen
    }
    // Also set the primary-dark/light class based on theme for consistent body color
    document.body.classList.toggle('dark:bg-primary-dark', isDarkMode && !wallet.isConnected);
    document.body.classList.toggle('bg-primary-light', !isDarkMode && !wallet.isConnected);


  }, [wallet.isConnected, isDarkMode]);


  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard wallet={wallet} connectWallet={connectWallet} />;
      case 'analysis':
        return <AnalysisPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <Dashboard wallet={wallet} connectWallet={connectWallet} />;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans ${isDarkMode ? 'dark' : ''}`}>
      <Header 
        isDarkMode={isDarkMode} 
        toggleDarkMode={toggleDarkMode}
        wallet={wallet}
        connectWallet={connectWallet}
        disconnectWallet={disconnectWallet}
        setChain={setChain}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      {/* 
        The main content area's background is mostly transparent when wallet is connected, 
        relying on the body's digital-artifacts. For WelcomeScreen, body is black.
      */}
      <main className={`flex-grow container mx-auto px-2 sm:px-4 md:my-4 
                      ${wallet.isConnected ? 'bg-primary-light/90 dark:bg-primary-dark/90 backdrop-blur-md rounded-lg shadow-xl py-4 sm:py-6' : 'py-0'}`}>
        {renderPage()}
      </main>
      { wallet.isConnected && (
        <footer className="bg-secondary-light/90 dark:bg-secondary-dark/90 backdrop-blur-md text-center p-4 text-sm text-text-muted-light dark:text-text-muted-dark shadow-t-sm">
          &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved. (Mock Data Version)
        </footer>
      )}
    </div>
  );
};

export default App;