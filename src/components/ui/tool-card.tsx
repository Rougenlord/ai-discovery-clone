import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RatingDialog } from "@/components/ui/rating-dialog";
import { ExternalLink, Star, TrendingUp, Users } from "lucide-react";

interface ToolCardProps {
  name: string;
  description: string;
  category: string;
  rating?: number;
  price: "Free" | "Freemium" | "Paid";
  image?: string;
  url?: string;
  tags?: string[];
  monthlyVisits?: string;
}

export const ToolCard = ({ 
  name, 
  description, 
  category, 
  rating = 4.5, 
  price, 
  image, 
  url,
  tags = [],
  monthlyVisits
}: ToolCardProps) => {
  const handleClick = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Card className="group gradient-card border-secondary hover:border-primary/50 transition-smooth shadow-card hover:shadow-glow cursor-pointer"
          onClick={() => handleClick()}>
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="w-12 h-12 rounded-lg bg-gradient-hero flex items-center justify-center text-white font-bold text-lg animate-float">
            {name.charAt(0)}
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span>{rating}</span>
            </div>
            {monthlyVisits && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Users className="h-3 w-3" />
                <span>{monthlyVisits}</span>
              </div>
            )}
          </div>
        </div>
        <div>
          <CardTitle className="text-lg text-foreground group-hover:text-primary transition-smooth line-clamp-1">
            {name}
          </CardTitle>
          <div className="flex items-center gap-2 mt-2 flex-wrap">
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
      <CardContent className="space-y-3">
        <CardDescription className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
          {description}
        </CardDescription>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs px-2 py-0">
                {tag}
              </Badge>
            ))}
            {tags.length > 3 && (
              <Badge variant="outline" className="text-xs px-2 py-0">
                +{tags.length - 3}
              </Badge>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex gap-2 p-4">
        <RatingDialog toolName={name} toolUrl={url || "#"}>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Star className="h-4 w-4 mr-2" />
            Rate
          </Button>
        </RatingDialog>
        
        <Button 
          variant="default" 
          size="sm" 
          className="flex-1 gradient-button shadow-button hover:shadow-button hover:scale-105 transition-smooth"
          onClick={handleClick}
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          Visit
        </Button>
      </CardFooter>
    </Card>
  );
};