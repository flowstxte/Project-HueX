import React from 'react';
import { ThemeToggle } from './ThemeToggle';
import { Sparkles } from 'lucide-react';

const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 border-b sticky top-0 bg-background/95 backdrop-blur-sm z-10">
      <div className="flex items-center gap-2">
        <Sparkles className="h-6 w-6 text-primary" />
        <h1 className="text-xl font-bold tracking-tighter">HueX</h1>
      </div>
      <ThemeToggle />
    </header>
  );
};

export default Header;
