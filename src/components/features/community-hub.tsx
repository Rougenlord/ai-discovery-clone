import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageCircle, ThumbsUp, ThumbsDown, Star, TrendingUp, Users, Send, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Review {
  id: string;
  toolName: string;
  userName: string;
  userAvatar: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  likes: number;
  dislikes: number;
  helpful: number;
  category: string;
  verified: boolean;
}

interface Discussion {
  id: string;
  title: string;
  content: string;
  userName: string;
  userAvatar: string;
  date: string;
  replies: number;
  likes: number;
  category: string;
  tags: string[];
}

const reviews: Review[] = [
  {
    id: "1",
    toolName: "ChatGPT",
    userName: "Sarah Chen",
    userAvatar: "/placeholder.svg",
    rating: 5,
    title: "Game-changer for content creation",
    content: "I've been using ChatGPT for 6 months now, and it has completely transformed my writing workflow. The quality of responses has improved significantly, and the new features make it even more versatile.",
    date: "2024-01-15",
    likes: 124,
    dislikes: 3,
    helpful: 89,
    category: "Chatbots",
    verified: true
  },
  {
    id: "2",
    toolName: "Midjourney",
    userName: "Alex Rodriguez",
    userAvatar: "/placeholder.svg",
    rating: 4,
    title: "Incredible image quality but steep learning curve",
    content: "The image quality is absolutely stunning, but it takes time to master the prompting. Worth the effort though - the results are mind-blowing.",
    date: "2024-01-14",
    likes: 87,
    dislikes: 12,
    helpful: 65,
    category: "Image Generation",
    verified: true
  },
  {
    id: "3",
    toolName: "GitHub Copilot",
    userName: "Emma Wilson",
    userAvatar: "/placeholder.svg",
    rating: 5,
    title: "Essential for developers",
    content: "Copilot has become an indispensable part of my development workflow. It saves hours of coding time and helps with complex algorithms.",
    date: "2024-01-13",
    likes: 156,
    dislikes: 8,
    helpful: 142,
    category: "Code Generation",
    verified: true
  }
];

const discussions: Discussion[] = [
  {
    id: "1",
    title: "Best AI tools for small business automation?",
    content: "Looking for recommendations on AI tools that can help automate repetitive tasks for small businesses. Budget is tight, so free or low-cost options preferred.",
    userName: "Mike Johnson",
    userAvatar: "/placeholder.svg",
    date: "2024-01-16",
    replies: 23,
    likes: 45,
    category: "Business",
    tags: ["automation", "small-business", "budget-friendly"]
  },
  {
    id: "2",
    title: "ChatGPT vs Claude vs Gemini - Which is better for coding?",
    content: "I've been testing all three for programming tasks. Here's my detailed comparison after 30 days of use...",
    userName: "David Kim",
    userAvatar: "/placeholder.svg",
    date: "2024-01-15",
    replies: 67,
    likes: 134,
    category: "Development",
    tags: ["comparison", "coding", "chatbots"]
  },
  {
    id: "3",
    title: "AI image generation copyright concerns",
    content: "What are the current legal implications of using AI-generated images for commercial purposes? Any updates on recent cases?",
    userName: "Lisa Martinez",
    userAvatar: "/placeholder.svg",
    date: "2024-01-14",
    replies: 34,
    likes: 78,
    category: "Legal",
    tags: ["copyright", "legal", "commercial-use"]
  }
];

