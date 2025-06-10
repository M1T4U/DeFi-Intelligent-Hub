
export enum Chain {
  Ethereum = "Ethereum",
  Polygon = "Polygon",
  Arbitrum = "Arbitrum",
  Solana = "Solana"
}

export interface WalletState {
  isConnected: boolean;
  address: string | null;
  chain: Chain;
}

export interface Asset {
  id: string;
  name: string;
  symbol: string;
  balance: number;
  usdValue: number;
  chain: Chain;
  logoUrl?: string; // Optional: URL to token logo
  type: 'Token' | 'LP Token' | 'Staked';
}

export interface PortfolioData {
  totalValue: number;
  assets: Asset[];
  dailyChangePercent?: number; // Optional
  dailyChangeValue?: number; // Optional
}

export interface AIInsight {
  id: string;
  title: string;
  content: string;
  type: 'RiskAssessment' | 'YieldOptimization' | 'MarketTrend' | 'General';
  timestamp: string;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  fill: string;
}

// Props for components that accept children
export interface ChildrenProps {
  children: React.ReactNode;
}
