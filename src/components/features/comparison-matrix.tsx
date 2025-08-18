import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GitCompare, Star, Check, X, Minus, ExternalLink } from "lucide-react";
import { aiTools } from "@/data/ai-tools";

interface ComparisonFeature {
  name: string;
  category: string;
}

const comparisonFeatures: ComparisonFeature[] = [
  { name: "Free Tier Available", category: "Pricing" },
  { name: "API Access", category: "Technical" },
  { name: "Mobile App", category: "Accessibility" },
  { name: "Team Collaboration", category: "Features" },
  { name: "Custom Training", category: "Advanced" },
  { name: "24/7 Support", category: "Support" },
  { name: "Data Privacy", category: "Security" },
  { name: "Offline Mode", category: "Accessibility" },
  { name: "Integration Options", category: "Technical" },
  { name: "Multi-language", category: "Features" }
];

const getFeatureValue = (toolName: string, feature: string): boolean | string => {
  // Mock feature data - in real app this would come from database
  const featureMap: Record<string, Record<string, boolean | string>> = {
    "ChatGPT": {
      "Free Tier Available": true,
      "API Access": true,
      "Mobile App": true,
      "Team Collaboration": true,
      "Custom Training": false,
      "24/7 Support": false,
      "Data Privacy": true,
      "Offline Mode": false,
      "Integration Options": true,
      "Multi-language": true
    },
    "Claude": {
      "Free Tier Available": true,
      "API Access": true,
      "Mobile App": false,
      "Team Collaboration": true,
      "Custom Training": false,
      "24/7 Support": true,
      "Data Privacy": true,
      "Offline Mode": false,
      "Integration Options": true,
      "Multi-language": true
    },
    "Midjourney": {
      "Free Tier Available": false,
      "API Access": false,
      "Mobile App": false,
      "Team Collaboration": true,
      "Custom Training": false,
      "24/7 Support": false,
      "Data Privacy": true,
      "Offline Mode": false,
      "Integration Options": false,
      "Multi-language": false
    }
  };

  return featureMap[toolName]?.[feature] ?? false;
};

export const ComparisonMatrix = () => {
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const availableTools = aiTools.filter(tool => 
    selectedCategory === "All" || tool.category === selectedCategory
  );

  const addToolToComparison = (toolName: string) => {
    if (selectedTools.length < 4 && !selectedTools.includes(toolName)) {
      setSelectedTools([...selectedTools, toolName]);
    }
  };

  const removeToolFromComparison = (toolName: string) => {
    setSelectedTools(selectedTools.filter(t => t !== toolName));
  };

  const renderFeatureValue = (value: boolean | string) => {
    if (typeof value === "boolean") {
      return value ? (
        <Check className="h-5 w-5 text-green-500" />
      ) : (
        <X className="h-5 w-5 text-red-500" />
      );
    }
    return <span className="text-sm text-foreground">{value}</span>;
  };

  const categories = ["All", ...Array.from(new Set(aiTools.map(tool => tool.category)))];

  return (
    <section className="py-16 px-4">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <GitCompare className="h-8 w-8 text-primary" />
            <h2 className="text-4xl font-bold text-foreground">
              AI Tool Comparison Matrix
            </h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Compare features, pricing, and capabilities side-by-side to find the perfect AI tools for your needs
          </p>
        </div>

        <Tabs defaultValue="select" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="select">Select Tools</TabsTrigger>
            <TabsTrigger value="compare" disabled={selectedTools.length < 2}>
              Compare ({selectedTools.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="select" className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  Choose Tools to Compare
                </h3>
                <p className="text-muted-foreground">
                  Select up to 4 AI tools for detailed comparison
                </p>
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedTools.length > 0 && (
              <Card className="gradient-card border-primary/20">
                <CardHeader>
                  <CardTitle className="text-lg text-foreground">
                    Selected Tools ({selectedTools.length}/4)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {selectedTools.map((toolName) => (
                      <Badge
                        key={toolName}
                        variant="default"
                        className="gradient-button text-white shadow-button cursor-pointer"
                        onClick={() => removeToolFromComparison(toolName)}
                      >
                        {toolName}
                        <X className="h-3 w-3 ml-1" />
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableTools.map((tool) => {
                const isSelected = selectedTools.includes(tool.name);
                const canAdd = selectedTools.length < 4;
                
                return (
                  <Card 
                    key={tool.id} 
                    className={`gradient-card border-secondary hover:shadow-glow transition-smooth cursor-pointer ${
                      isSelected ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => {
                      if (isSelected) {
                        removeToolFromComparison(tool.name);
                      } else if (canAdd) {
                        addToolToComparison(tool.name);
                      }
                    }}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg text-foreground">
                            {tool.name}
                          </CardTitle>
                          <CardDescription className="mt-1 flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {tool.category}
                            </Badge>
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-xs">{tool.rating}</span>
                            </div>
                          </CardDescription>
                        </div>
                        <Button
                          variant={isSelected ? "default" : "outline"}
                          size="sm"
                          disabled={!isSelected && !canAdd}
                        >
                          {isSelected ? "Remove" : "Add"}
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {tool.description}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <Badge variant="secondary" className="text-xs">
                          {tool.price}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {tool.monthlyVisits}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="compare" className="space-y-6">
            {selectedTools.length >= 2 ? (
              <div className="overflow-x-auto">
                <div className="min-w-[800px]">
                  <div className="grid grid-cols-1 gap-6">
                    {/* Tool Headers */}
                    <Card className="gradient-card border-secondary">
                      <CardContent className="p-6">
                        <div className="grid gap-6" style={{ gridTemplateColumns: `200px repeat(${selectedTools.length}, 1fr)` }}>
                          <div className="font-semibold text-foreground">Tools</div>
                          {selectedTools.map((toolName) => {
                            const tool = aiTools.find(t => t.name === toolName);
                            return (
                              <div key={toolName} className="text-center">
                                <h3 className="font-semibold text-foreground mb-2">{toolName}</h3>
                                <div className="space-y-2">
                                  <Badge variant="outline" className="text-xs">
                                    {tool?.category}
                                  </Badge>
                                  <div className="flex items-center justify-center gap-1">
                                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                    <span className="text-xs">{tool?.rating}</span>
                                  </div>
                                  <Badge variant="secondary" className="text-xs">
                                    {tool?.price}
                                  </Badge>
                                </div>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="mt-3"
                                  onClick={() => window.open(tool?.url, '_blank')}
                                >
                                  <ExternalLink className="h-3 w-3 mr-1" />
                                  Visit
                                </Button>
                              </div>
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Feature Comparison */}
                    <Card className="gradient-card border-secondary">
                      <CardHeader>
                        <CardTitle className="text-xl text-foreground">
                          Feature Comparison
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {comparisonFeatures.map((feature) => (
                            <div 
                              key={feature.name}
                              className="grid gap-6 py-3 border-b border-secondary last:border-b-0"
                              style={{ gridTemplateColumns: `200px repeat(${selectedTools.length}, 1fr)` }}
                            >
                              <div className="flex flex-col">
                                <span className="font-medium text-foreground">{feature.name}</span>
                                <span className="text-xs text-muted-foreground">{feature.category}</span>
                              </div>
                              {selectedTools.map((toolName) => (
                                <div key={`${toolName}-${feature.name}`} className="flex justify-center">
                                  {renderFeatureValue(getFeatureValue(toolName, feature.name))}
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <GitCompare className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Select More Tools
                </h3>
                <p className="text-muted-foreground">
                  You need at least 2 tools selected to start comparing
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};