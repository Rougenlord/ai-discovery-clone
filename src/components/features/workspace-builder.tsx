import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Trash2, Settings, Layout, Star, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface WorkspaceItem {
  id: string;
  toolName: string;
  category: string;
  position: { x: number; y: number };
}

interface Workspace {
  id: string;
  name: string;
  description: string;
  tools: WorkspaceItem[];
  isPublic: boolean;
  likes: number;
  category: string;
}

const predefinedWorkspaces: Workspace[] = [
  {
    id: "content-creator",
    name: "Content Creator Studio",
    description: "Everything you need for content creation",
    tools: [
      { id: "1", toolName: "ChatGPT", category: "Chatbots", position: { x: 0, y: 0 } },
      { id: "2", toolName: "Midjourney", category: "Image Generation", position: { x: 1, y: 0 } },
      { id: "3", toolName: "Jasper AI", category: "Content Creation", position: { x: 0, y: 1 } },
      { id: "4", toolName: "Canva AI", category: "Design", position: { x: 1, y: 1 } }
    ],
    isPublic: true,
    likes: 2847,
    category: "Content Creation"
  },
  {
    id: "developer",
    name: "Developer Toolkit",
    description: "AI tools for software development",
    tools: [
      { id: "1", toolName: "GitHub Copilot", category: "Code Generation", position: { x: 0, y: 0 } },
      { id: "2", toolName: "Tabnine", category: "Code Generation", position: { x: 1, y: 0 } },
      { id: "3", toolName: "ChatGPT", category: "Chatbots", position: { x: 0, y: 1 } },
      { id: "4", toolName: "Claude", category: "Chatbots", position: { x: 1, y: 1 } }
    ],
    isPublic: true,
    likes: 1923,
    category: "Development"
  },
  {
    id: "marketing",
    name: "Marketing Suite",
    description: "AI-powered marketing automation",
    tools: [
      { id: "1", toolName: "Copy.ai", category: "Content Creation", position: { x: 0, y: 0 } },
      { id: "2", toolName: "Jasper AI", category: "Content Creation", position: { x: 1, y: 0 } },
      { id: "3", toolName: "Midjourney", category: "Image Generation", position: { x: 0, y: 1 } },
      { id: "4", toolName: "Writesonic", category: "Content Creation", position: { x: 1, y: 1 } }
    ],
    isPublic: true,
    likes: 1456,
    category: "Marketing"
  }
];

export const WorkspaceBuilder = () => {
  const [workspaces, setWorkspaces] = useState<Workspace[]>(predefinedWorkspaces);
  const [selectedWorkspace, setSelectedWorkspace] = useState<Workspace | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newWorkspaceName, setNewWorkspaceName] = useState("");
  const [newWorkspaceDescription, setNewWorkspaceDescription] = useState("");
  const { toast } = useToast();

  const createWorkspace = () => {
    if (!newWorkspaceName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a workspace name",
        variant: "destructive",
      });
      return;
    }

    const newWorkspace: Workspace = {
      id: Date.now().toString(),
      name: newWorkspaceName,
      description: newWorkspaceDescription,
      tools: [],
      isPublic: false,
      likes: 0,
      category: "Custom"
    };

    setWorkspaces([...workspaces, newWorkspace]);
    setNewWorkspaceName("");
    setNewWorkspaceDescription("");
    setIsCreating(false);
    setSelectedWorkspace(newWorkspace);

    toast({
      title: "Success",
      description: "Workspace created successfully!",
    });
  };

  const deleteWorkspace = (workspaceId: string) => {
    setWorkspaces(workspaces.filter(w => w.id !== workspaceId));
    if (selectedWorkspace?.id === workspaceId) {
      setSelectedWorkspace(null);
    }
    toast({
      title: "Success",
      description: "Workspace deleted successfully!",
    });
  };

  const WorkspaceCard = ({ workspace }: { workspace: Workspace }) => (
    <Card className="gradient-card border-secondary hover:shadow-glow transition-smooth cursor-pointer group"
          onClick={() => setSelectedWorkspace(workspace)}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg text-foreground group-hover:text-primary transition-colors">
              {workspace.name}
            </CardTitle>
            <CardDescription className="mt-1">
              {workspace.description}
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              deleteWorkspace(workspace.id);
            }}
            className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-3">
          <Badge variant="outline" className="text-xs">
            {workspace.category}
          </Badge>
          {workspace.isPublic && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Star className="h-4 w-4" />
              <span>{workspace.likes}</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Layout className="h-4 w-4" />
          <span>{workspace.tools.length} tools</span>
          {workspace.isPublic && (
            <>
              <Users className="h-4 w-4 ml-2" />
              <span>Public</span>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const WorkspaceEditor = ({ workspace }: { workspace: Workspace }) => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-foreground">{workspace.name}</h3>
          <p className="text-muted-foreground">{workspace.description}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Tool
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 p-6 border-2 border-dashed border-secondary rounded-lg min-h-[400px] bg-secondary/20">
        {workspace.tools.map((tool) => (
          <Card key={tool.id} className="gradient-card border-primary/20 hover:shadow-button transition-smooth">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-foreground">
                {tool.toolName}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant="outline" className="text-xs">
                {tool.category}
              </Badge>
            </CardContent>
          </Card>
        ))}
        
        {workspace.tools.length === 0 && (
          <div className="col-span-4 flex flex-col items-center justify-center text-center py-12">
            <Layout className="h-12 w-12 text-muted-foreground mb-4" />
            <h4 className="text-lg font-semibold text-foreground mb-2">
              Start Building Your Workspace
            </h4>
            <p className="text-muted-foreground mb-4">
              Add AI tools to create your perfect workflow
            </p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Tool
            </Button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <section className="py-16 px-4">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Layout className="h-8 w-8 text-primary" />
            <h2 className="text-4xl font-bold text-foreground">
              AI Workspace Builder
            </h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Create personalized AI workflows by combining your favorite tools into custom workspaces
          </p>
        </div>

        <Tabs defaultValue="browse" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="browse">Browse Workspaces</TabsTrigger>
            <TabsTrigger value="my-workspaces">My Workspaces</TabsTrigger>
            <TabsTrigger value="create">Create New</TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-foreground">
                Popular Workspaces
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {workspaces.filter(w => w.isPublic).map((workspace) => (
                <WorkspaceCard key={workspace.id} workspace={workspace} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="my-workspaces" className="space-y-6">
            {selectedWorkspace ? (
              <div>
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedWorkspace(null)}
                  className="mb-6"
                >
                  ← Back to Workspaces
                </Button>
                <WorkspaceEditor workspace={selectedWorkspace} />
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-foreground">
                    Your Workspaces
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {workspaces.map((workspace) => (
                    <WorkspaceCard key={workspace.id} workspace={workspace} />
                  ))}
                </div>
              </>
            )}
          </TabsContent>

          <TabsContent value="create" className="space-y-6">
            <Card className="gradient-card border-secondary max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-2xl text-foreground">
                  Create New Workspace
                </CardTitle>
                <CardDescription>
                  Design a custom AI workflow tailored to your needs
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="workspace-name">Workspace Name</Label>
                  <Input
                    id="workspace-name"
                    placeholder="e.g., Content Creator Studio"
                    value={newWorkspaceName}
                    onChange={(e) => setNewWorkspaceName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="workspace-description">Description</Label>
                  <Input
                    id="workspace-description"
                    placeholder="Describe what this workspace is for"
                    value={newWorkspaceDescription}
                    onChange={(e) => setNewWorkspaceDescription(e.target.value)}
                  />
                </div>
                <Button onClick={createWorkspace} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Workspace
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};