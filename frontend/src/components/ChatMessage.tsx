
import React from 'react';
import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  isLoading?: boolean;
}

const ChatMessage = ({ message, isUser, isLoading = false }: ChatMessageProps) => {
  return (
    <div className={cn(
      "flex w-full gap-3 my-4 animate-in",
      isUser ? "justify-end" : "justify-start"
    )}>
      {!isUser && (
        <div className="flex-shrink-0 h-8 w-8 bg-health-100 rounded-full flex items-center justify-center">
          <Bot className="h-4 w-4 text-health-700" />
        </div>
      )}
      
      <div className={cn(
        "rounded-2xl px-4 py-3 max-w-[80%] text-sm md:text-base",
        isUser 
          ? "bg-health-500 text-white rounded-tr-none" 
          : "bg-secondary rounded-tl-none"
      )}>
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 bg-health-200 rounded-full animate-pulse"></div>
            <div className="h-2 w-2 bg-health-200 rounded-full animate-pulse delay-150"></div>
            <div className="h-2 w-2 bg-health-200 rounded-full animate-pulse delay-300"></div>
          </div>
        ) : (
          <p>{message}</p>
        )}
      </div>
      
      {isUser && (
        <div className="flex-shrink-0 h-8 w-8 bg-health-500 rounded-full flex items-center justify-center">
          <User className="h-4 w-4 text-white" />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
