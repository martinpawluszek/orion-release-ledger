import { Search, AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface FilterControlsProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedVersion: string;
  setSelectedVersion: (version: string) => void;
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
}

const categories = ["New Features", "Enhancements", "Front End Changes", "Bug Fixes"];

const FilterControls = ({
  searchQuery,
  setSearchQuery,
  selectedVersion,
  setSelectedVersion,
  selectedCategories,
  setSelectedCategories
}: FilterControlsProps) => {
  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        {/* Search */}
        <div className="orion-surface p-3 flex items-center gap-2 min-w-[280px]">
          <Search className="w-4 h-4 text-[hsl(var(--text-secondary))]" />
          <Input
            type="search"
            placeholder="Search notes (e.g., 'billing', 'autorenewal')"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-0 bg-transparent p-0 focus-visible:ring-0 text-[hsl(var(--text-primary))]"
          />
        </div>

        {/* Version Selector */}
        <div className="orion-surface p-3 flex items-center gap-2">
          <span className="text-xs px-2 py-1 border border-[hsl(var(--border-subtle))] rounded-full text-[hsl(var(--text-secondary))]">
            Version
          </span>
          <Select value={selectedVersion} onValueChange={setSelectedVersion}>
            <SelectTrigger className="border-0 bg-transparent focus:ring-0 w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="orion-surface border-[hsl(var(--border-standard))]">
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="4.0">4.0</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Category Checkboxes */}
        <div className="orion-surface p-3 flex items-center gap-4">
          <span className="text-xs px-2 py-1 border border-[hsl(var(--border-subtle))] rounded-full text-[hsl(var(--text-secondary))]">
            Categories
          </span>
          {categories.map((category) => (
            <label key={category} className="flex items-center gap-2 text-sm">
              <Checkbox
                checked={selectedCategories.includes(category)}
                onCheckedChange={(checked) => handleCategoryChange(category, !!checked)}
                className="border-[hsl(var(--border-standard))]"
              />
              <span className="text-[hsl(var(--text-primary))]">{category}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="orion-notice">
        <AlertTriangle className="w-4 h-4 flex-shrink-0" />
        <span>
          <strong>Access control:</strong> This page is intended to be login‑gated. For now it is public; we'll add SSO with Orion credentials later.
        </span>
      </div>
    </div>
  );
};

export default FilterControls;