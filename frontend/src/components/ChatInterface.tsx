
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, Heart } from "lucide-react";
import ChatMessage from "./ChatMessage";

interface Message {
  text: string;
  isUser: boolean;
}

const INITIAL_MESSAGES: Message[] = [
  { 
    text: "Hi, I'm HealthSpark AI. How can I assist you with your health questions today?", 
    isUser: false 
  }
];

// Mock responses for demo purposes
const MOCK_RESPONSES: Record<string, string> = {
  "default": "I'm happy to help address your health concern. Could you please provide more details so I can give you better guidance?",
  "headache": "Headaches can be caused by various factors including stress, dehydration, eye strain, or poor posture. Try drinking water, taking a short break, and consider over-the-counter pain relievers if needed. If headaches are severe or persistent, please consult a healthcare provider.",
  "sleep": "For better sleep, establish a regular sleep schedule, create a restful environment, limit screen time before bed, avoid caffeine and large meals in the evening, and consider relaxation techniques like deep breathing or meditation.",
  "exercise": "Regular exercise is crucial for health. Aim for at least 150 minutes of moderate activity weekly. Start with walking, swimming, or cycling if you're a beginner. Remember to warm up, stay hydrated, and consult a doctor if you have underlying health conditions.",
  "nutrition": "A balanced diet should include fruits, vegetables, whole grains, lean proteins, and healthy fats. Try to limit processed foods, added sugars, and excessive salt. Stay hydrated and consider portion control for weight management.",
  "stress": "To manage stress, try deep breathing exercises, meditation, regular physical activity, adequate sleep, and time management. Social connections and hobbies can also help. If stress becomes overwhelming, consider speaking with a mental health professional."
};

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const userMessage = { text: input, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      let response = MOCK_RESPONSES.default;
      
      // Very basic keyword matching for demo
      const lowerInput = input.toLowerCase();
      Object.entries(MOCK_RESPONSES).forEach(([keyword, reply]) => {
        if (keyword !== "default" && lowerInput.includes(keyword)) {
          response = reply;
        }
      });
      
      setMessages(prev => [...prev, { text: response, isUser: false }]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto h-[600px] flex flex-col shadow-xl">
      <CardHeader className="border-b bg-muted/50">
        <div className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-health-500 fill-health-500" />
          <CardTitle className="text-xl">HealthSpark Assistant</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto p-4 space-y-4">
        <div className="space-y-4">
          {messages.map((msg, i) => (
            <ChatMessage 
              key={i} 
              message={msg.text} 
              isUser={msg.isUser} 
            />
          ))}
          {isLoading && <ChatMessage message="" isUser={false} isLoading={true} />}
          <div ref={messagesEndRef} />
        </div>
      </CardContent>
      <CardFooter className="border-t p-4">
        <form onSubmit={handleSend} className="flex w-full gap-2">
          <Input
            className="flex-1"
            placeholder="Type your health question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            size="icon" 
            className="bg-health-500 hover:bg-health-600 text-white"
            disabled={isLoading || !input.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default ChatInterface;
