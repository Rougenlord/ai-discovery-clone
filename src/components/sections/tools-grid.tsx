import { ToolCard } from "@/components/ui/tool-card";

interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  rating: number;
  price: "Free" | "Freemium" | "Paid";
  url: string;
}

interface ToolsGridProps {
  tools: Tool[];
  isLoading?: boolean;
}

export const ToolsGrid = ({ tools, isLoading }: ToolsGridProps) => {
  if (isLoading) {
    return (
      <section className="py-8 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="gradient-card rounded-lg border border-secondary p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 bg-secondary rounded-lg"></div>
                    <div className="w-12 h-4 bg-secondary rounded"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-6 bg-secondary rounded w-3/4"></div>
                    <div className="flex gap-2">
                      <div className="h-5 bg-secondary rounded w-16"></div>
                      <div className="h-5 bg-secondary rounded w-12"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-secondary rounded w-full"></div>
                    <div className="h-4 bg-secondary rounded w-5/6"></div>
                  </div>
                  <div className="h-9 bg-secondary rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 px-4">
      <div className="container max-w-6xl mx-auto">
        {tools.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-secondary/50 flex items-center justify-center">
              <span className="text-2xl">🔍</span>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No tools found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your search or category filter
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <ToolCard
                key={tool.id}
                name={tool.name}
                description={tool.description}
                category={tool.category}
                rating={tool.rating}
                price={tool.price}
                url={tool.url}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};