import { useState, useMemo } from "react";
import { Header } from "@/components/layout/header";
import { Hero } from "@/components/sections/hero";
import { CategoryFilter } from "@/components/sections/category-filter";
import { ToolsGrid } from "@/components/sections/tools-grid";
import { FeaturedTools } from "@/components/sections/featured-tools";
import { Stats } from "@/components/sections/stats";
import { SubmitTool } from "@/components/forms/submit-tool";
import { SortFilter } from "@/components/ui/sort-filter";
import { Chatbot } from "@/components/chatbot/chatbot";
import { Benchmarks } from "@/components/features/benchmarks";
import { WorkspaceBuilder } from "@/components/features/workspace-builder";
import { ComparisonMatrix } from "@/components/features/comparison-matrix";
import { CommunityHub } from "@/components/features/community-hub";
import { IntegrationMarketplace } from "@/components/features/integration-marketplace";
import { LearningAcademy } from "@/components/features/learning-academy";
import { aiTools, categories, sortOptions } from "@/data/ai-tools";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("trending");
  const [priceFilter, setPriceFilter] = useState("All");
  const [ratingFilter, setRatingFilter] = useState("All");
  const [showSubmitForm, setShowSubmitForm] = useState(false);

  const filteredAndSortedTools = useMemo(() => {
    let filtered = [...aiTools];

    // Apply category filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter(tool => tool.category === selectedCategory);
    }

    // Apply price filter
    if (priceFilter !== "All") {
      filtered = filtered.filter(tool => tool.price === priceFilter);
    }

    // Apply rating filter
    if (ratingFilter !== "All") {
      const minRating = parseFloat(ratingFilter.replace("+", ""));
      filtered = filtered.filter(tool => tool.rating >= minRating);
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(tool => 
        tool.name.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        tool.category.toLowerCase().includes(query) ||
        tool.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Apply sorting
    switch (sortBy) {
      case "trending":
        filtered = filtered.sort((a, b) => {
          if (a.trending && !b.trending) return -1;
          if (!a.trending && b.trending) return 1;
          return b.rating - a.rating;
        });
        break;
      case "popular":
        filtered = filtered.sort((a, b) => {
          if (a.popular && !b.popular) return -1;
          if (!a.popular && b.popular) return 1;
          return b.rating - a.rating;
        });
        break;
      case "rating":
        filtered = filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        filtered = filtered.sort((a, b) => {
          const dateA = new Date(a.launchDate || "2020-01-01");
          const dateB = new Date(b.launchDate || "2020-01-01");
          return dateB.getTime() - dateA.getTime();
        });
        break;
      case "name":
        filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return filtered;
  }, [searchQuery, selectedCategory, sortBy, priceFilter, ratingFilter]);

  const toolCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    
    categories.forEach(category => {
      if (category === "All") {
        counts[category] = aiTools.length;
      } else {
        counts[category] = aiTools.filter(tool => tool.category === category).length;
      }
    });

    return counts;
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onSearch={setSearchQuery} 
        searchQuery={searchQuery}
        onSubmitTool={() => setShowSubmitForm(true)}
      />
      
      <Hero />
      
      <FeaturedTools tools={aiTools} />
      
      <Stats />
      
      <CategoryFilter 
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        toolCounts={toolCounts}
      />
      
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">
              All AI Tools
            </h2>
            <p className="text-muted-foreground">
              Showing {filteredAndSortedTools.length} of {aiTools.length} tools
            </p>
          </div>
        </div>
        
        <SortFilter
          sortBy={sortBy}
          onSortChange={setSortBy}
          priceFilter={priceFilter}
          onPriceFilterChange={setPriceFilter}
          ratingFilter={ratingFilter}
          onRatingFilterChange={setRatingFilter}
          className="mb-8"
        />
      </div>
      
      <ToolsGrid tools={filteredAndSortedTools} />
      
      <Benchmarks />
      
      <WorkspaceBuilder />
      
      <ComparisonMatrix />
      
      <CommunityHub />
      
      <IntegrationMarketplace />
      
      <LearningAcademy />
      
      {showSubmitForm && (
        <div id="submit-tool">
          <SubmitTool />
        </div>
      )}
      
      <Chatbot />
    </div>
  );
};

export default Index;
