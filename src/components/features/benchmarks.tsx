import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Zap, Clock, Users, Star } from "lucide-react";

interface BenchmarkData {
  toolName: string;
  category: string;
  performanceScore: number;
  speedScore: number;
  accuracyScore: number;
  userSatisfaction: number;
  responseTime: string;
  uptime: number;
  activeUsers: string;
  rating: number;
}

const benchmarkData: BenchmarkData[] = [
  {
    toolName: "ChatGPT",
    category: "Chatbots",
    performanceScore: 95,
    speedScore: 88,
    accuracyScore: 92,
    userSatisfaction: 94,
    responseTime: "1.2s",
    uptime: 99.8,
    activeUsers: "100M+",
    rating: 4.8
  },
  {
    toolName: "Midjourney",
    category: "Image Generation",
    performanceScore: 97,
    speedScore: 75,
    accuracyScore: 96,
    userSatisfaction: 96,
    responseTime: "45s",
    uptime: 99.5,
    activeUsers: "15M+",
    rating: 4.9
  },
  {
    toolName: "GitHub Copilot",
    category: "Code Generation",
    performanceScore: 89,
    speedScore: 95,
    accuracyScore: 87,
    userSatisfaction: 91,
    responseTime: "0.3s",
    uptime: 99.9,
    activeUsers: "5M+",
    rating: 4.7
  },
  {
    toolName: "Jasper AI",
    category: "Content Creation",
    performanceScore: 86,
    speedScore: 90,
    accuracyScore: 84,
    userSatisfaction: 88,
    responseTime: "2.1s",
    uptime: 99.7,
    activeUsers: "2M+",
    rating: 4.6
  },
  {
    toolName: "DeepL",
    category: "Translation",
    performanceScore: 93,
    speedScore: 92,
    accuracyScore: 95,
    userSatisfaction: 93,
    responseTime: "0.8s",
    uptime: 99.9,
    activeUsers: "50M+",
    rating: 4.8
  },
  {
    toolName: "Notion AI",
    category: "Productivity",
    performanceScore: 82,
    speedScore: 85,
    accuracyScore: 80,
    userSatisfaction: 85,
    responseTime: "1.5s",
    uptime: 99.6,
    activeUsers: "30M+",
    rating: 4.5
  }
];

export const Benchmarks = () => {
  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-500";
    if (score >= 80) return "text-yellow-500";
    return "text-red-500";
  };

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 90) return "default";
    if (score >= 80) return "secondary";
    return "destructive";
  };

  return (
    <section className="py-16 px-4">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <TrendingUp className="h-8 w-8 text-primary" />
            <h2 className="text-4xl font-bold text-foreground">
              AI Tool Performance Benchmarks
            </h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real-time performance metrics, speed tests, and user satisfaction scores for top AI tools
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {benchmarkData.map((tool, index) => (
            <Card key={tool.toolName} className="gradient-card border-secondary hover:shadow-glow transition-smooth">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl text-foreground flex items-center gap-2">
                      {tool.toolName}
                      <Badge variant="outline" className="text-xs">
                        {tool.category}
                      </Badge>
                    </CardTitle>
                    <CardDescription className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{tool.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{tool.activeUsers}</span>
                      </div>
                    </CardDescription>
                  </div>
                  <Badge 
                    variant={getScoreBadgeVariant(tool.performanceScore)}
                    className="text-lg px-3 py-1"
                  >
                    {tool.performanceScore}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Performance</span>
                      <span className={`font-semibold ${getScoreColor(tool.performanceScore)}`}>
                        {tool.performanceScore}%
                      </span>
                    </div>
                    <Progress value={tool.performanceScore} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Speed</span>
                      <span className={`font-semibold ${getScoreColor(tool.speedScore)}`}>
                        {tool.speedScore}%
                      </span>
                    </div>
                    <Progress value={tool.speedScore} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Accuracy</span>
                      <span className={`font-semibold ${getScoreColor(tool.accuracyScore)}`}>
                        {tool.accuracyScore}%
                      </span>
                    </div>
                    <Progress value={tool.accuracyScore} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">User Satisfaction</span>
                      <span className={`font-semibold ${getScoreColor(tool.userSatisfaction)}`}>
                        {tool.userSatisfaction}%
                      </span>
                    </div>
                    <Progress value={tool.userSatisfaction} className="h-2" />
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-secondary">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Response: {tool.responseTime}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Zap className="h-4 w-4" />
                    <span>Uptime: {tool.uptime}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            Benchmarks updated every 24 hours • Data aggregated from 10M+ user interactions
          </p>
        </div>
      </div>
    </section>
  );
};