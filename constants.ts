
import { PortfolioData, Asset, Chain, AIInsight } from './types';

export const APP_NAME = "DeFi Intelligence Hub";
export const GEMINI_TEXT_MODEL = "gemini-2.5-flash-preview-04-17";

export const DEFAULT_CHAIN = Chain.Ethereum;

export const MOCK_ASSETS_ETHEREUM: Asset[] = [
  { id: 'eth', name: 'Ethereum', symbol: 'ETH', balance: 10.5, usdValue: 35700, chain: Chain.Ethereum, type: 'Token', logoUrl: 'https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=029' },
  { id: 'usdc', name: 'USD Coin', symbol: 'USDC', balance: 5000, usdValue: 5000, chain: Chain.Ethereum, type: 'Token', logoUrl: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.svg?v=029' },
  { id: 'uni', name: 'Uniswap', symbol: 'UNI', balance: 250, usdValue: 2500, chain: Chain.Ethereum, type: 'Token', logoUrl: 'https://cryptologos.cc/logos/uniswap-uni-logo.svg?v=029' },
  { id: 'aave-lp', name: 'Aave ETH LP', symbol: 'aEthLP', balance: 50, usdValue: 3000, chain: Chain.Ethereum, type: 'LP Token' },
];

export const MOCK_ASSETS_POLYGON: Asset[] = [
  { id: 'matic', name: 'Polygon', symbol: 'MATIC', balance: 10000, usdValue: 7000, chain: Chain.Polygon, type: 'Token', logoUrl: 'https://cryptologos.cc/logos/polygon-matic-logo.svg?v=029' },
  { id: 'usdt-poly', name: 'USDT (Polygon)', symbol: 'USDT', balance: 3000, usdValue: 3000, chain: Chain.Polygon, type: 'Token', logoUrl: 'https://cryptologos.cc/logos/tether-usdt-logo.svg?v=029' },
  { id: 'quick-lp', name: 'QuickSwap LP', symbol: 'QUICK-LP', balance: 100, usdValue: 1500, chain: Chain.Polygon, type: 'LP Token' },
];

export const MOCK_PORTFOLIO_DATA_ETHEREUM: PortfolioData = {
  totalValue: MOCK_ASSETS_ETHEREUM.reduce((sum, asset) => sum + asset.usdValue, 0),
  assets: MOCK_ASSETS_ETHEREUM,
  dailyChangePercent: 2.5,
  dailyChangeValue: MOCK_ASSETS_ETHEREUM.reduce((sum, asset) => sum + asset.usdValue, 0) * 0.025,
};

export const MOCK_PORTFOLIO_DATA_POLYGON: PortfolioData = {
  totalValue: MOCK_ASSETS_POLYGON.reduce((sum, asset) => sum + asset.usdValue, 0),
  assets: MOCK_ASSETS_POLYGON,
  dailyChangePercent: -1.2,
  dailyChangeValue: MOCK_ASSETS_POLYGON.reduce((sum, asset) => sum + asset.usdValue, 0) * -0.012,
};


export const MOCK_AI_INSIGHTS: AIInsight[] = [
  {
    id: '1',
    title: "Initial Portfolio Analysis",
    content: "Your portfolio shows a strong concentration in Ethereum-based assets. Consider diversifying across other chains or asset types to mitigate risks.",
    type: 'General',
    timestamp: new Date(Date.now() - 3600000).toISOString() // 1 hour ago
  },
  {
    id: '2',
    title: "Yield Opportunity: Stablecoin Farming",
    content: "Explore stablecoin farming options on protocols like Curve or Convex for potentially lower-risk yield generation on your USDC holdings.",
    type: 'YieldOptimization',
    timestamp: new Date(Date.now() - 7200000).toISOString() // 2 hours ago
  }
];

export const CHART_COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899', '#6366F1'];
