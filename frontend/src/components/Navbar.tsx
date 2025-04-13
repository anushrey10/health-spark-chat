
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Heart, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-background/80 backdrop-blur-md shadow-sm' 
        : 'bg-transparent'
    }`}>
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Heart className="h-6 w-6 text-supabase-purple fill-supabase-purple animate-pulse-light" />
          <span className="text-xl font-bold gradient-text">HealthSparkChat</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm font-medium hover:text-supabase-purple transition-colors">Features</a>
          <a href="#chat-demo" className="text-sm font-medium hover:text-supabase-purple transition-colors">Demo</a>
          <a href="#about" className="text-sm font-medium hover:text-supabase-purple transition-colors">About</a>
        </div>
        
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            className="hidden md:flex border-supabase-purple/30 hover:border-supabase-purple hover:bg-supabase-purple/5 text-foreground"
          >
            Login
          </Button>
          <Button 
            className="bg-supabase-gradient hover:opacity-90 text-white shadow-md hover:shadow-lg transition-all"
          >
            Get Started
          </Button>
          <Button 
            variant="ghost" 
            className="md:hidden p-1"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-background/95 backdrop-blur-lg border-b border-border animate-in">
          <div className="container py-4 flex flex-col gap-2">
            <a 
              href="#features" 
              className="px-4 py-2 rounded-md hover:bg-muted transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </a>
            <a 
              href="#chat-demo" 
              className="px-4 py-2 rounded-md hover:bg-muted transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Demo
            </a>
            <a 
              href="#about" 
              className="px-4 py-2 rounded-md hover:bg-muted transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </a>
            <Button 
              variant="outline" 
              className="mt-2 border-supabase-purple/30 hover:border-supabase-purple"
            >
              Login
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
