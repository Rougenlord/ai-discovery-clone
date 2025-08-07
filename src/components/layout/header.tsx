import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/ui/search-bar";
import { Menu, X } from "lucide-react";

interface HeaderProps {
  onSearch: (query: string) => void;
  searchQuery: string;
}

export const Header = ({ onSearch, searchQuery }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "New", href: "#" },
    { label: "Popular", href: "#" },
    { label: "Categories", href: "#" },
    { label: "Trending", href: "#" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-secondary glass">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-hero flex items-center justify-center text-white font-bold">
            T
          </div>
          <span className="text-xl font-bold text-foreground">
            There's An AI For That
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
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
            <Button size="sm" className="gradient-button shadow-button">
              Submit Tool
            </Button>
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
              <Button variant="ghost" size="sm" className="w-full justify-start">
                Sign In
              </Button>
              <Button size="sm" className="w-full gradient-button shadow-button">
                Submit Tool
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};