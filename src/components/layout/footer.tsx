
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
    <svg width="140" height="40" viewBox="0 0 180 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="object-contain">
        <g clipPath="url(#clip0_1_2)">
            <path d="M90 50C114.853 50 135 27.6142 135 0H45C45 27.6142 65.1472 50 90 50Z" fill="url(#paint0_linear_1_2)" className="text-primary-foreground dark:text-primary"/>
            <path d="M90 50C65.1472 50 45 27.6142 45 0H135C135 27.6142 114.853 50 90 50Z" fill="url(#paint1_radial_1_2)" fillOpacity="0.7"/>
            <text fill="hsl(var(--primary))" className="dark:fill-primary-foreground" fontFamily="Alegreya, serif" fontSize="24" fontWeight="bold" letterSpacing="0.05em" x="50%" y="55%" dominantBaseline="middle" textAnchor="middle">EGLIFE</text>
            <path d="M60 15C65 5 80 5 90 15L95 20C85 10 70 10 60 15Z" fill="hsl(var(--primary))" className="dark:fill-primary-foreground" opacity="0.8"/>
             <path d="M120 35C115 45 100 45 90 35L85 30C95 40 110 40 120 35Z" fill="hsl(var(--primary))" className="dark:fill-primary-foreground" opacity="0.8"/>
        </g>
        <defs>
            <linearGradient id="paint0_linear_1_2" x1="90" y1="0" x2="90" y2="50" gradientUnits="userSpaceOnUse">
                <stop stopColor="currentColor" stopOpacity="0.2"/>
                <stop offset="1" stopColor="currentColor" stopOpacity="0.8"/>
            </linearGradient>
            <radialGradient id="paint1_radial_1_2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(90 0) rotate(90) scale(50 100)">
                <stop stopColor="white" stopOpacity="0.2"/>
                <stop offset="1" stopColor="white" stopOpacity="0"/>
            </radialGradient>
            <clipPath id="clip0_1_2">
                <rect width="180" height="50" rx="8"/>
            </clipPath>
        </defs>
    </svg>
);


export default function Footer() {
  return (
    <footer className="bg-primary/10">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="flex flex-col items-start">
            <Link href="/" className="flex items-center gap-3 mb-4">
               <Logo />
            </Link>
            <p className="text-foreground/70">Fostering wellness, sustainability, and community.</p>
          </div>
          <div>
            <h3 className="text-lg font-headline font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-foreground/80 hover:text-primary">About Us</Link></li>
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
              <li><Link href="/dashboard" className="text-foreground/80 hover:text-primary">Dashboard</Link></li>
              <li><Link href="/dapp" className="text-foreground/80 hover:text-primary">DApp</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-headline font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <Button asChild variant="ghost" size="icon">
                <a href="https://x.com/eglifetoken" target="_blank" rel="noopener noreferrer" aria-label="Eglife Token on X">
                  <TwitterIcon />
                </a>
              </Button>
              <Button asChild variant="ghost" size="icon">
                <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Eglife Token on Telegram">
                  <Send className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-foreground/60">
          <p>&copy; {new Date().getFullYear()} Eglife Hub. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
