import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-hero opacity-20"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-accent/20 rounded-full blur-xl animate-float" style={{ animationDelay: "2s" }}></div>
        <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-primary/10 rounded-full blur-xl animate-float" style={{ animationDelay: "4s" }}></div>
      </div>
      
      <div className="relative container max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 text-sm text-muted-foreground mb-8 glass">
          <Sparkles className="h-4 w-4 text-primary" />
          <span>The largest AI tools directory</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
          There's An{" "}
          <span className="bg-gradient-hero bg-clip-text text-transparent">
            AI For That
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
          Discover the perfect AI tool for any task. From content creation to data analysis, 
          find curated AI solutions that match your needs.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="gradient-button shadow-button hover:shadow-glow hover:scale-105 transition-smooth text-lg px-8 py-4"
          >
            Explore AI Tools
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="text-lg px-8 py-4 border-primary/50 hover:border-primary text-foreground hover:bg-primary/10 transition-smooth"
          >
            Submit Your Tool
          </Button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-secondary">
          <div className="text-center">
            <div className="text-3xl font-bold text-foreground">5000+</div>
            <div className="text-muted-foreground">AI Tools</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-foreground">50+</div>
            <div className="text-muted-foreground">Categories</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-foreground">1M+</div>
            <div className="text-muted-foreground">Monthly Visits</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-foreground">Daily</div>
            <div className="text-muted-foreground">New Additions</div>
          </div>
        </div>
      </div>
    </section>
  );
};