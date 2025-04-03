import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, Heart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { v4 as uuidv4 } from 'uuid';
import ChatMessage from "./ChatMessage";
import { chatApi } from '../services/api';

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

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize chat session
  useEffect(() => {
    const initializeSession = async () => {
      try {
        // Check for existing session in localStorage
        const storedSessionId = localStorage.getItem('chatSessionId');
        
        if (storedSessionId) {
          // Use existing session
          setSessionId(storedSessionId);
          
          try {
            // Get messages from existing session
            const response = await chatApi.getSession(storedSessionId);
            
            if (response.success && response.data.messages) {
              // Format messages for display
              const sessionMessages = response.data.messages.map((msg: any) => ({
                text: msg.content,
                isUser: msg.role === 'user'
              }));
              
              // Update messages state if there are messages from the server
              if (sessionMessages.length > 0) {
                setMessages(sessionMessages);
              }
            }
          } catch (error) {
            console.error('Error loading session:', error);
            
            // If session not found, create new session
            createNewSession();
          }
        } else {
          // Create new session
          createNewSession();
        }
      } catch (error) {
        console.error('Error initializing chat session:', error);
        toast({
          title: "Error",
          description: "Failed to initialize chat. Please try again.",
          variant: "destructive"
        });
      }
    };
    
    const createNewSession = async () => {
      try {
        const response = await chatApi.createSession();
        
        if (response.success) {
          const newSessionId = response.data.sessionId;
          setSessionId(newSessionId);
          
          // Store session ID in localStorage
          localStorage.setItem('chatSessionId', newSessionId);
        }
      } catch (error) {
        console.error('Error creating new session:', error);
      }
    };
    
    initializeSession();
  }, [toast]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !sessionId) return;
    
    const userMessage = { text: input, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    try {
      console.log('Sending message to backend:', input);
      // Send message to API
      const response = await chatApi.sendMessage(sessionId, input);
      
      if (response.success && response.data) {
        console.log('Received successful response:', response.data);
        const aiResponse = { text: response.data.message, isUser: false };
        setMessages(prev => [...prev, aiResponse]);
      } else {
        console.error('Invalid response format:', response);
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      
      // More specific error messages based on error type
      let errorMessage = "I'm sorry, I'm having trouble connecting to the server. Please try again later.";
      
      if (error instanceof Error) {
        if (error.message.includes('API key')) {
          errorMessage = "I'm sorry, there's an issue with the API configuration. Please contact support.";
        } else if (error.message.includes('network')) {
          errorMessage = "I'm having trouble connecting to the network. Please check your internet connection.";
        }
      }
      
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
      
      // Fallback response
      setMessages(prev => [...prev, { 
        text: errorMessage, 
        isUser: false 
      }]);
    } finally {
      setIsLoading(false);
    }
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
            disabled={isLoading || !input.trim() || !sessionId}
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default ChatInterface;
