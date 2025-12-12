
"use client";

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Zap } from 'lucide-react';

export function SplashScreen() {
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Start fading out after a delay
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 2000); // 2 seconds visible

    return () => {
      clearTimeout(fadeTimer);
    };
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background text-white transition-opacity duration-500",
        isFading ? "opacity-0" : "opacity-100"
      )}
    >
        <Zap className="h-16 w-16 text-primary mb-6 animate-pulse" />
        <h1 className="text-4xl font-headline font-bold">Welcome to EGPAY</h1>
        <p className="text-lg text-foreground/80 mt-2">India's First Super Fintech-Crypto Hybrid Ecosystem</p>
    </div>
  );
}
