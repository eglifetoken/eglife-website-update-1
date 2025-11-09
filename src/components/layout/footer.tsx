
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

const TwitterIcon = () => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current">
        <title>X</title>
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
    </svg>
);

const Logo = () => (
    <div className="flex items-center gap-2 font-bold text-xl" aria-label="EGLIFE TOKEN">
        <svg width="124" height="40" viewBox="0 0 124 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="40" height="40" rx="8" fill="hsl(var(--primary))"/>
          <text x="8" y="28" fontFamily="Lexend, sans-serif" fontSize="20" fontWeight="bold" fill="hsl(var(--primary-foreground))">EG</text>
          <text x="50" y="28" fontFamily="Lexend, sans-serif" fontSize="24" fontWeight="bold" fill="hsl(var(--foreground))" className="tracking-tight">LIFE</text>
        </svg>
    </div>
);


export default function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-8 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
                <Link href="/">
                    <Logo />
                </Link>
            </div>
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
                <Link href="/whitepaper" className="text-sm text-foreground/80 hover:text-primary">Whitepaper</Link>
                <Link href="/roadmap" className="text-sm text-foreground/80 hover:text-primary">Roadmap</Link>
                <Link href="/contact" className="text-sm text-foreground/80 hover:text-primary">Contact</Link>
            </div>
            <div className="flex space-x-4">
              <Button asChild variant="ghost" size="icon">
                <a href="https://x.com/eglifetoken" target="_blank" rel="noopener noreferrer" aria-label="EGLIFE TOKEN on X">
                  <TwitterIcon />
                </a>
              </Button>
              <Button asChild variant="ghost" size="icon">
                <a href="https://t.me/eglifetoken" target="_blank" rel="noopener noreferrer" aria-label="EGLIFE TOKEN on Telegram">
                  <Send className="h-5 w-5" />
                </a>
              </Button>
            </div>
        </div>
         <div className="mt-8 pt-8 border-t text-center">
            <p className="text-sm text-foreground/60">&copy; {new Date().getFullYear()} EGLIFE TOKEN. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
