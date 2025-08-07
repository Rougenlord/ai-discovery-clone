import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Star } from "lucide-react";

interface ToolCardProps {
  name: string;
  description: string;
  category: string;
  rating?: number;
  price: "Free" | "Freemium" | "Paid";
  image?: string;
  url?: string;
}

export const ToolCard = ({ name, description, category, rating = 4.5, price, image, url }: ToolCardProps) => {
  return (
    <Card className="group gradient-card border-secondary hover:border-primary/50 transition-smooth shadow-card hover:shadow-glow">
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="w-12 h-12 rounded-lg bg-gradient-hero flex items-center justify-center text-white font-bold text-lg animate-float">
            {name.charAt(0)}
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span>{rating}</span>
          </div>
        </div>
        <div>
          <CardTitle className="text-lg text-foreground group-hover:text-primary transition-smooth">{name}</CardTitle>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="secondary" className="text-xs">
              {category}
            </Badge>
            <Badge 
              variant={price === "Free" ? "default" : price === "Freemium" ? "secondary" : "outline"}
              className="text-xs"
            >
              {price}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </CardDescription>
      </CardContent>
      <CardFooter>
        <Button 
          variant="default" 
          size="sm" 
          className="w-full gradient-button shadow-button hover:shadow-button hover:scale-105 transition-smooth"
          onClick={() => url && window.open(url, '_blank')}
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          Visit Tool
        </Button>
      </CardFooter>
    </Card>
  );
};