import { GameAsset } from '@/lib/types';
import classNames from 'classnames';

/**
 * Interface Segregation: Small, focused interface
 */
export interface AssetListItemProps {
  asset: GameAsset;
  isOwned?: boolean;
}

/**
 * Single Responsibility: Renders a single asset list item only
 * Open/Closed: Can be extended via props without modification
 */
export default function AssetListItem({ asset, isOwned = false }: AssetListItemProps) {
  return (
    <div
      className={classNames(
        'flex cursor-pointer items-center gap-4 rounded-lg bg-white/[0.12] p-4 transition-all hover:bg-white/20',
        isOwned ? 'border-l-4 border-green' : 'border-l-4 border-transparent',
      )}
    >
      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg">
        <img className="h-full w-full object-cover" src={asset.image} alt={asset.name} />
      </div>
      <div className="flex flex-1 flex-col gap-1">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-semibold">{asset.name}</h3>
          {isOwned && (
            <span className="rounded bg-green/20 px-2 py-0.5 text-xs text-green">Owned</span>
          )}
        </div>
        <p className="text-xs text-gray">
          Owner: <span className="font-mono">{asset.owner.slice(0, 6)}...{asset.owner.slice(-4)}</span>
        </p>
      </div>
    </div>
  );
}

