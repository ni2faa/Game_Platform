import { useState, useEffect } from 'react';
import { GameAsset } from '@/lib/types';

export interface UseAssetsResult {
  assets: GameAsset[];
  loading: boolean;
  error: Error | null;
}

/**
 * Single Responsibility: Handles asset data fetching only
 */
export function useAssets(): UseAssetsResult {
  const [assets, setAssets] = useState<GameAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    fetch('http://localhost:3099/api/v1/assets', {
      signal: abortController.signal,
      headers: {
        'Authorization': 'Bearer mock-token-123',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (!abortController.signal.aborted) {
          // Handle response format: { success: true, assets: [...] }
          if (data.success && Array.isArray(data.assets)) {
            setAssets(data.assets);
          } else {
            throw new Error('Invalid response format');
          }
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!abortController.signal.aborted && err.name !== 'AbortError') {
          setError(err);
          setLoading(false);
        }
      });

    return () => {
      abortController.abort();
    };
  }, []);

  return { assets, loading, error };
}

