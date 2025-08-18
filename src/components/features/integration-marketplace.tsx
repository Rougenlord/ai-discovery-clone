import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plug, ExternalLink, Download, Star, Zap, Code, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Integration {
  id: string;
  name: string;
  description: string;
  category: string;
  provider: string;
  type: "API" | "Plugin" | "Extension" | "Webhook" | "Widget";
  compatibility: string[];
  rating: number;
  downloads: string;
  price: "Free" | "Freemium" | "Paid";
  documentationUrl: string;
  installUrl: string;
  features: string[];
  tags: string[];
}

const integrations: Integration[] = [
  {
    id: "1",
    name: "Zapier ChatGPT Connector",
    description: "Automate workflows by connecting ChatGPT with 5000+ apps. Create custom automations without coding.",
    category: "Automation",
    provider: "Zapier",
    type: "API",
    compatibility: ["ChatGPT", "GPT-4", "OpenAI API"],
    rating: 4.8,
    downloads: "50K+",
    price: "Freemium",
    documentationUrl: "https://zapier.com/apps/chatgpt",
    installUrl: "https://zapier.com/apps/chatgpt",
    features: ["No-code automation", "5000+ app integrations", "Real-time triggers", "Custom workflows"],
    tags: ["automation", "workflow", "productivity"]
  },
  {
    id: "2",
    name: "Slack AI Assistant",
    description: "Bring AI capabilities directly into your Slack workspace. Get instant answers and automate tasks.",
    category: "Communication",
    provider: "Slack",
    type: "Plugin",
    compatibility: ["ChatGPT", "Claude", "Slack API"],
    rating: 4.6,
    downloads: "25K+",
    price: "Free",
    documentationUrl: "https://api.slack.com/ai",
    installUrl: "https://slack.com/apps/ai-assistant",
    features: ["Team collaboration", "Direct messaging", "Channel integration", "Custom commands"],
    tags: ["slack", "team", "communication"]
  },
  {
    id: "3",
    name: "Chrome AI Extension",
    description: "Access AI tools directly from your browser. Summarize pages, generate content, and more.",
    category: "Browser",
    provider: "Chrome Web Store",
    type: "Extension",
    compatibility: ["ChatGPT", "Gemini", "Claude"],
    rating: 4.7,
    downloads: "100K+",
    price: "Free",
    documentationUrl: "https://chrome.google.com/webstore/ai-extension",
    installUrl: "https://chrome.google.com/webstore/ai-extension",
    features: ["Page summarization", "Text generation", "Quick access", "Multiple AI models"],
    tags: ["browser", "chrome", "productivity"]
  },
  {
    id: "4",
    name: "Notion AI Sync",
    description: "Sync AI-generated content directly to your Notion workspace. Perfect for knowledge management.",
    category: "Productivity",
    provider: "Notion",
    type: "API",
    compatibility: ["ChatGPT", "Notion API", "Markdown"],
    rating: 4.5,
    downloads: "15K+",
    price: "Paid",
    documentationUrl: "https://developers.notion.com/ai-sync",
    installUrl: "https://notion.so/ai-sync",
    features: ["Database sync", "Markdown support", "Automated updates", "Template generation"],
    tags: ["notion", "knowledge", "database"]
  },
  {
    id: "5",
    name: "Discord AI Bot",
    description: "Add AI capabilities to your Discord server. Moderate content, answer questions, and engage users.",
    category: "Communication",
    provider: "Discord",
    type: "Plugin",
    compatibility: ["ChatGPT", "Claude", "Discord API"],
    rating: 4.4,
    downloads: "75K+",
    price: "Freemium",
    documentationUrl: "https://discord.com/developers/ai-bot",
    installUrl: "https://discord.com/oauth2/ai-bot",
    features: ["Server moderation", "Q&A assistance", "Custom commands", "Role management"],
    tags: ["discord", "community", "moderation"]
  },
  {
    id: "6",
    name: "WordPress AI Plugin",
    description: "Generate content, optimize SEO, and enhance your WordPress site with AI-powered features.",
    category: "Content Management",
    provider: "WordPress",
    type: "Plugin",
    compatibility: ["ChatGPT", "WordPress", "WooCommerce"],
    rating: 4.3,
    downloads: "30K+",
    price: "Freemium",
    documentationUrl: "https://wordpress.org/plugins/ai-assistant",
    installUrl: "https://wordpress.org/plugins/ai-assistant",
    features: ["Content generation", "SEO optimization", "Image creation", "Meta descriptions"],
    tags: ["wordpress", "seo", "content"]
  }
];

const categories = ["All", "Automation", "Communication", "Browser", "Productivity", "Content Management"];
const types = ["All", "API", "Plugin", "Extension", "Webhook", "Widget"];
const prices = ["All", "Free", "Freemium", "Paid"];

