
import { useState, useEffect } from 'react';
import { PortfolioData, WalletState, Chain } from '../types';
import { fetchPortfolioData } from '../services/portfolioService';
import PortfolioOverview from './PortfolioOverview';
import AssetAllocationChart from './AssetAllocationChart';
import AssetList from './AssetList';
import AIInsightsPanel from './AIInsightsPanel';
import Spinner from './common/Spinner';
import WelcomeScreen from './WelcomeScreen'; // Import WelcomeScreen

interface DashboardProps {
  wallet: WalletState;
  connectWallet: (chain?: Chain) => void; // Add connectWallet prop
}

const Dashboard: React.FC<DashboardProps> = (props: DashboardProps) => {
  const { wallet, connectWallet } = props;
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (wallet.isConnected && wallet.chain) {
      setIsLoading(true);
      setError(null);
      fetchPortfolioData(wallet.chain)
        .then(data => {
          setPortfolioData(data);
        })
        .catch(err => {
          console.error("Dashboard fetch error:", err);
          setError('Failed to load portfolio data.');
          setPortfolioData(null);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setPortfolioData(null); // Clear data if wallet disconnects
    }
  }, [wallet.isConnected, wallet.chain]);

  if (!wallet.isConnected) {
    // Render WelcomeScreen instead of the simple text message
    return <WelcomeScreen connectWallet={() => connectWallet(wallet.chain)} />;
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-loss py-10">{error}</p>;
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-0 md:p-6"> {/* Adjusted padding for when wallet is connected */}
      <PortfolioOverview data={portfolioData} />
      <AssetAllocationChart data={portfolioData} />
      <AssetList assets={portfolioData?.assets || []} />
      <AIInsightsPanel portfolioData={portfolioData} isVisible={wallet.isConnected && !!portfolioData} />
    </div>
  );
};

export default Dashboard;