
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageSquare } from "lucide-react";

const LandingHero = () => {
  return (
    <div className="relative overflow-hidden pt-28 md:pt-36 pb-16">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-40 left-1/4 h-64 w-64 rounded-full bg-purple-glow opacity-70 animate-float"></div>
        <div className="absolute bottom-20 right-1/4 h-80 w-80 rounded-full bg-green-glow opacity-60 animate-float" style={{animationDelay: '2s'}}></div>
      </div>
      
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-10 animate-in">
          <div className="inline-flex items-center rounded-full border border-supabase-purple/30 bg-supabase-purple/5 px-4 py-1.5 text-sm font-medium">
            <span className="text-supabase-purple">✨ Introducing HealthSparkChat</span>
          </div>
          
          <div className="space-y-6 max-w-[900px]">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              Your Personal <span className="gradient-text">AI Health Assistant</span>
            </h1>
            <p className="text-xl text-muted-foreground md:text-2xl max-w-3xl mx-auto">
              Get instant, reliable healthcare guidance powered by advanced AI. Always available, always accurate.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-5 min-[400px]:gap-6">
            <Button size="lg" className="bg-supabase-gradient hover:opacity-90 text-white rounded-md shadow-lg hover:shadow-xl transition-all duration-300">
              Try Demo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" className="rounded-md border-supabase-purple/30 hover:border-supabase-purple hover:bg-supabase-purple/5 text-foreground">
              <MessageSquare className="mr-2 h-4 w-4" />
              Learn More
            </Button>
          </div>

          <div className="supabase-card w-full max-w-3xl mt-8 overflow-hidden glow-effect transition-all duration-300 group">
            <div className="p-1 bg-supabase-gradient">
              <div className="bg-supabase-darkBlue p-5 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  <div className="ml-4 text-sm text-gray-400">healthsparkchat.ai</div>
                </div>
                <div className="mt-6 space-y-4 pb-4 text-left">
                  <div className="bg-supabase-darkBlue/50 border border-white/10 rounded-lg p-4 max-w-[80%]">
                    <p className="text-sm text-white/90">I've been experiencing headaches after working on my computer all day. What might be causing this?</p>
                  </div>
                  <div className="bg-supabase-purple/10 border border-supabase-purple/20 rounded-lg p-4 ml-auto max-w-[80%]">
                    <p className="text-sm text-white/90">That could be digital eye strain or tension headaches. Try taking regular breaks (every 20 minutes), adjusting your screen brightness, ensuring proper ergonomics, and staying hydrated. If headaches persist, consider consulting your doctor.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingHero;
