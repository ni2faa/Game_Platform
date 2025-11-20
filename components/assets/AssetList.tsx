import { GameAsset } from '@/lib/types';
import AssetCard from './AssetCard';

/**
 * Interface Segregation: Small, focused interface
 */
export interface AssetListProps {
  assets: GameAsset[];
  connectedAddress?: string;
  loading?: boolean;
}

/**
 * Single Responsibility: Renders the grid of assets only
 * Liskov Substitution: Can be replaced with any component that implements AssetListProps
 */
export default function AssetList({ assets, connectedAddress, loading = false }: AssetListProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
        {[...Array(15)].map((_, i) => (
          <div key={i} className="backdrop-box aspect-square animate-pulse rounded-lg" />
        ))}
      </div>
    );
  }

  if (assets.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-gray">No assets found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8">
      {assets.map((asset) => (
        <AssetCard
          key={asset.id}
          asset={asset}
          isOwned={!!connectedAddress && asset.owner.toLowerCase() === connectedAddress.toLowerCase()}
        />
      ))}
    </div>
  );
}

