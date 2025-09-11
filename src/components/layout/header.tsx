import React, { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Brain, Search, Menu, X, Plus, User, Settings, LogOut, LogIn } from 'lucide-react';
import { SearchBar } from '@/components/ui/search-bar';

interface HeaderProps {
  onSearch: (query: string) => void;
  searchQuery: string;
  onSubmitTool?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearch, searchQuery, onSubmitTool }) => {
  const { user, loading, signOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "New", href: "#" },
    { label: "Popular", href: "#" },
    { label: "Categories", href: "#" },
    { label: "Trending", href: "#" },
  ];

  const handleSubmitTool = () => {
    if (onSubmitTool) {
      onSubmitTool();
    } else {
      document.getElementById('submit-tool')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-secondary glass">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Brain className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Genius Dash
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Search and Actions */}
        <div className="flex items-center space-x-4">
          <div className="hidden sm:block">
            <SearchBar 
              value={searchQuery}
              onChange={onSearch}
              placeholder="Search AI tools..."
            />
          </div>
          
          <div className="hidden md:flex items-center space-x-2">
            <Button 
              onClick={handleSubmitTool}
              className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Plus className="h-4 w-4" />
              Submit Tool
            </Button>

            {/* Auth Section */}
            {loading ? (
              <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.user_metadata?.avatar_url} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {user.email?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{user.user_metadata?.full_name || 'User'}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => window.location.href = '/profile'}>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => window.location.href = '/profile?tab=settings'}>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                onClick={() => window.location.href = '/auth'}
                variant="outline"
                className="flex items-center gap-2"
              >
                <LogIn className="h-4 w-4" />
                Sign In
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="sm:hidden px-4 pb-4">
        <SearchBar 
          value={searchQuery}
          onChange={onSearch}
          placeholder="Search AI tools..."
        />
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-secondary bg-card/95 backdrop-blur-sm">
          <nav className="flex flex-col space-y-1 p-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth py-2"
              >
                {item.label}
              </a>
            ))}
            <div className="border-t border-secondary pt-4 mt-4 space-y-2">
              <Button 
                onClick={handleSubmitTool}
                className="w-full justify-start mb-4"
              >
                <Plus className="h-4 w-4 mr-2" />
                Submit Tool
              </Button>

              {/* Mobile Auth Section */}
              {user ? (
                <div className="space-y-2">
                  <Button 
                    onClick={() => window.location.href = '/profile'}
                    variant="ghost"
                    className="w-full justify-start"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Button>
                  <Button 
                    onClick={signOut}
                    variant="ghost"
                    className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <Button 
                  onClick={() => window.location.href = '/auth'}
                  className="w-full justify-start"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};