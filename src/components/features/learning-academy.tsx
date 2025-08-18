import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GraduationCap, Play, Clock, Users, Star, BookOpen, Award, Target } from "lucide-react";

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  lessons: number;
  students: string;
  rating: number;
  price: "Free" | "Premium";
  thumbnail: string;
  tags: string[];
  progress?: number;
  completed?: boolean;
}

interface Tutorial {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  difficulty: "Easy" | "Medium" | "Hard";
  views: string;
  rating: number;
  tags: string[];
}

const courses: Course[] = [
  {
    id: "1",
    title: "Complete Guide to ChatGPT for Business",
    description: "Master ChatGPT for business applications, from customer service to content creation and automation.",
    instructor: "Sarah Johnson",
    category: "Business",
    level: "Beginner",
    duration: "4 hours",
    lessons: 12,
    students: "2.5K",
    rating: 4.8,
    price: "Premium",
    thumbnail: "/placeholder.svg",
    tags: ["chatgpt", "business", "automation"],
    progress: 65,
    completed: false
  },
  {
    id: "2",
    title: "AI Image Generation Masterclass",
    description: "Learn to create stunning images with Midjourney, DALL-E, and Stable Diffusion.",
    instructor: "Alex Chen",
    category: "Creative",
    level: "Intermediate",
    duration: "6 hours",
    lessons: 18,
    students: "1.8K",
    rating: 4.9,
    price: "Premium",
    thumbnail: "/placeholder.svg",
    tags: ["midjourney", "dall-e", "image-generation"],
    progress: 0,
    completed: false
  },
  {
    id: "3",
    title: "Introduction to AI Tools",
    description: "A comprehensive overview of AI tools and how to choose the right ones for your needs.",
    instructor: "Mike Rodriguez",
    category: "General",
    level: "Beginner",
    duration: "2 hours",
    lessons: 8,
    students: "5.2K",
    rating: 4.6,
    price: "Free",
    thumbnail: "/placeholder.svg",
    tags: ["ai-basics", "tools", "overview"],
    progress: 100,
    completed: true
  },
  {
    id: "4",
    title: "Advanced Prompt Engineering",
    description: "Master the art of prompt engineering for better AI outputs and more effective interactions.",
    instructor: "Dr. Emma Wilson",
    category: "Technical",
    level: "Advanced",
    duration: "5 hours",
    lessons: 15,
    students: "950",
    rating: 4.7,
    price: "Premium",
    thumbnail: "/placeholder.svg",
    tags: ["prompt-engineering", "advanced", "optimization"],
    progress: 25,
    completed: false
  },
  {
    id: "5",
    title: "AI for Content Creators",
    description: "Leverage AI tools to streamline your content creation workflow and boost productivity.",
    instructor: "Lisa Martinez",
    category: "Content",
    level: "Intermediate",
    duration: "3.5 hours",
    lessons: 11,
    students: "3.1K",
    rating: 4.5,
    price: "Free",
    thumbnail: "/placeholder.svg",
    tags: ["content-creation", "productivity", "workflow"],
    progress: 0,
    completed: false
  },
  {
    id: "6",
    title: "Building AI-Powered Apps",
    description: "Learn to integrate AI APIs and build intelligent applications with real-world projects.",
    instructor: "David Kim",
    category: "Development",
    level: "Advanced",
    duration: "8 hours",
    lessons: 24,
    students: "720",
    rating: 4.8,
    price: "Premium",
    thumbnail: "/placeholder.svg",
    tags: ["development", "apis", "integration"],
    progress: 0,
    completed: false
  }
];

const tutorials: Tutorial[] = [
  {
    id: "1",
    title: "Getting Started with ChatGPT: Your First Conversation",
    description: "Learn the basics of interacting with ChatGPT and getting useful responses.",
    category: "Beginner",
    duration: "15 min",
    difficulty: "Easy",
    views: "125K",
    rating: 4.7,
    tags: ["chatgpt", "beginner", "basics"]
  },
  {
    id: "2",
    title: "10 Midjourney Prompts That Will Blow Your Mind",
    description: "Discover powerful prompting techniques for creating stunning AI-generated images.",
    category: "Creative",
    duration: "22 min",
    difficulty: "Medium",
    views: "89K",
    rating: 4.8,
    tags: ["midjourney", "prompts", "creative"]
  },
  {
    id: "3",
    title: "Automating Email Responses with AI",
    description: "Set up AI-powered email automation to save time and improve customer service.",
    category: "Business",
    duration: "18 min",
    difficulty: "Medium",
    views: "67K",
    rating: 4.6,
    tags: ["automation", "email", "customer-service"]
  },
  {
    id: "4",
    title: "Advanced GitHub Copilot Techniques",
    description: "Master advanced features of GitHub Copilot for more efficient coding.",
    category: "Development",
    duration: "25 min",
    difficulty: "Hard",
    views: "45K",
    rating: 4.9,
    tags: ["github-copilot", "coding", "development"]
  }
];

