
import * as React from 'react';
import { Asset } from '../types';
import Card from './common/Card';

interface AssetListProps {
  assets: Asset[];
}

const AssetList: React.FC<AssetListProps> = ({ assets }) => {
  if (!assets || assets.length === 0) {
    return <Card title="Assets"><p className="text-text-muted-light dark:text-text-muted-dark">No assets in portfolio.</p></Card>;
  }

  return (
    <Card title="Asset Holdings" className="col-span-1 md:col-span-3">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-text-light dark:text-text-dark sm:pl-6">Asset</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-text-light dark:text-text-dark">Balance</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-text-light dark:text-text-dark">Value (USD)</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-text-light dark:text-text-dark">Chain</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-text-light dark:text-text-dark">Type</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-secondary-light dark:bg-secondary-dark">
            {assets.map((asset: Asset) => (
              <tr key={asset.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                  <div className="flex items-center">
                    {asset.logoUrl && <img className="h-6 w-6 rounded-full mr-2" src={asset.logoUrl} alt={`${asset.name} logo`} />}
                    <div>
                      <div className="font-medium text-text-light dark:text-text-dark">{asset.name}</div>
                      <div className="text-text-muted-light dark:text-text-muted-dark">{asset.symbol}</div>
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-text-muted-light dark:text-text-muted-dark">{asset.balance.toLocaleString()}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-text-light dark:text-text-dark font-medium">${asset.usdValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-text-muted-light dark:text-text-muted-dark">{asset.chain}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-text-muted-light dark:text-text-muted-dark">{asset.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default AssetList;
