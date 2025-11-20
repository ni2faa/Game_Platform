import { useState, useMemo } from 'react';
import AssetList from '@/components/assets/AssetList';
import AssetFilter from '@/components/assets/AssetFilter';
import Button from '@/components/button';
import './index.module.css';
import { useQuery } from '@tanstack/react-query';
import { fetchAssets } from '@/lib/api-nest';


/**
 * Single Responsibility: Orchestrates the dashboard components
 * Dependency Inversion: Depends on abstractions (hooks, services) not concrete implementations
 */
export default function AssetsDashboard() {
  const [connectedAddress, setConnectedAddress] = useState<string | null>(null);
  const [showOwnedOnly, setShowOwnedOnly] = useState(false);

  const isConnected = !!connectedAddress;

  // Simulate wallet connection with a mock address
  const handleConnectWallet = () => {
    const mockAddress = '0x1234567890abcdef1234567890abcdef12345678';
    setConnectedAddress(mockAddress);
  };

  // Build query params based on filter state
  const queryParams = useMemo(() => {
    if (showOwnedOnly && connectedAddress) {
      return { owner: connectedAddress };
    }
    return undefined;
  }, [showOwnedOnly, connectedAddress]);

  const { data: assets, isLoading, isError } = useQuery({
    queryKey: ['assets', queryParams],
    queryFn: () => fetchAssets(queryParams),
  });

  const assetsList = assets?.data ?? [];

  return (
    <>
      <div className="flex flex-col justify-center px-8 pt-4 md:px-4 2xl:px-0">
        <div className="backdrop-box rounded-2xl p-6">
          <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <h1 className="text-2xl font-bold">Game Asset Dashboard</h1>
            {!isConnected ? (
              <Button type="gradient" size="small" onClick={handleConnectWallet}>
                Connect Wallet
              </Button>
            ) : (
              <Button type="bordered" size="small" disabled>
                Wallet Connected
              </Button>
            )}
          </div>

          {isConnected && connectedAddress && (
            <AssetFilter showOwnedOnly={showOwnedOnly} onToggle={setShowOwnedOnly} />
          )}

          {isError ? (
            <div className="py-12 text-center">
              <p className="text-red">Error loading assets. Please try again later.</p>
            </div>
          ) : (
            <AssetList
              assets={assetsList}
              connectedAddress={connectedAddress || undefined}
              loading={isLoading}
            />
          )}
        </div>
      </div>
      
    </>
  );
}

