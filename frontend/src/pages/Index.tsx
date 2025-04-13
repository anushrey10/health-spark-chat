
import React from 'react';
import Navbar from '@/components/Navbar';
import LandingHero from '@/components/LandingHero';
import ChatInterface from '@/components/ChatInterface';
import { Heart, Database, Shield, Zap, Brain, BarChart } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <LandingHero />
        
        <section id="chat-demo" className="py-24 px-4 relative">
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute top-1/4 right-1/3 h-64 w-64 rounded-full bg-purple-glow opacity-40"></div>
            <div className="absolute bottom-1/3 left-1/4 h-80 w-80 rounded-full bg-green-glow opacity-30"></div>
          </div>
          
          <div className="container">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold gradient-text">Try the AI Health Assistant</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Ask our AI about common health concerns, wellness tips, or medical information. Get answers instantly.
              </p>
            </div>
            
            <div className="supabase-card p-6 shadow-xl">
              <ChatInterface />
            </div>
          </div>
        </section>
        
        <section id="features" className="py-24 px-4 bg-muted/50 relative">
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute top-1/4 left-1/3 h-64 w-64 rounded-full bg-purple-glow opacity-20"></div>
          </div>
          
          <div className="container">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold gradient-text">How HealthSparkChat Works</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Powered by advanced AI to provide reliable health information when you need it most.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Instant Answers",
                  description: "Get immediate responses to your health questions, available 24/7.",
                  icon: Zap,
                  color: "text-yellow-500"
                },
                {
                  title: "Medical Knowledge",
                  description: "Access information vetted by healthcare professionals.",
                  icon: Brain,
                  color: "text-supabase-purple"
                },
                {
                  title: "Private & Secure",
                  description: "Your health conversations stay private and protected.",
                  icon: Shield,
                  color: "text-supabase-500"
                },
                {
                  title: "Data Analytics",
                  description: "Track your health queries and get personalized insights.",
                  icon: BarChart,
                  color: "text-blue-500"
                },
                {
                  title: "Knowledge Base",
                  description: "Built on a comprehensive database of medical information.",
                  icon: Database,
                  color: "text-orange-500"
                },
                {
                  title: "Personal Care",
                  description: "Personalized guidance for your unique health journey.",
                  icon: Heart,
                  color: "text-red-500"
                }
              ].map((feature, i) => (
                <div 
                  key={i} 
                  className="supabase-card p-6 text-center space-y-4 hover:translate-y-[-5px] transition-all duration-300 glow-effect"
                >
                  <div className={`${feature.color} mx-auto p-3 rounded-full bg-background border border-border inline-block`}>
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold text-xl">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <footer className="border-t py-12 bg-background">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-supabase-purple fill-supabase-purple" />
              <span className="font-bold gradient-text">HealthSparkChat</span>
            </div>
            
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} HealthSparkChat. All rights reserved.
            </div>
            
            <div className="flex gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-supabase-purple transition-colors">Terms</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-supabase-purple transition-colors">Privacy</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-supabase-purple transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
