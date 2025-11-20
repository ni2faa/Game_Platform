import { GameAsset } from '@/lib/types';
import classNames from 'classnames';

type AssetCardProps = {
  asset: GameAsset;
  isOwned?: boolean;
};

export default function AssetCard({ asset, isOwned = false }: AssetCardProps) {
  return (
    <div
      className={classNames(
        'backdrop-box flex cursor-pointer flex-col rounded-lg p-4 transition-all hover:bg-white/20 w-full',
        isOwned ? 'border-2 border-green' : 'border border-white/15',
      )}
    >
      <div className="mb-3 aspect-square w-full overflow-hidden rounded-lg">
        <img className="h-full w-full object-cover" src={asset.image} alt={asset.name} />
      </div>
      <h3 className="mb-2 truncate text-base font-semibold">{asset.name}</h3>
      <p className="truncate text-xs text-gray">
        Owner: <span className="font-mono">{asset.owner.slice(0, 6)}...{asset.owner.slice(-4)}</span>
      </p>
      {isOwned && (
        <div className="mt-2 flex items-center gap-1 text-xs text-green">
          <span>✓</span>
          <span>You own this</span>
        </div>
      )}
    </div>
  );
}

