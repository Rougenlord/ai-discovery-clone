import { ToolCard } from "@/components/ui/tool-card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, TrendingUp, Star } from "lucide-react";
import { AITool } from "@/data/ai-tools";

interface FeaturedToolsProps {
  tools: AITool[];
}

export const FeaturedTools = ({ tools }: FeaturedToolsProps) => {
  const featuredTools = tools.filter(tool => tool.featured).slice(0, 6);
  const trendingTools = tools.filter(tool => tool.trending).slice(0, 6);
  const popularTools = tools.filter(tool => tool.popular).slice(0, 6);

  const sections = [
    {
      title: "Featured Tools",
      subtitle: "Hand-picked AI tools that are changing the game",
      icon: Sparkles,
      tools: featuredTools,
      badge: "Featured"
    },
    {
      title: "Trending Now",
      subtitle: "The hottest AI tools everyone's talking about",
      icon: TrendingUp,
      tools: trendingTools,
      badge: "Trending"
    },
    {
      title: "Most Popular",
      subtitle: "Community favorites with the highest engagement",
      icon: Star,
      tools: popularTools,
      badge: "Popular"
    }
  ];

  return (
    <section className="py-16 px-4">
      <div className="container max-w-7xl mx-auto">
        {sections.map((section, index) => (
          <div key={section.title} className={index > 0 ? "mt-20" : ""}>
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <section.icon className="h-6 w-6 text-primary" />
                  <h2 className="text-3xl font-bold text-foreground">
                    {section.title}
                  </h2>
                  <Badge 
                    variant="default" 
                    className="gradient-button text-white shadow-button"
                  >
                    {section.badge}
                  </Badge>
                </div>
                <p className="text-muted-foreground text-lg">
                  {section.subtitle}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {section.tools.map((tool) => (
                <div key={tool.id} className="transform hover:scale-105 transition-smooth">
                  <ToolCard
                    name={tool.name}
                    description={tool.description}
                    category={tool.category}
                    rating={tool.rating}
                    price={tool.price}
                    url={tool.url}
                    tags={tool.tags}
                    monthlyVisits={tool.monthlyVisits}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};