import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Target, DollarSign, Briefcase, Building } from "lucide-react";

interface OnboardingData {
  ai_experience: string | null;
  budget_range: string | null;
  company: string | null;
  company_size: string | null;
  goals: string[] | null;
  preferred_tools: string[] | null;
  role: string | null;
  use_cases: string[] | null;
}

export const UserPreferences = () => {
  const { user } = useAuth();
  const [preferences, setPreferences] = useState<OnboardingData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserPreferences = async () => {
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
          console.error('Error fetching preferences:', error);
        } else if (data) {
          setPreferences(data);
        }
      } catch (error) {
        console.error('Error:', error);
      }

      setLoading(false);
    };

    fetchUserPreferences();
  }, [user]);

  if (loading) {
    return (
      <div className="mb-8">
        <Card className="gradient-card border-secondary">
          <CardContent className="p-6">
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-secondary rounded w-1/3"></div>
              <div className="space-y-2">
                <div className="h-3 bg-secondary rounded w-full"></div>
                <div className="h-3 bg-secondary rounded w-2/3"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mb-8">
        <Card className="gradient-card border-secondary">
          <CardContent className="p-6 text-center">
            <User className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Personalized Recommendations</h3>
            <p className="text-muted-foreground mb-4">
              Sign in to get AI tool recommendations based on your preferences
            </p>
            <button 
              onClick={() => window.location.href = '/auth'}
              className="text-primary hover:underline"
            >
              Sign in to see your preferences
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!preferences) {
    return (
      <div className="mb-8">
        <Card className="gradient-card border-secondary">
          <CardContent className="p-6 text-center">
            <Target className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Complete Your Profile</h3>
            <p className="text-muted-foreground mb-4">
              Complete your onboarding to get personalized AI tool recommendations
            </p>
            <button 
              onClick={() => window.location.href = '/onboarding'}
              className="text-primary hover:underline"
            >
              Complete onboarding
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <Card className="gradient-card border-secondary shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <User className="h-5 w-5 text-primary" />
            Your AI Tool Preferences
          </CardTitle>
          <CardDescription>
            Based on your onboarding responses, here are your preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {preferences.role && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Briefcase className="h-4 w-4" />
                  Role
                </div>
                <Badge variant="secondary">{preferences.role}</Badge>
              </div>
            )}

            {preferences.company_size && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Building className="h-4 w-4" />
                  Company Size
                </div>
                <Badge variant="secondary">{preferences.company_size}</Badge>
              </div>
            )}

            {preferences.budget_range && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <DollarSign className="h-4 w-4" />
                  Budget
                </div>
                <Badge variant="secondary">{preferences.budget_range}</Badge>
              </div>
            )}

            {preferences.ai_experience && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Target className="h-4 w-4" />
                  Experience
                </div>
                <Badge variant="secondary">{preferences.ai_experience}</Badge>
              </div>
            )}
          </div>

          {(preferences.goals && preferences.goals.length > 0) && (
            <div className="space-y-3">
              <h4 className="font-medium text-foreground">Your Goals</h4>
              <div className="flex flex-wrap gap-2">
                {preferences.goals.map((goal, index) => (
                  <Badge key={index} variant="outline" className="border-primary/20 text-primary">
                    {goal}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {(preferences.use_cases && preferences.use_cases.length > 0) && (
            <div className="space-y-3">
              <h4 className="font-medium text-foreground">Your Use Cases</h4>
              <div className="flex flex-wrap gap-2">
                {preferences.use_cases.map((useCase, index) => (
                  <Badge key={index} variant="outline" className="border-primary/20 text-primary">
                    {useCase}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {(preferences.preferred_tools && preferences.preferred_tools.length > 0) && (
            <div className="space-y-3">
              <h4 className="font-medium text-foreground">Your Preferred Tools</h4>
              <div className="flex flex-wrap gap-2">
                {preferences.preferred_tools.map((tool, index) => (
                  <Badge key={index} variant="outline" className="border-primary/20 text-primary">
                    {tool}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};