import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { aiTools } from "@/data/ai-tools";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface UserPreferences {
  workType: string;
  experience: string;
  interests: string[];
  budget: string;
  goals: string[];
}

const PERSONALITY_QUESTIONS = [
  {
    id: "workType",
    question: "What best describes your work or main focus area?",
    options: [
      "Creative Professional (Design, Writing, Media)",
      "Developer/Technical",
      "Business/Marketing",
      "Student/Researcher",
      "Content Creator",
      "Entrepreneur",
      "Other"
    ]
  },
  {
    id: "experience",
    question: "How would you rate your experience with AI tools?",
    options: [
      "Complete beginner - I'm just getting started",
      "Some experience - I've tried a few tools",
      "Intermediate - I use AI tools regularly",
      "Advanced - I'm very familiar with AI capabilities"
    ]
  },
  {
    id: "interests",
    question: "Which areas interest you most? (Select all that apply)",
    options: [
      "Writing & Content",
      "Image & Video Creation",
      "Coding & Development",
      "Data Analysis",
      "Productivity & Automation",
      "Learning & Education",
      "Business & Marketing"
    ],
    multiple: true
  },
  {
    id: "budget",
    question: "What's your preferred pricing model?",
    options: [
      "Free tools only",
      "Freemium (free with paid upgrades)",
      "Affordable paid tools ($1-20/month)",
      "Premium tools ($20+ per month)",
      "No preference"
    ]
  },
  {
    id: "goals",
    question: "What are your main goals with AI tools? (Select all that apply)",
    options: [
      "Save time on repetitive tasks",
      "Improve work quality",
      "Learn new skills",
      "Increase productivity",
      "Create better content",
      "Automate workflows",
      "Stay current with technology"
    ],
    multiple: true
  }
];

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! I'm your AI assistant at Genius Dash. I'll ask you a few quick questions to understand your needs and recommend the perfect AI tools for you. Ready to get started?",
      sender: "bot",
      timestamp: new Date()
    }
  ]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userPreferences, setUserPreferences] = useState<Partial<UserPreferences>>({});
  const [isQuestionsComplete, setIsQuestionsComplete] = useState(false);
  const [userInput, setUserInput] = useState("");

  const addMessage = (text: string, sender: "user" | "bot") => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleQuestionAnswer = (answer: string | string[]) => {
    const currentQuestion = PERSONALITY_QUESTIONS[currentQuestionIndex];
    
    // Add user's answer as message
    const answerText = Array.isArray(answer) ? answer.join(", ") : answer;
    addMessage(answerText, "user");

    // Update preferences
    setUserPreferences(prev => ({
      ...prev,
      [currentQuestion.id]: answer
    }));

    // Move to next question or complete
    if (currentQuestionIndex < PERSONALITY_QUESTIONS.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        addMessage(PERSONALITY_QUESTIONS[currentQuestionIndex + 1].question, "bot");
      }, 500);
    } else {
      setTimeout(() => {
        setIsQuestionsComplete(true);
        generateRecommendations();
      }, 500);
    }
  };

  const generateRecommendations = () => {
    const prefs = userPreferences as UserPreferences;
    let recommendedTools = [...aiTools];

    // Filter based on preferences
    if (prefs.budget === "Free tools only") {
      recommendedTools = recommendedTools.filter(tool => tool.price === "Free");
    } else if (prefs.budget === "Freemium (free with paid upgrades)") {
      recommendedTools = recommendedTools.filter(tool => tool.price === "Freemium");
    }

    // Sort by relevance to user interests
    if (prefs.interests?.includes("Writing & Content")) {
      recommendedTools = recommendedTools.filter(tool => 
        tool.category === "Writing" || tool.category === "Content Creation"
      );
    }

    // Get top 5 recommendations
    const topRecommendations = recommendedTools.slice(0, 5);

    const recommendationText = `Based on your preferences, here are my top recommendations for you:

${topRecommendations.map((tool, index) => 
  `${index + 1}. **${tool.name}** - ${tool.description} (${tool.price})`
).join('\n\n')}

Would you like me to explain why I chose these tools or help you find something more specific?`;

    addMessage(recommendationText, "bot");
  };

  const handleUserMessage = () => {
    if (!userInput.trim()) return;

    addMessage(userInput, "user");
    
    // Simple response logic
    setTimeout(() => {
      if (userInput.toLowerCase().includes("help") || userInput.toLowerCase().includes("more")) {
        addMessage("I'd be happy to help! You can ask me about specific AI tools, categories, or tell me what you're trying to accomplish. I can also restart the questionnaire if you'd like different recommendations.", "bot");
      } else {
        addMessage("That's interesting! Feel free to explore the tools I recommended, or ask me anything else about AI tools. I'm here to help!", "bot");
      }
    }, 1000);

    setUserInput("");
  };

  const currentQuestion = PERSONALITY_QUESTIONS[currentQuestionIndex];

  return (
    <>
      {/* Chatbot Toggle Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-gradient-to-r from-primary to-primary-glow shadow-elegant hover:shadow-glow transition-all duration-300"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {/* Chatbot Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-end p-6">
          <Card className="w-96 h-[600px] bg-background/95 backdrop-blur-md border border-white/10 shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <div className="flex items-center space-x-2">
                <Bot className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">AI Assistant</CardTitle>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            
            <CardContent className="flex flex-col h-[calc(100%-80px)]">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.sender === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        {message.sender === "bot" && <Bot className="h-4 w-4 mt-0.5 text-primary" />}
                        {message.sender === "user" && <User className="h-4 w-4 mt-0.5" />}
                        <div className="whitespace-pre-wrap text-sm">{message.text}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Question Interface */}
              {!isQuestionsComplete && currentQuestion && (
                <div className="space-y-3 mb-4">
                  <p className="text-sm font-medium">{currentQuestion.question}</p>
                  <div className="grid gap-2">
                    {currentQuestion.multiple ? (
                      // Multiple choice
                      currentQuestion.options.map((option) => (
                        <Button
                          key={option}
                          variant="outline"
                          size="sm"
                          className="justify-start text-left h-auto py-2 px-3"
                          onClick={() => {
                            const currentAnswers = (userPreferences[currentQuestion.id as keyof UserPreferences] as string[]) || [];
                            const newAnswers = currentAnswers.includes(option)
                              ? currentAnswers.filter(a => a !== option)
                              : [...currentAnswers, option];
                            
                            if (newAnswers.length > 0) {
                              handleQuestionAnswer(newAnswers);
                            }
                          }}
                        >
                          {option}
                        </Button>
                      ))
                    ) : (
                      // Single choice
                      currentQuestion.options.map((option) => (
                        <Button
                          key={option}
                          variant="outline"
                          size="sm"
                          className="justify-start text-left h-auto py-2 px-3"
                          onClick={() => handleQuestionAnswer(option)}
                        >
                          {option}
                        </Button>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* Chat Input */}
              {isQuestionsComplete && (
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleUserMessage()}
                    placeholder="Ask me anything about AI tools..."
                    className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                  <Button size="icon" onClick={handleUserMessage}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};