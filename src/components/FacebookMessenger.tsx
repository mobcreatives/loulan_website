"use client";

import React, { useState, useEffect } from 'react';
import { FacebookProvider, CustomChat } from 'react-facebook';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FacebookMessengerProps {
  pageId: string;
  appId: string;
  themeColor?: string;
  minimized?: boolean;
}

export function FacebookMessenger({
  pageId,
  appId,
  themeColor = "#FF5A5F",
  minimized = false,
}: FacebookMessengerProps) {
  const [isOpen, setIsOpen] = useState(!minimized);
  const [isVisible, setIsVisible] = useState(false);

  // Delay the initial appearance for a smoother page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative"
          >
            <Button
              onClick={() => setIsOpen(true)}
              className={cn(
                "rounded-full w-14 h-14 shadow-lg bg-[#0084FF] hover:bg-[#0084FF]/90",
                "flex items-center justify-center relative group"
              )}
            >
              <MessageCircle className="w-6 h-6 text-white" />
              <span className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full animate-pulse" />
              
              {/* Tooltip */}
              <div className="absolute bottom-full right-0 mb-2 px-3 py-1.5 bg-black text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                Chat with us on Messenger
              </div>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative"
          >
            <div className="absolute -top-2 right-0">
              <Button
                onClick={() => setIsOpen(false)}
                variant="ghost"
                size="icon"
                className="rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="rounded-lg overflow-hidden shadow-2xl border border-white/10 backdrop-blur-sm bg-white/5">
              <FacebookProvider appId={appId} chatSupport>
                <CustomChat
                  pageId={pageId}
                  minimized={false}
                  themeColor={themeColor}
                  loggedInGreeting="Hello! How can we help you today?"
                  loggedOutGreeting="Hello! How can we help you today?"
                />
              </FacebookProvider>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 