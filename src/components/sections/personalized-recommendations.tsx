import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ToolsGrid } from "@/components/sections/tools-grid";
import { aiTools } from "@/data/ai-tools";
import { Sparkles, User, Target, Briefcase } from "lucide-react";

interface OnboardingData {
  role?: string;
  company_size?: string;
  ai_experience?: string;
  use_cases?: string[];
  goals?: string[];
  preferred_tools?: string[];
  budget_range?: string;
}

export const PersonalizedRecommendations = () => {
  const { user } = useAuth();
  const [onboardingData, setOnboardingData] = useState<OnboardingData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOnboardingData = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('onboarding')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error('Error fetching onboarding data:', error);
        } else if (data) {
          setOnboardingData(data);
        }
      } catch (error) {
        console.error('Error:', error);
      }
      
      setLoading(false);
    };

    fetchOnboardingData();
  }, [user]);

  if (loading) {
    return (
      <section className="py-8 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-secondary rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-secondary rounded w-2/3 mb-8"></div>
          </div>
        </div>
      </section>
    );
  }

  if (!user || !onboardingData) {
    return null;
  }

  // Filter tools based on user preferences
  const getRecommendedTools = () => {
    let recommended = [...aiTools];

    // Filter by use cases if available
    if (onboardingData.use_cases && onboardingData.use_cases.length > 0) {
      recommended = recommended.filter(tool => 
        onboardingData.use_cases!.some(useCase => 
          tool.tags.some(tag => 
            tag.toLowerCase().includes(useCase.toLowerCase()) ||
            tool.category.toLowerCase().includes(useCase.toLowerCase()) ||
            tool.description.toLowerCase().includes(useCase.toLowerCase())
          )
        )
      );
    }

    // Filter by budget if available
    if (onboardingData.budget_range) {
      const budgetMapping: Record<string, string[]> = {
        'free': ['Free'],
        'under-50': ['Free', 'Freemium'],
        '50-200': ['Freemium', 'Paid'],
        'over-200': ['Paid', 'Enterprise'],
        'enterprise': ['Enterprise']
      };
      
      const allowedPrices = budgetMapping[onboardingData.budget_range] || [];
      if (allowedPrices.length > 0) {
        recommended = recommended.filter(tool => 
          allowedPrices.some(price => 
            tool.price.toLowerCase().includes(price.toLowerCase())
          )
        );
      }
    }

    // Sort by rating and limit to top recommendations
    return recommended
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 6);
  };

  const recommendedTools = getRecommendedTools();

  return (
    <section className="py-12 px-4 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-6 w-6 text-primary" />
            <h2 className="text-3xl font-bold text-foreground">
              Personalized for You
            </h2>
          </div>
          <p className="text-xl text-muted-foreground">
            AI tools recommended based on your preferences and needs
          </p>
        </div>

        {/* User Preferences Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {onboardingData.role && (
            <Card className="gradient-card border-secondary">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <User className="h-4 w-4 text-primary" />
                  <span className="font-medium text-foreground">Role</span>
                </div>
                <p className="text-sm text-muted-foreground">{onboardingData.role}</p>
              </CardContent>
            </Card>
          )}
          
          {onboardingData.goals && onboardingData.goals.length > 0 && (
            <Card className="gradient-card border-secondary">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-4 w-4 text-primary" />
                  <span className="font-medium text-foreground">Goals</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {onboardingData.goals.slice(0, 2).map((goal, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {goal}
                    </Badge>
                  ))}
                  {onboardingData.goals.length > 2 && (
                    <Badge variant="secondary" className="text-xs">
                      +{onboardingData.goals.length - 2} more
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
          
          {onboardingData.budget_range && (
            <Card className="gradient-card border-secondary">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Briefcase className="h-4 w-4 text-primary" />
                  <span className="font-medium text-foreground">Budget</span>
                </div>
                <p className="text-sm text-muted-foreground capitalize">
                  {onboardingData.budget_range.replace('-', ' - $')}
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Recommended Tools */}
        {recommendedTools.length > 0 ? (
          <ToolsGrid tools={recommendedTools} />
        ) : (
          <Card className="text-center p-8">
            <CardContent>
              <Sparkles className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <CardTitle className="mb-2">No specific recommendations yet</CardTitle>
              <CardDescription className="mb-4">
                We're showing you all our featured tools. Complete your onboarding to get personalized recommendations.
              </CardDescription>
              <Button onClick={() => window.location.href = '/onboarding'}>
                Complete Onboarding
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
};