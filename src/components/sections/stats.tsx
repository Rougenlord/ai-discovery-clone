import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Users, Zap, Globe } from "lucide-react";

const stats = [
  {
    icon: Zap,
    value: "100+",
    label: "AI Tools",
    description: "Curated collection",
    color: "text-yellow-400"
  },
  {
    icon: Users,
    value: "2.5M+",
    label: "Monthly Users",
    description: "Growing community",
    color: "text-blue-400"
  },
  {
    icon: TrendingUp,
    value: "50+",
    label: "Categories",
    description: "Every use case covered",
    color: "text-green-400"
  },
  {
    icon: Globe,
    value: "Daily",
    label: "New Additions",
    description: "Fresh tools daily",
    color: "text-purple-400"
  }
];

const achievements = [
  { label: "Top AI Directory", badge: "#1" },
  { label: "Featured in ProductHunt", badge: "Featured" },
  { label: "Trusted by Enterprises", badge: "Enterprise" },
  { label: "Developer Favorite", badge: "Dev Choice" }
];

export const Stats = () => {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-1/4 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-10 right-1/4 w-24 h-24 bg-accent/10 rounded-full blur-xl animate-float" style={{ animationDelay: "3s" }}></div>
      </div>

      <div className="relative container max-w-6xl mx-auto">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="gradient-card border-secondary hover:border-primary/50 transition-smooth shadow-card hover:shadow-glow">
              <CardContent className="p-6 text-center">
                <div className="mb-4">
                  <stat.icon className={`h-8 w-8 mx-auto ${stat.color}`} />
                </div>
                <div className="text-3xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-foreground mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-muted-foreground">
                  {stat.description}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Achievements */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-foreground mb-6">
            Trusted by the AI Community
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-4 py-2 rounded-full glass"
              >
                <Badge 
                  variant="default" 
                  className="gradient-button text-white text-xs"
                >
                  {achievement.badge}
                </Badge>
                <span className="text-sm text-foreground font-medium">
                  {achievement.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Metrics */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-2">
              99.9%
            </div>
            <div className="text-foreground font-medium mb-1">Uptime</div>
            <div className="text-sm text-muted-foreground">Always available when you need it</div>
          </div>
          <div>
            <div className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-2">
              24/7
            </div>
            <div className="text-foreground font-medium mb-1">Support</div>
            <div className="text-sm text-muted-foreground">Get help whenever you need it</div>
          </div>
          <div>
            <div className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-2">
              Free
            </div>
            <div className="text-foreground font-medium mb-1">Access</div>
            <div className="text-sm text-muted-foreground">No hidden fees or subscriptions</div>
          </div>
        </div>
      </div>
    </section>
  );
};