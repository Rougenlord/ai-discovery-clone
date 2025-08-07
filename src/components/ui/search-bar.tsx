import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchBar = ({ value, onChange, placeholder = "Search AI tools...", className }: SearchBarProps) => {
  return (
    <div className={cn("relative w-full max-w-md", className)}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 bg-secondary/50 border-secondary hover:border-primary/50 focus:border-primary transition-smooth"
      />
    </div>
  );
};