export const CommunityHub = () => {
  const [selectedTab, setSelectedTab] = useState("reviews");
  const [newReview, setNewReview] = useState("");
  const [newDiscussion, setNewDiscussion] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [sortBy, setSortBy] = useState("recent");
  const { toast } = useToast();

  const categories = ["All", "Chatbots", "Image Generation", "Code Generation", "Content Creation", "Business", "Development", "Legal"];

  const submitReview = () => {
    if (!newReview.trim()) {
      toast({
        title: "Error",
        description: "Please write a review",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Review submitted successfully!",
    });
    setNewReview("");
  };

  const submitDiscussion = () => {
    if (!newDiscussion.trim()) {
      toast({
        title: "Error",
        description: "Please write your discussion topic",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Discussion started successfully!",
    });
    setNewDiscussion("");
  };

  const filteredReviews = reviews.filter(review => 
    filterCategory === "All" || review.category === filterCategory
  );

  const filteredDiscussions = discussions.filter(discussion => 
    filterCategory === "All" || discussion.category === filterCategory
  );

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <section className="py-16 px-4">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Users className="h-8 w-8 text-primary" />
            <h2 className="text-4xl font-bold text-foreground">
              Community Hub
            </h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Connect with fellow AI enthusiasts, share reviews, and discover insights from the community
          </p>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="discussions">Discussions</TabsTrigger>
            <TabsTrigger value="share">Share Review</TabsTrigger>
            <TabsTrigger value="ask">Ask Community</TabsTrigger>
          </TabsList>

          <TabsContent value="reviews" className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  User Reviews
                </h3>
                <p className="text-muted-foreground">
                  Real experiences from our community
                </p>
              </div>
              <div className="flex gap-3">
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Most Recent</SelectItem>
                    <SelectItem value="helpful">Most Helpful</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredReviews.map((review) => (
                <Card key={review.id} className="gradient-card border-secondary hover:shadow-glow transition-smooth">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={review.userAvatar} alt={review.userName} />
                          <AvatarFallback>{review.userName[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-foreground">{review.userName}</h4>
                            {review.verified && (
                              <Badge variant="default" className="text-xs">
                                Verified
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{review.date}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {review.toolName}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        {renderStars(review.rating)}
                        <span className="text-sm font-medium text-foreground">{review.rating}/5</span>
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">{review.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {review.content}
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-secondary">
                      <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          {review.likes}
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          <ThumbsDown className="h-4 w-4 mr-1" />
                          {review.dislikes}
                        </Button>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {review.helpful} found helpful
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="discussions" className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  Community Discussions
                </h3>
                <p className="text-muted-foreground">
                  Join conversations about AI tools and trends
                </p>
              </div>
              <div className="flex gap-3">
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Category" />
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
            </div>

            <div className="space-y-4">
              {filteredDiscussions.map((discussion) => (
                <Card key={discussion.id} className="gradient-card border-secondary hover:shadow-glow transition-smooth cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={discussion.userAvatar} alt={discussion.userName} />
                        <AvatarFallback>{discussion.userName[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-foreground text-lg mb-1">
                              {discussion.title}
                            </h3>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                              <span>{discussion.userName}</span>
                              <span>•</span>
                              <span>{discussion.date}</span>
                              <Badge variant="outline" className="text-xs">
                                {discussion.category}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <p className="text-muted-foreground mb-4 line-clamp-2">
                          {discussion.content}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <MessageCircle className="h-4 w-4" />
                              <span>{discussion.replies} replies</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <ThumbsUp className="h-4 w-4" />
                              <span>{discussion.likes}</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            {discussion.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="share" className="space-y-6">
            <Card className="gradient-card border-secondary max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-2xl text-foreground">
                  Share Your Review
                </CardTitle>
                <CardDescription>
                  Help others by sharing your experience with AI tools
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Tool Name</label>
                  <Input placeholder="Which AI tool are you reviewing?" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Rating</label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="h-6 w-6 cursor-pointer hover:fill-yellow-400 hover:text-yellow-400 transition-colors"
                      />
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Review Title</label>
                  <Input placeholder="Summarize your experience" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Your Review</label>
                  <Textarea 
                    placeholder="Share your detailed experience, pros and cons, and any tips for other users..."
                    value={newReview}
                    onChange={(e) => setNewReview(e.target.value)}
                    rows={6}
                  />
                </div>
                <Button onClick={submitReview} className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  Submit Review
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ask" className="space-y-6">
            <Card className="gradient-card border-secondary max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-2xl text-foreground">
                  Start a Discussion
                </CardTitle>
                <CardDescription>
                  Ask questions, share insights, or start conversations with the community
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Discussion Title</label>
                  <Input placeholder="What would you like to discuss?" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Category</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.filter(c => c !== "All").map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Description</label>
                  <Textarea 
                    placeholder="Provide more details about your question or topic..."
                    value={newDiscussion}
                    onChange={(e) => setNewDiscussion(e.target.value)}
                    rows={6}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Tags</label>
                  <Input placeholder="Add relevant tags (comma separated)" />
                </div>
                <Button onClick={submitDiscussion} className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  Start Discussion
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};