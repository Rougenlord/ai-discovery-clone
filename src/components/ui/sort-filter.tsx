import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Filter, SortDesc, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SortFilterProps {
  sortBy: string;
  onSortChange: (value: string) => void;
  priceFilter: string;
  onPriceFilterChange: (value: string) => void;
  ratingFilter: string;
  onRatingFilterChange: (value: string) => void;
  className?: string;
}

const sortOptions = [
  { value: "trending", label: "Trending" },
  { value: "popular", label: "Most Popular" },
  { value: "rating", label: "Highest Rated" },
  { value: "newest", label: "Newest" },
  { value: "name", label: "Name A-Z" }
];

const priceFilters = ["All", "Free", "Freemium", "Paid"];
const ratingFilters = ["All", "4.5+", "4.0+", "3.5+"];

export const SortFilter = ({
  sortBy,
  onSortChange,
  priceFilter,
  onPriceFilterChange,
  ratingFilter,
  onRatingFilterChange,
  className
}: SortFilterProps) => {
  const activeFilters = [];
  if (priceFilter !== "All") activeFilters.push(`Price: ${priceFilter}`);
  if (ratingFilter !== "All") activeFilters.push(`Rating: ${ratingFilter}`);

  const clearFilters = () => {
    onPriceFilterChange("All");
    onRatingFilterChange("All");
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Sort and Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <SortDesc className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Sort by:</span>
          </div>
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="w-40 bg-secondary/50 border-secondary hover:border-primary/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Filters:</span>
          </div>
          
          {/* Price Filter */}
          <Select value={priceFilter} onValueChange={onPriceFilterChange}>
            <SelectTrigger className="w-32 bg-secondary/50 border-secondary hover:border-primary/50">
              <SelectValue placeholder="Price" />
            </SelectTrigger>
            <SelectContent>
              {priceFilters.map((price) => (
                <SelectItem key={price} value={price}>
                  {price}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Rating Filter */}
          <Select value={ratingFilter} onValueChange={onRatingFilterChange}>
            <SelectTrigger className="w-32 bg-secondary/50 border-secondary hover:border-primary/50">
              <SelectValue placeholder="Rating" />
            </SelectTrigger>
            <SelectContent>
              {ratingFilters.map((rating) => (
                <SelectItem key={rating} value={rating}>
                  {rating}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {activeFilters.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-3 w-3 mr-1" />
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Active Filters Display */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {activeFilters.map((filter, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {filter}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};