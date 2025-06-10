
import * as React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PortfolioData, ChartDataPoint } from '../types';
import { CHART_COLORS } from '../constants';
import Card from './common/Card';

interface AssetAllocationChartProps {
  data: PortfolioData | null;
}

const AssetAllocationChart: React.FC<AssetAllocationChartProps> = ({ data }: AssetAllocationChartProps) => {
  if (!data || !data.assets || data.assets.length === 0) {
    return <Card title="Asset Allocation"><p className="text-text-muted-light dark:text-text-muted-dark">No asset data to display chart.</p></Card>;
  }

  const chartData: ChartDataPoint[] = data.assets.map((asset: any, index: number) => ({
    name: asset.symbol,
    value: asset.usdValue,
    fill: CHART_COLORS[index % CHART_COLORS.length],
  }));

  return (
    <Card title="Asset Allocation">
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default AssetAllocationChart;