export const IntegrationMarketplace = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState("All");
  const { toast } = useToast();

  const filteredIntegrations = integrations.filter(integration => {
    const matchesSearch = integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         integration.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         integration.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === "All" || integration.category === selectedCategory;
    const matchesType = selectedType === "All" || integration.type === selectedType;
    const matchesPrice = selectedPrice === "All" || integration.price === selectedPrice;

    return matchesSearch && matchesCategory && matchesType && matchesPrice;
  });

  const handleInstall = (integration: Integration) => {
    toast({
      title: "Redirecting...",
      description: `Opening ${integration.name} installation page`,
    });
    window.open(integration.installUrl, '_blank');
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "API": return <Code className="h-4 w-4" />;
      case "Plugin": return <Plug className="h-4 w-4" />;
      case "Extension": return <Globe className="h-4 w-4" />;
      case "Webhook": return <Zap className="h-4 w-4" />;
      case "Widget": return <Star className="h-4 w-4" />;
      default: return <Plug className="h-4 w-4" />;
    }
  };

  const getPriceColor = (price: string) => {
    switch (price) {
      case "Free": return "text-green-500";
      case "Freemium": return "text-blue-500";
      case "Paid": return "text-orange-500";
      default: return "text-muted-foreground";
    }
  };

  return (
    <section className="py-16 px-4">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Plug className="h-8 w-8 text-primary" />
            <h2 className="text-4xl font-bold text-foreground">
              Integration Marketplace
            </h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Connect your favorite AI tools with the apps you use every day. Discover plugins, APIs, and extensions.
          </p>
        </div>

        <Tabs defaultValue="browse" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="browse">Browse Integrations</TabsTrigger>
            <TabsTrigger value="popular">Most Popular</TabsTrigger>
            <TabsTrigger value="submit">Submit Integration</TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-6">
            {/* Filters */}
            <Card className="gradient-card border-secondary">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  <div className="lg:col-span-2">
                    <Input
                      placeholder="Search integrations..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {types.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={selectedPrice} onValueChange={setSelectedPrice}>
                    <SelectTrigger>
                      <SelectValue placeholder="Price" />
                    </SelectTrigger>
                    <SelectContent>
                      {prices.map((price) => (
                        <SelectItem key={price} value={price}>
                          {price}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Integration Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredIntegrations.map((integration) => (
                <Card key={integration.id} className="gradient-card border-secondary hover:shadow-glow transition-smooth">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        {getTypeIcon(integration.type)}
                        <div>
                          <CardTitle className="text-lg text-foreground">
                            {integration.name}
                          </CardTitle>
                          <CardDescription className="text-sm">
                            by {integration.provider}
                          </CardDescription>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {integration.type}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {integration.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{integration.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Download className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{integration.downloads}</span>
                        </div>
                      </div>
                      <span className={`text-sm font-medium ${getPriceColor(integration.price)}`}>
                        {integration.price}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="text-xs text-muted-foreground">Compatible with:</div>
                      <div className="flex flex-wrap gap-1">
                        {integration.compatibility.slice(0, 3).map((tool) => (
                          <Badge key={tool} variant="secondary" className="text-xs">
                            {tool}
                          </Badge>
                        ))}
                        {integration.compatibility.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{integration.compatibility.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-xs text-muted-foreground">Key features:</div>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        {integration.features.slice(0, 3).map((feature, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <div className="w-1 h-1 bg-primary rounded-full"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex gap-2 pt-4 border-t border-secondary">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(integration.documentationUrl, '_blank')}
                        className="flex-1"
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Docs
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleInstall(integration)}
                        className="flex-1"
                      >
                        Install
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredIntegrations.length === 0 && (
              <div className="text-center py-12">
                <Plug className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  No integrations found
                </h3>
                <p className="text-muted-foreground">
                  Try adjusting your search criteria or browse all categories
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="popular" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {integrations
                .sort((a, b) => parseInt(b.downloads.replace(/\D/g, '')) - parseInt(a.downloads.replace(/\D/g, '')))
                .slice(0, 6)
                .map((integration) => (
                  <Card key={integration.id} className="gradient-card border-secondary hover:shadow-glow transition-smooth">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          {getTypeIcon(integration.type)}
                          <div>
                            <CardTitle className="text-lg text-foreground">
                              {integration.name}
                            </CardTitle>
                            <CardDescription className="text-sm">
                              by {integration.provider}
                            </CardDescription>
                          </div>
                        </div>
                        <Badge className="gradient-button text-white">
                          Popular
                        </Badge>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {integration.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{integration.rating}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Download className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{integration.downloads}</span>
                          </div>
                        </div>
                        <span className={`text-sm font-medium ${getPriceColor(integration.price)}`}>
                          {integration.price}
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(integration.documentationUrl, '_blank')}
                          className="flex-1"
                        >
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Learn More
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleInstall(integration)}
                          className="flex-1"
                        >
                          Install
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="submit" className="space-y-6">
            <Card className="gradient-card border-secondary max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-2xl text-foreground">
                  Submit Your Integration
                </CardTitle>
                <CardDescription>
                  Share your AI tool integration with the community
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Integration Name</label>
                    <Input placeholder="My Awesome AI Integration" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Category</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.filter(c => c !== "All").map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Description</label>
                  <Input placeholder="Brief description of your integration" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Installation URL</label>
                  <Input placeholder="https://example.com/install" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Documentation URL</label>
                  <Input placeholder="https://docs.example.com" />
                </div>
                <Button className="w-full">
                  Submit Integration
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};