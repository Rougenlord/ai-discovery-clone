import { useState, useMemo } from "react";
import { Header } from "@/components/layout/header";
import { Hero } from "@/components/sections/hero";
import { CategoryFilter } from "@/components/sections/category-filter";
import { ToolsGrid } from "@/components/sections/tools-grid";

// Mock data for AI tools
const mockTools = [
  {
    id: "1",
    name: "ChatGPT",
    description: "Advanced AI chatbot for conversations, writing, and problem-solving across various domains.",
    category: "Chatbots",
    rating: 4.8,
    price: "Freemium" as const,
    url: "https://chat.openai.com"
  },
  {
    id: "2", 
    name: "Midjourney",
    description: "AI-powered image generation tool that creates stunning artwork from text descriptions.",
    category: "Image Generation",
    rating: 4.7,
    price: "Paid" as const,
    url: "https://midjourney.com"
  },
  {
    id: "3",
    name: "Copy.ai",
    description: "AI writing assistant that helps create marketing copy, blog posts, and creative content.",
    category: "Content Creation",
    rating: 4.5,
    price: "Freemium" as const,
    url: "https://copy.ai"
  },
  {
    id: "4",
    name: "Grammarly",
    description: "AI-powered writing assistant that checks grammar, spelling, and writing style.",
    category: "Writing",
    rating: 4.6,
    price: "Freemium" as const,
    url: "https://grammarly.com"
  },
  {
    id: "5",
    name: "Notion AI",
    description: "Integrated AI assistant within Notion for enhanced productivity and content creation.",
    category: "Productivity",
    rating: 4.4,
    price: "Freemium" as const,
    url: "https://notion.so"
  },
  {
    id: "6",
    name: "Runway ML",
    description: "Creative AI tools for video editing, image generation, and multimedia content creation.",
    category: "Video Editing",
    rating: 4.3,
    price: "Freemium" as const,
    url: "https://runwayml.com"
  },
  {
    id: "7",
    name: "Jasper",
    description: "AI content platform for creating high-quality marketing copy and blog content.",
    category: "Content Creation",
    rating: 4.5,
    price: "Paid" as const,
    url: "https://jasper.ai"
  },
  {
    id: "8",
    name: "Synthesia",
    description: "AI video generation platform that creates professional videos with AI avatars.",
    category: "Video Generation",
    rating: 4.2,
    price: "Paid" as const,
    url: "https://synthesia.io"
  },
  {
    id: "9",
    name: "Zapier",
    description: "Automation platform with AI features to connect and automate workflows between apps.",
    category: "Automation",
    rating: 4.6,
    price: "Freemium" as const,
    url: "https://zapier.com"
  }
];

const categories = [
  "All", 
  "Chatbots", 
  "Image Generation", 
  "Content Creation", 
  "Writing", 
  "Productivity", 
  "Video Editing", 
  "Video Generation", 
  "Automation"
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredTools = useMemo(() => {
    let filtered = mockTools;

    if (selectedCategory !== "All") {
      filtered = filtered.filter(tool => tool.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(tool => 
        tool.name.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        tool.category.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [searchQuery, selectedCategory]);

  const toolCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    
    categories.forEach(category => {
      if (category === "All") {
        counts[category] = mockTools.length;
      } else {
        counts[category] = mockTools.filter(tool => tool.category === category).length;
      }
    });

    return counts;
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={setSearchQuery} searchQuery={searchQuery} />
      <Hero />
      <CategoryFilter 
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        toolCounts={toolCounts}
      />
      <ToolsGrid tools={filteredTools} />
    </div>
  );
};

export default Index;
