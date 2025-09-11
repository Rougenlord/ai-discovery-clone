import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Navigate, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const OnboardingSteps = {
  ROLE: 0,
  COMPANY: 1,
  EXPERIENCE: 2,
  USE_CASES: 3,
  GOALS: 4,
  TOOLS: 5,
  BUDGET: 6,
};

const TOTAL_STEPS = Object.keys(OnboardingSteps).length;

const Onboarding = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(OnboardingSteps.ROLE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    role: '',
    company: '',
    company_size: '',
    use_cases: [] as string[],
    ai_experience: '',
    goals: [] as string[],
    preferred_tools: [] as string[],
    budget_range: '',
  });

  useEffect(() => {
    // Check if user has already completed onboarding
    if (user) {
      checkOnboardingStatus();
    }
  }, [user]);

  const checkOnboardingStatus = async () => {
    if (!user) return;

    const { data } = await supabase
      .from('onboarding')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (data) {
      // User already completed onboarding, redirect to profile
      navigate('/profile');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleArrayToggle = (field: 'use_cases' | 'goals' | 'preferred_tools', value: string) => {
    const currentArray = formData[field];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    
    setFormData({ ...formData, [field]: newArray });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('onboarding')
        .insert({
          user_id: user.id,
          ...formData
        });

      if (error) throw error;

      // Award achievement for completing onboarding
      await supabase
        .from('user_achievements')
        .insert({
          user_id: user.id,
          achievement_type: 'onboarding',
          achievement_name: 'Welcome Aboard!',
          achievement_description: 'Completed the onboarding process'
        });

      toast({
        title: "Welcome to Genius Dash!",
        description: "Your onboarding is complete. Let's explore AI tools!",
      });

      navigate('/profile');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }

    setIsSubmitting(false);
  };

  const progress = ((currentStep + 1) / TOTAL_STEPS) * 100;

  const isStepValid = () => {
    switch (currentStep) {
      case OnboardingSteps.ROLE:
        return formData.role !== '';
      case OnboardingSteps.COMPANY:
        return formData.company_size !== '';
      case OnboardingSteps.EXPERIENCE:
        return formData.ai_experience !== '';
      case OnboardingSteps.USE_CASES:
        return formData.use_cases.length > 0;
      case OnboardingSteps.GOALS:
        return formData.goals.length > 0;
      case OnboardingSteps.TOOLS:
        return formData.preferred_tools.length > 0;
      case OnboardingSteps.BUDGET:
        return formData.budget_range !== '';
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case OnboardingSteps.ROLE:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">What's your role?</h2>
              <p className="text-muted-foreground">Help us understand how you work with AI</p>
            </div>
            <div className="space-y-3">
              {['developer', 'designer', 'marketer', 'student', 'entrepreneur', 'researcher', 'other'].map((role) => (
                <div key={role} className="flex items-center space-x-2">
                  <Checkbox
                    id={role}
                    checked={formData.role === role}
                    onCheckedChange={() => setFormData({ ...formData, role })}
                  />
                  <Label htmlFor={role} className="capitalize cursor-pointer">
                    {role}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        );

      case OnboardingSteps.COMPANY:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Tell us about your company</h2>
              <p className="text-muted-foreground">This helps us recommend the right tools</p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="company">Company Name (Optional)</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="Enter your company name"
                />
              </div>
              <div className="space-y-2">
                <Label>Company Size</Label>
                <Select value={formData.company_size} onValueChange={(value) => setFormData({ ...formData, company_size: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select company size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-10">1-10 employees</SelectItem>
                    <SelectItem value="11-50">11-50 employees</SelectItem>
                    <SelectItem value="51-200">51-200 employees</SelectItem>
                    <SelectItem value="201-1000">201-1000 employees</SelectItem>
                    <SelectItem value="1000+">1000+ employees</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case OnboardingSteps.EXPERIENCE:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Your AI Experience</h2>
              <p className="text-muted-foreground">How familiar are you with AI tools?</p>
            </div>
            <div className="space-y-3">
              {[
                { value: 'none', label: 'New to AI - just getting started' },
                { value: 'basic', label: 'Basic - used a few AI tools' },
                { value: 'intermediate', label: 'Intermediate - regular AI user' },
                { value: 'advanced', label: 'Advanced - AI power user' }
              ].map(({ value, label }) => (
                <div key={value} className="flex items-center space-x-2">
                  <Checkbox
                    id={value}
                    checked={formData.ai_experience === value}
                    onCheckedChange={() => setFormData({ ...formData, ai_experience: value })}
                  />
                  <Label htmlFor={value} className="cursor-pointer">
                    {label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        );

      case OnboardingSteps.USE_CASES:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">How do you use AI?</h2>
              <p className="text-muted-foreground">Select all that apply</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                'Content Creation', 'Code Generation', 'Data Analysis', 'Design & Graphics',
                'Customer Support', 'Marketing', 'Research', 'Automation',
                'Translation', 'Image Editing', 'Video Production', 'Other'
              ].map((useCase) => (
                <div key={useCase} className="flex items-center space-x-2">
                  <Checkbox
                    id={useCase}
                    checked={formData.use_cases.includes(useCase)}
                    onCheckedChange={() => handleArrayToggle('use_cases', useCase)}
                  />
                  <Label htmlFor={useCase} className="cursor-pointer text-sm">
                    {useCase}
                  </Label>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-1">
              {formData.use_cases.map((useCase) => (
                <Badge key={useCase} variant="secondary">
                  {useCase}
                </Badge>
              ))}
            </div>
          </div>
        );

      case OnboardingSteps.GOALS:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">What are your goals?</h2>
              <p className="text-muted-foreground">What do you want to achieve with AI?</p>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {[
                'Increase productivity', 'Learn new skills', 'Save time on tasks',
                'Improve work quality', 'Automate workflows', 'Stay updated with AI trends',
                'Build AI-powered products', 'Reduce costs'
              ].map((goal) => (
                <div key={goal} className="flex items-center space-x-2">
                  <Checkbox
                    id={goal}
                    checked={formData.goals.includes(goal)}
                    onCheckedChange={() => handleArrayToggle('goals', goal)}
                  />
                  <Label htmlFor={goal} className="cursor-pointer">
                    {goal}
                  </Label>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-1">
              {formData.goals.map((goal) => (
                <Badge key={goal} variant="secondary">
                  {goal}
                </Badge>
              ))}
            </div>
          </div>
        );

      case OnboardingSteps.TOOLS:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Favorite AI tools?</h2>
              <p className="text-muted-foreground">Which tools do you currently use or want to try?</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                'ChatGPT', 'Claude', 'Midjourney', 'DALL-E', 'GitHub Copilot',
                'Notion AI', 'Grammarly', 'Jasper', 'Copy.ai', 'Canva AI',
                'Runway', 'Stable Diffusion', 'Other'
              ].map((tool) => (
                <div key={tool} className="flex items-center space-x-2">
                  <Checkbox
                    id={tool}
                    checked={formData.preferred_tools.includes(tool)}
                    onCheckedChange={() => handleArrayToggle('preferred_tools', tool)}
                  />
                  <Label htmlFor={tool} className="cursor-pointer text-sm">
                    {tool}
                  </Label>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-1">
              {formData.preferred_tools.map((tool) => (
                <Badge key={tool} variant="secondary">
                  {tool}
                </Badge>
              ))}
            </div>
          </div>
        );

      case OnboardingSteps.BUDGET:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">What's your budget?</h2>
              <p className="text-muted-foreground">Monthly budget for AI tools</p>
            </div>
            <div className="space-y-3">
              {[
                { value: 'free', label: 'Free tools only' },
                { value: 'under-50', label: 'Under $50/month' },
                { value: '50-200', label: '$50 - $200/month' },
                { value: '200-500', label: '$200 - $500/month' },
                { value: '500+', label: '$500+/month' }
              ].map(({ value, label }) => (
                <div key={value} className="flex items-center space-x-2">
                  <Checkbox
                    id={value}
                    checked={formData.budget_range === value}
                    onCheckedChange={() => setFormData({ ...formData, budget_range: value })}
                  />
                  <Label htmlFor={value} className="cursor-pointer">
                    {label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Brain className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Genius Dash
            </span>
          </div>
          <div className="flex items-center justify-center gap-1 mb-6">
            <Sparkles className="h-4 w-4 text-primary" />
            <p className="text-muted-foreground">Let's personalize your AI journey</p>
          </div>
          <Progress value={progress} className="w-full" />
          <p className="text-sm text-muted-foreground mt-2">
            Step {currentStep + 1} of {TOTAL_STEPS}
          </p>
        </div>

        <Card className="border-primary/20 shadow-xl">
          <CardContent className="p-8">
            {renderStep()}
          </CardContent>
        </Card>

        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          {currentStep === TOTAL_STEPS - 1 ? (
            <Button
              onClick={handleSubmit}
              disabled={!isStepValid() || isSubmitting}
              className="flex items-center gap-2"
            >
              {isSubmitting ? 'Completing...' : 'Complete Setup'}
              <Sparkles className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              disabled={!isStepValid()}
              className="flex items-center gap-2"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;