
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import Image from "next/image";

const TwitterIcon = () => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current">
        <title>X</title>
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
    </svg>
);

const Logo = () => (
     <Image 
      src="/logo.png" 
      alt="Eglife Logo" 
      width={50} 
      height={50} 
      className="rounded-full" 
    />
);


export default function Footer() {
  return (
    <footer className="bg-primary/10">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="flex flex-col items-start">
            <Link href="/" className="flex items-center gap-3 mb-4">
               <Logo />
               <span className="font-headline text-2xl font-bold">EGLIFE TOKEN</span>
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
          <p>&copy; {new Date().getFullYear()} EGLIFE TOKEN. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
