
import * as React from 'react';
import { PortfolioData } from '../types';
import Card from './common/Card';

interface PortfolioOverviewProps {
  data: PortfolioData | null;
}

const PortfolioOverview: React.FC<PortfolioOverviewProps> = (props: PortfolioOverviewProps) => {
  const { data } = props;
  if (!data) {
    return <Card title="Portfolio Overview"><p className="text-text-muted-light dark:text-text-muted-dark">No data available.</p></Card>;
  }

  const { totalValue, dailyChangePercent, dailyChangeValue } = data;
  const changeColor = dailyChangePercent && dailyChangePercent >= 0 ? 'text-gain' : 'text-loss';
  const changeSign = dailyChangePercent && dailyChangePercent >= 0 ? '+' : '';

  return (
    <Card title="Portfolio Overview" className="col-span-1 md:col-span-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-text-muted-light dark:text-text-muted-dark">Total Portfolio Value</p>
          <p className="text-3xl font-bold text-text-light dark:text-text-dark">
            ${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
        {dailyChangePercent !== undefined && dailyChangeValue !== undefined && (
           <div>
            <p className="text-sm text-text-muted-light dark:text-text-muted-dark">24h Change</p>
            <p className={`text-2xl font-semibold ${changeColor}`}>
              {changeSign}${Math.abs(dailyChangeValue).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              <span className="text-lg ml-2">({changeSign}{Math.abs(dailyChangePercent).toFixed(2)}%)</span>
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default PortfolioOverview;
