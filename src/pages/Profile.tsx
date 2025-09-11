import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Navigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Settings, Trophy, Upload, Brain, MapPin, Globe, Twitter, Linkedin, Github } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const { user, loading, signOut, updateProfile } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<any>(null);
  const [onboarding, setOnboarding] = useState<any>(null);
  const [submittedTools, setSubmittedTools] = useState<any[]>([]);
  const [achievements, setAchievements] = useState<any[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [profileForm, setProfileForm] = useState({
    full_name: '',
    bio: '',
    location: '',
    website: '',
    twitter_handle: '',
    linkedin_url: '',
    github_url: ''
  });

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    if (!user) return;

    // Fetch profile
    const { data: profileData } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (profileData) {
      setProfile(profileData);
      setProfileForm({
        full_name: profileData.full_name || '',
        bio: profileData.bio || '',
        location: profileData.location || '',
        website: profileData.website || '',
        twitter_handle: profileData.twitter_handle || '',
        linkedin_url: profileData.linkedin_url || '',
        github_url: profileData.github_url || ''
      });
    }

    // Fetch onboarding data
    const { data: onboardingData } = await supabase
      .from('onboarding')
      .select('*')
      .eq('user_id', user.id)
      .single();

    setOnboarding(onboardingData);

    // Fetch submitted tools
    const { data: toolsData } = await supabase
      .from('user_submitted_tools')
      .select('*')
      .eq('user_id', user.id)
      .order('submitted_at', { ascending: false });

    setSubmittedTools(toolsData || []);

    // Fetch achievements
    const { data: achievementsData } = await supabase
      .from('user_achievements')
      .select('*')
      .eq('user_id', user.id)
      .order('earned_at', { ascending: false });

    setAchievements(achievementsData || []);
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);

    const { error } = await updateProfile(profileForm);
    
    if (!error) {
      await fetchUserData();
    }

    setIsUpdating(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-background/80 flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <div className="container mx-auto py-8 px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={profile?.avatar_url} />
              <AvatarFallback className="bg-primary/10 text-primary text-lg font-semibold">
                {profile?.full_name?.charAt(0) || user.email?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                {profile?.full_name || 'User'}
                <Brain className="h-6 w-6 text-primary" />
              </h1>
              <p className="text-muted-foreground">@{profile?.username}</p>
              {profile?.bio && (
                <p className="text-sm text-muted-foreground mt-1">{profile.bio}</p>
              )}
            </div>
          </div>
          <Button onClick={signOut} variant="outline">
            Sign Out
          </Button>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="tools" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              My Tools
            </TabsTrigger>
            <TabsTrigger value="achievements" className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              Achievements
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Stats Cards */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Tools Submitted</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">{submittedTools.length}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Approved Tools</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">
                    {submittedTools.filter(tool => tool.status === 'approved').length}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Achievements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-yellow-600">{achievements.length}</div>
                </CardContent>
              </Card>
            </div>

            {/* Onboarding Info */}
            {onboarding && (
              <Card>
                <CardHeader>
                  <CardTitle>Your Profile</CardTitle>
                  <CardDescription>Information from your onboarding</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Role</Label>
                      <p className="capitalize">{onboarding.role}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">AI Experience</Label>
                      <p className="capitalize">{onboarding.ai_experience}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Company Size</Label>
                      <p>{onboarding.company_size} employees</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Budget Range</Label>
                      <p className="capitalize">{onboarding.budget_range?.replace('-', ' - $')}</p>
                    </div>
                  </div>
                  {onboarding.use_cases && (
                    <div>
                      <Label className="text-sm font-medium">Use Cases</Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {onboarding.use_cases.map((useCase: string, index: number) => (
                          <Badge key={index} variant="secondary">{useCase}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {!onboarding && (
              <Card>
                <CardHeader>
                  <CardTitle>Complete Your Profile</CardTitle>
                  <CardDescription>
                    Help us personalize your experience by completing your onboarding
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => window.location.href = '/onboarding'}>
                    Complete Onboarding
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="tools" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Submitted Tools</CardTitle>
                <CardDescription>
                  Tools you've submitted to Genius Dash
                </CardDescription>
              </CardHeader>
              <CardContent>
                {submittedTools.length === 0 ? (
                  <div className="text-center py-8">
                    <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No tools submitted yet</p>
                    <Button onClick={() => document.getElementById('submit-tool')?.scrollIntoView({ behavior: 'smooth' })} className="mt-4">
                      Submit Your First Tool
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {submittedTools.map((tool) => (
                      <div key={tool.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold">{tool.name}</h3>
                            <p className="text-sm text-muted-foreground mt-1">{tool.description}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="outline">{tool.category}</Badge>
                              <Badge variant="outline">{tool.pricing}</Badge>
                            </div>
                          </div>
                          <Badge className={getStatusColor(tool.status)}>
                            {tool.status}
                          </Badge>
                        </div>
                        {tool.rejection_reason && (
                          <div className="mt-3 p-3 bg-red-50 rounded-md">
                            <p className="text-sm text-red-800">
                              <strong>Rejection Reason:</strong> {tool.rejection_reason}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Achievements</CardTitle>
                <CardDescription>
                  Badges you've earned on your AI journey
                </CardDescription>
              </CardHeader>
              <CardContent>
                {achievements.length === 0 ? (
                  <div className="text-center py-8">
                    <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No achievements yet</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Submit tools and engage with the community to earn achievements!
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {achievements.map((achievement) => (
                      <div key={achievement.id} className="border rounded-lg p-4 flex items-center gap-3">
                        <Trophy className="h-8 w-8 text-yellow-500" />
                        <div>
                          <h3 className="font-semibold">{achievement.achievement_name}</h3>
                          <p className="text-sm text-muted-foreground">{achievement.achievement_description}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Earned {new Date(achievement.earned_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>
                  Update your profile information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="full_name">Full Name</Label>
                      <Input
                        id="full_name"
                        value={profileForm.full_name}
                        onChange={(e) => setProfileForm({ ...profileForm, full_name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">
                        <MapPin className="h-4 w-4 inline mr-1" />
                        Location
                      </Label>
                      <Input
                        id="location"
                        value={profileForm.location}
                        onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                        placeholder="City, Country"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={profileForm.bio}
                      onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                      placeholder="Tell us about yourself..."
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">
                      <Globe className="h-4 w-4 inline mr-1" />
                      Website
                    </Label>
                    <Input
                      id="website"
                      type="url"
                      value={profileForm.website}
                      onChange={(e) => setProfileForm({ ...profileForm, website: e.target.value })}
                      placeholder="https://yourwebsite.com"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="twitter_handle">
                        <Twitter className="h-4 w-4 inline mr-1" />
                        Twitter
                      </Label>
                      <Input
                        id="twitter_handle"
                        value={profileForm.twitter_handle}
                        onChange={(e) => setProfileForm({ ...profileForm, twitter_handle: e.target.value })}
                        placeholder="@username"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="linkedin_url">
                        <Linkedin className="h-4 w-4 inline mr-1" />
                        LinkedIn
                      </Label>
                      <Input
                        id="linkedin_url"
                        type="url"
                        value={profileForm.linkedin_url}
                        onChange={(e) => setProfileForm({ ...profileForm, linkedin_url: e.target.value })}
                        placeholder="LinkedIn profile URL"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="github_url">
                        <Github className="h-4 w-4 inline mr-1" />
                        GitHub
                      </Label>
                      <Input
                        id="github_url"
                        type="url"
                        value={profileForm.github_url}
                        onChange={(e) => setProfileForm({ ...profileForm, github_url: e.target.value })}
                        placeholder="GitHub profile URL"
                      />
                    </div>
                  </div>

                  <Button type="submit" disabled={isUpdating}>
                    {isUpdating ? 'Updating...' : 'Update Profile'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;