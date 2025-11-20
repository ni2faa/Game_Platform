import { GameAsset } from '@/lib/types';

export interface AssetFilterStrategy {
    filter(assets: GameAsset[], address?: string): GameAsset[];
}

export class OwnedAssetsFilter implements AssetFilterStrategy {
    filter(assets: GameAsset[], address?: string): GameAsset[] {
        if (!address) return assets;
        return assets.filter((asset) => asset.owner.toLowerCase() === address.toLowerCase());
    }
}

export class AllAssetsFilter implements AssetFilterStrategy {
    filter(assets: GameAsset[], _address?: string): GameAsset[] {
        return assets;
    }
}

export class AssetFilterService {
    constructor(private strategy: AssetFilterStrategy) { }

    filter(assets: GameAsset[], address?: string): GameAsset[] {
        return this.strategy.filter(assets, address);
    }
}