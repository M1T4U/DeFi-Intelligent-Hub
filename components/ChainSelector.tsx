
import * as React from 'react';
import { Chain } from '../types';

interface ChainSelectorProps {
  selectedChain: Chain;
  onChainChange: (chain: Chain) => void;
  availableChains: Chain[];
}

const ChainSelector: React.FC<ChainSelectorProps> = ({ selectedChain, onChainChange, availableChains }) => {
  return (
    <div className="relative">
      <select
        value={selectedChain}
        onChange={(e) => onChainChange(e.target.value as Chain)}
        className="appearance-none w-full bg-secondary-light dark:bg-secondary-dark border border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 px-4 py-2 pr-8 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark focus:border-accent-light dark:focus:border-accent-dark text-sm text-text-light dark:text-text-dark"
      >
        {availableChains.map((chain: Chain) => (
          <option key={chain} value={chain}>
            {chain}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  );
};

export default ChainSelector;
