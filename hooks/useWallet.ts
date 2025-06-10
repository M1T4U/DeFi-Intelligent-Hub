
import { useState, useCallback } from 'react';
import { WalletState, Chain } from '../types';
import { DEFAULT_CHAIN } from '../constants';

const MOCK_ADDRESS_PREFIX = "0xMockAddress";

export function useWallet(): [WalletState, (chain?: Chain) => void, () => void, (chain: Chain) => void] {
  const [wallet, setWallet] = useState<WalletState>({
    isConnected: false,
    address: null,
    chain: DEFAULT_CHAIN,
  });

  const connectWallet = useCallback((chain: Chain = DEFAULT_CHAIN) => {
    // Simulate wallet connection
    const mockAddress = `${MOCK_ADDRESS_PREFIX}${Math.random().toString(36).substring(2, 10)}`;
    setWallet({
      isConnected: true,
      address: mockAddress,
      chain: chain,
    });
  }, []);

  const disconnectWallet = useCallback(() => {
    setWallet(prev => ({
      ...prev,
      isConnected: false,
      address: null,
    }));
  }, []);

  const setChain = useCallback((newChain: Chain) => {
    setWallet(prev => ({
      ...prev,
      chain: newChain,
    }));
    // If connected, you might want to "reconnect" or update data based on the new chain
    if (wallet.isConnected) {
        // Potentially trigger data refresh for new chain here
        console.log(`Switched to ${newChain}. Portfolio data should update.`);
    }
  }, [wallet.isConnected]);

  return [wallet, connectWallet, disconnectWallet, setChain];
}
