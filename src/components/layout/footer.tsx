
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
    <div className="flex items-center gap-2">
        <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
            className="text-primary"
            >
            <defs>
                <linearGradient id="logoGradientFooter" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 1 }} />
                </linearGradient>
            </defs>
            <circle cx="24" cy="24" r="22" fill="url(#logoGradientFooter)" />
            <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="hsl(var(--primary-foreground))" fontSize="32" fontWeight="bold" fontFamily="Alegreya">
                E
            </text>
        </svg>
    </div>
);


export default function Footer() {
  return (
    <footer className="bg-primary/10">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="flex flex-col items-start">
            <Link href="/" className="mb-4">
               <Logo />
            </Link>
            <p className="text-foreground/70">Fostering wellness, sustainability, and community.</p>
          </div>
          <div>
            <h3 className="text-lg font-headline font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/services" className="text-foreground/80 hover:text-primary">Services</Link></li>
              <li><Link href="/whitepaper" className="text-foreground/80 hover:text-primary">Whitepaper</Link></li>
              <li><Link href="/roadmap" className="text-foreground/80 hover:text-primary">Roadmap</Link></li>
              <li><Link href="/contact" className="text-foreground/80 hover:text-primary">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-headline font-semibold mb-4">Ecosystem</h3>
            <ul className="space-y-2">
              <li><Link href="/staking" className="text-foreground/80 hover:text-primary">Staking</Link></li>
              <li><Link href="/dapp" className="text-foreground/80 hover:text-primary">DApp</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-headline font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <Button asChild variant="ghost" size="icon">
                <a href="https://x.com/eglifetoken" target="_blank" rel="noopener noreferrer" aria-label="EGLIFE TOKEN on X">
                  <TwitterIcon />
                </a>
              </Button>
              <Button asChild variant="ghost" size="icon">
                <a href="#" target="_blank" rel="noopener noreferrer" aria-label="EGLIFE TOKEN on Telegram">
                  <Send className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-foreground/60">
          <p>&copy; {new Date().getFullYear()} EGLIFE TOKEN. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
