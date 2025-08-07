import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Send, Plus, X } from "lucide-react";
import { categories, priceFilters } from "@/data/ai-tools";

export const SubmitTool = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    url: "",
    category: "",
    price: "",
    email: "",
    additionalInfo: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim()) && tags.length < 5) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: "Tool Submitted Successfully!",
      description: "Thank you for your submission. We'll review it within 24-48 hours.",
      duration: 5000,
    });

    // Reset form
    setFormData({
      name: "",
      description: "",
      url: "",
      category: "",
      price: "",
      email: "",
      additionalInfo: ""
    });
    setTags([]);
    setIsSubmitting(false);
  };

  const isFormValid = formData.name && formData.description && formData.url && 
                     formData.category && formData.price && formData.email;

  return (
    <section className="py-16 px-4">
      <div className="container max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Submit Your AI Tool
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Share your AI tool with our community of 2.5M+ users. Get featured in the world's largest AI tools directory.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Submission Form */}
          <div className="lg:col-span-2">
            <Card className="gradient-card border-secondary shadow-card">
              <CardHeader>
                <CardTitle className="text-2xl text-foreground">Tool Information</CardTitle>
                <CardDescription>
                  Provide detailed information about your AI tool to help users discover it.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Basic Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Tool Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="e.g., ChatGPT, Midjourney"
                        className="bg-secondary/50 border-secondary hover:border-primary/50 focus:border-primary"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="url">Tool Website *</Label>
                      <Input
                        id="url"
                        type="url"
                        value={formData.url}
                        onChange={(e) => handleInputChange("url", e.target.value)}
                        placeholder="https://example.com"
                        className="bg-secondary/50 border-secondary hover:border-primary/50 focus:border-primary"
                        required
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      placeholder="Describe what your AI tool does, its key features, and how it helps users..."
                      className="bg-secondary/50 border-secondary hover:border-primary/50 focus:border-primary min-h-[120px]"
                      required
                    />
                    <div className="text-xs text-muted-foreground">
                      {formData.description.length}/500 characters
                    </div>
                  </div>

                  {/* Category and Pricing */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category *</Label>
                      <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                        <SelectTrigger className="bg-secondary/50 border-secondary hover:border-primary/50">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.filter(cat => cat !== "All").map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="price">Pricing Model *</Label>
                      <Select value={formData.price} onValueChange={(value) => handleInputChange("price", value)}>
                        <SelectTrigger className="bg-secondary/50 border-secondary hover:border-primary/50">
                          <SelectValue placeholder="Select pricing" />
                        </SelectTrigger>
                        <SelectContent>
                          {priceFilters.filter(price => price !== "All").map((price) => (
                            <SelectItem key={price} value={price}>
                              {price}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="space-y-2">
                    <Label>Tags (max 5)</Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                          {tag}
                          <X 
                            className="h-3 w-3 cursor-pointer hover:text-destructive" 
                            onClick={() => removeTag(tag)}
                          />
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        value={currentTag}
                        onChange={(e) => setCurrentTag(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Add tags (e.g., writing, productivity)"
                        className="bg-secondary/50 border-secondary hover:border-primary/50 focus:border-primary"
                        disabled={tags.length >= 5}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={addTag}
                        disabled={!currentTag.trim() || tags.length >= 5}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-2">
                    <Label htmlFor="email">Contact Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="your@email.com"
                      className="bg-secondary/50 border-secondary hover:border-primary/50 focus:border-primary"
                      required
                    />
                  </div>

                  {/* Additional Information */}
                  <div className="space-y-2">
                    <Label htmlFor="additionalInfo">Additional Information</Label>
                    <Textarea
                      id="additionalInfo"
                      value={formData.additionalInfo}
                      onChange={(e) => handleInputChange("additionalInfo", e.target.value)}
                      placeholder="Any additional information, special features, or notes about your tool..."
                      className="bg-secondary/50 border-secondary hover:border-primary/50 focus:border-primary"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={!isFormValid || isSubmitting}
                    className="w-full gradient-button shadow-button hover:shadow-glow hover:scale-105 transition-smooth text-lg py-3"
                  >
                    {isSubmitting ? (
                      "Submitting..."
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-2" />
                        Submit Tool for Review
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Submission Guidelines */}
          <div className="space-y-6">
            <Card className="gradient-card border-secondary shadow-card">
              <CardHeader>
                <CardTitle className="text-lg text-foreground">Submission Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-foreground">✅ What we accept:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Functional AI-powered tools</li>
                    <li>• Public or freemium access</li>
                    <li>• Original and innovative features</li>
                    <li>• Professional websites</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-foreground">❌ What we don't accept:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Broken or offline tools</li>
                    <li>• Duplicate submissions</li>
                    <li>• Inappropriate content</li>
                    <li>• Spam or low-quality tools</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="gradient-card border-secondary shadow-card">
              <CardHeader>
                <CardTitle className="text-lg text-foreground">Review Process</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">1</div>
                  <div>
                    <div className="font-medium text-foreground">Submission</div>
                    <div className="text-sm text-muted-foreground">Submit your tool via this form</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">2</div>
                  <div>
                    <div className="font-medium text-foreground">Review</div>
                    <div className="text-sm text-muted-foreground">Our team reviews within 24-48 hours</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">3</div>
                  <div>
                    <div className="font-medium text-foreground">Publication</div>
                    <div className="text-sm text-muted-foreground">Approved tools go live immediately</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};