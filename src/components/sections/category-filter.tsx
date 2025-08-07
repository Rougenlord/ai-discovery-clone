import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  toolCounts: Record<string, number>;
}

export const CategoryFilter = ({ 
  categories, 
  selectedCategory, 
  onCategoryChange, 
  toolCounts 
}: CategoryFilterProps) => {
  return (
    <section className="py-8 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Browse by Category
            </h2>
            <p className="text-muted-foreground">
              Find AI tools organized by use case and functionality
            </p>
          </div>
          <div className="text-sm text-muted-foreground">
            Showing {toolCounts[selectedCategory] || 0} tools
          </div>
        </div>
        
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "secondary"}
              size="sm"
              onClick={() => onCategoryChange(category)}
              className={`relative transition-smooth ${
                selectedCategory === category 
                  ? "gradient-button shadow-button" 
                  : "hover:border-primary/50"
              }`}
            >
              {category}
              {toolCounts[category] && (
                <Badge 
                  variant="secondary" 
                  className="ml-2 text-xs bg-background/20 text-foreground"
                >
                  {toolCounts[category]}
                </Badge>
              )}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};