/**
 * Interface Segregation: Small, focused interface
 */
export interface AssetFilterProps {
  showOwnedOnly: boolean;
  onToggle: (value: boolean) => void;
}

/**
 * Single Responsibility: Handles filter UI only
 */
export default function AssetFilter({ showOwnedOnly, onToggle }: AssetFilterProps) {
  return (
    <div className="mb-6 flex items-center gap-2">
      <input
        type="checkbox"
        id="showOwnedOnly"
        checked={showOwnedOnly}
        onChange={(e) => onToggle(e.target.checked)}
        className="h-4 w-4 cursor-pointer rounded border-white/15 bg-white/[0.08] text-green focus:ring-2 focus:ring-green"
      />
      <label htmlFor="showOwnedOnly" className="cursor-pointer text-sm text-gray">
        Show only my assets
      </label>
    </div>
  );
}

