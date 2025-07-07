"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { FaWhatsapp } from 'react-icons/fa';

interface WhatsAppProps {
  phoneNumber: string;
  message?: string;
  minimized?: boolean;
}

export function WhatsApp({
  phoneNumber,
  message = "Hello! How can we help you today?",
  minimized = false,
}: WhatsAppProps) {
  const [isOpen, setIsOpen] = useState(!minimized);
  const [isVisible, setIsVisible] = useState(false);

  // Delay the initial appearance for a smoother page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-30 z-50">
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
                "rounded-full w-14 h-14 shadow-lg bg-[#25D366] hover:bg-[#25D366]/90",
                "flex items-center justify-center relative group"
              )}
            >
              <FaWhatsapp className="w-6 h-6 text-white" />
              <span className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full animate-pulse" />
              
              {/* Tooltip */}
              <div className="absolute bottom-full right-0 mb-2 px-3 py-1.5 bg-black text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                Chat with us on WhatsApp
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
            <div className="rounded-lg overflow-hidden shadow-2xl border border-white/10 backdrop-blur-sm bg-white/5 p-4 min-w-[300px] relative">
              <div className="absolute -top-2 -right-2 z-10">
                <Button
                  onClick={() => setIsOpen(false)}
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center">
                  <FaWhatsapp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">WhatsApp Chat</h3>
                  <p className="text-gray-300 text-sm">We&apos;re here to help!</p>
                </div>
              </div>
              
              <div className="bg-white/10 rounded-lg p-3 mb-4">
                <p className="text-white text-sm">{message}</p>
              </div>
              
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#25D366]/90 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <FaWhatsapp className="w-4 h-4" />
                Start Chat
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 