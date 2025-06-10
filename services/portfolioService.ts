
import { PortfolioData, Chain } from '../types';
import { MOCK_PORTFOLIO_DATA_ETHEREUM, MOCK_PORTFOLIO_DATA_POLYGON, MOCK_ASSETS_ETHEREUM, MOCK_ASSETS_POLYGON } from '../constants';

// Simulate API call latency
const API_DELAY = 500; 

export const fetchPortfolioData = async (chain: Chain): Promise<PortfolioData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      switch (chain) {
        case Chain.Ethereum:
          resolve(MOCK_PORTFOLIO_DATA_ETHEREUM);
          break;
        case Chain.Polygon:
          resolve(MOCK_PORTFOLIO_DATA_POLYGON);
          break;
        // Add other chains here with their mock data
        case Chain.Arbitrum: // Example for Arbitrum, using Ethereum data for now
          resolve({ ...MOCK_PORTFOLIO_DATA_ETHEREUM, assets: MOCK_ASSETS_ETHEREUM.map(a => ({...a, chain: Chain.Arbitrum}))});
          break;
        case Chain.Solana: // Example for Solana, using Polygon data for now
           resolve({ ...MOCK_PORTFOLIO_DATA_POLYGON, assets: MOCK_ASSETS_POLYGON.map(a => ({...a, chain: Chain.Solana}))});
           break;
        default:
          resolve(MOCK_PORTFOLIO_DATA_ETHEREUM); // Default to Ethereum
      }
    }, API_DELAY);
  });
};