const categories = ["All", "Business", "Creative", "Technical", "Content", "Development", "General"];
const levels = ["All", "Beginner", "Intermediate", "Advanced"];
const prices = ["All", "Free", "Premium"];

export const LearningAcademy = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState("All");

  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
    const matchesLevel = selectedLevel === "All" || course.level === selectedLevel;
    const matchesPrice = selectedPrice === "All" || course.price === selectedPrice;

    return matchesCategory && matchesLevel && matchesPrice;
  });

  const myCourses = courses.filter(course => course.progress !== undefined);

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner": return "text-green-500";
      case "Intermediate": return "text-yellow-500";
      case "Advanced": return "text-red-500";
      default: return "text-muted-foreground";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "text-green-500";
      case "Medium": return "text-yellow-500";
      case "Hard": return "text-red-500";
      default: return "text-muted-foreground";
    }
  };

  const CourseCard = ({ course }: { course: Course }) => (
    <Card className="gradient-card border-secondary hover:shadow-glow transition-smooth">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg text-foreground line-clamp-2 mb-2">
              {course.title}
            </CardTitle>
            <CardDescription className="text-sm mb-3">
              by {course.instructor}
            </CardDescription>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="text-xs">
                {course.category}
              </Badge>
              <Badge 
                variant="secondary" 
                className={`text-xs ${getLevelColor(course.level)}`}
              >
                {course.level}
              </Badge>
              <Badge 
                variant={course.price === "Free" ? "default" : "secondary"}
                className="text-xs"
              >
                {course.price}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {course.description}
        </p>

        {course.progress !== undefined && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="text-foreground font-medium">{course.progress}%</span>
            </div>
            <Progress value={course.progress} className="h-2" />
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <BookOpen className="h-4 w-4" />
            <span>{course.lessons} lessons</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{course.students} students</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span>{course.rating}</span>
          </div>
        </div>

        <div className="flex gap-2">
          {course.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <Button className="w-full">
          <Play className="h-4 w-4 mr-2" />
          {course.progress !== undefined 
            ? course.completed 
              ? "Review Course" 
              : "Continue Learning"
            : "Start Course"
          }
        </Button>
      </CardContent>
    </Card>
  );

  const TutorialCard = ({ tutorial }: { tutorial: Tutorial }) => (
    <Card className="gradient-card border-secondary hover:shadow-glow transition-smooth">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg text-foreground line-clamp-2 mb-2">
              {tutorial.title}
            </CardTitle>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="text-xs">
                {tutorial.category}
              </Badge>
              <Badge 
                variant="secondary" 
                className={`text-xs ${getDifficultyColor(tutorial.difficulty)}`}
              >
                {tutorial.difficulty}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {tutorial.description}
        </p>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{tutorial.duration}</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{tutorial.views} views</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span>{tutorial.rating}</span>
          </div>
        </div>

        <div className="flex gap-2">
          {tutorial.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <Button className="w-full">
          <Play className="h-4 w-4 mr-2" />
          Watch Tutorial
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <section className="py-16 px-4">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <GraduationCap className="h-8 w-8 text-primary" />
            <h2 className="text-4xl font-bold text-foreground">
              AI Learning Academy
            </h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Master AI tools with expert-led courses, tutorials, and hands-on projects. From beginner to advanced.
          </p>
        </div>

        <Tabs defaultValue="courses" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="courses">All Courses</TabsTrigger>
            <TabsTrigger value="my-courses">My Learning</TabsTrigger>
            <TabsTrigger value="tutorials">Quick Tutorials</TabsTrigger>
            <TabsTrigger value="paths">Learning Paths</TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="space-y-6">
            {/* Filters */}
            <Card className="gradient-card border-secondary">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Category</label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger>
                        <SelectValue />
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
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Level</label>
                    <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {levels.map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Price</label>
                    <Select value={selectedPrice} onValueChange={setSelectedPrice}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {prices.map((price) => (
                          <SelectItem key={price} value={price}>
                            {price}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-end">
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => {
                        setSelectedCategory("All");
                        setSelectedLevel("All");
                        setSelectedPrice("All");
                      }}
                    >
                      Clear Filters
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="my-courses" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="gradient-card border-secondary">
                <CardContent className="p-6 text-center">
                  <BookOpen className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-foreground">
                    {myCourses.length}
                  </div>
                  <div className="text-sm text-muted-foreground">Enrolled Courses</div>
                </CardContent>
              </Card>
              <Card className="gradient-card border-secondary">
                <CardContent className="p-6 text-center">
                  <Award className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-foreground">
                    {myCourses.filter(c => c.completed).length}
                  </div>
                  <div className="text-sm text-muted-foreground">Completed</div>
                </CardContent>
              </Card>
              <Card className="gradient-card border-secondary">
                <CardContent className="p-6 text-center">
                  <Target className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-foreground">
                    {Math.round(myCourses.reduce((acc, c) => acc + (c.progress || 0), 0) / myCourses.length) || 0}%
                  </div>
                  <div className="text-sm text-muted-foreground">Avg. Progress</div>
                </CardContent>
              </Card>
            </div>

            {myCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <GraduationCap className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Start Your Learning Journey
                </h3>
                <p className="text-muted-foreground mb-6">
                  Enroll in courses to track your progress and earn certificates
                </p>
                <Button>Browse All Courses</Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="tutorials" className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Quick Start Tutorials
              </h3>
              <p className="text-muted-foreground">
                Short, focused tutorials to get you started quickly
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tutorials.map((tutorial) => (
                <TutorialCard key={tutorial.id} tutorial={tutorial} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="paths" className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Structured Learning Paths
              </h3>
              <p className="text-muted-foreground">
                Follow curated learning paths to master specific skills
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="gradient-card border-secondary">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                      <Target className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl text-foreground">
                        Business AI Mastery
                      </CardTitle>
                      <CardDescription>
                        Complete path for business professionals
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-sm text-muted-foreground">
                    4 courses • 16 hours • Beginner to Advanced
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <span>Introduction to AI Tools</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">2</span>
                      </div>
                      <span>ChatGPT for Business</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-4 h-4 bg-secondary rounded-full flex items-center justify-center">
                        <span className="text-xs">3</span>
                      </div>
                      <span>AI Content Strategy</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-4 h-4 bg-secondary rounded-full flex items-center justify-center">
                        <span className="text-xs">4</span>
                      </div>
                      <span>AI Implementation & ROI</span>
                    </div>
                  </div>
                  <Button className="w-full">Continue Path</Button>
                </CardContent>
              </Card>

              <Card className="gradient-card border-secondary">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                      <GraduationCap className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl text-foreground">
                        Creative AI Specialist
                      </CardTitle>
                      <CardDescription>
                        Master AI tools for creative work
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-sm text-muted-foreground">
                    5 courses • 20 hours • Intermediate to Advanced
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-4 h-4 bg-secondary rounded-full flex items-center justify-center">
                        <span className="text-xs">1</span>
                      </div>
                      <span>AI Image Generation Fundamentals</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-4 h-4 bg-secondary rounded-full flex items-center justify-center">
                        <span className="text-xs">2</span>
                      </div>
                      <span>Advanced Midjourney Techniques</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-4 h-4 bg-secondary rounded-full flex items-center justify-center">
                        <span className="text-xs">3</span>
                      </div>
                      <span>AI Video Creation</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-4 h-4 bg-secondary rounded-full flex items-center justify-center">
                        <span className="text-xs">4</span>
                      </div>
                      <span>Creative Workflow Automation</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-4 h-4 bg-secondary rounded-full flex items-center justify-center">
                        <span className="text-xs">5</span>
                      </div>
                      <span>Building Creative AI Portfolio</span>
                    </div>
                  </div>
                  <Button className="w-full">Start Path</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};