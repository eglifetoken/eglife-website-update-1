
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Twitter, Send } from "lucide-react";

const TwitterIcon = () => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current">
        <title>X</title>
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
    </svg>
);

const Logo = () => (
    <svg width="140" height="40" viewBox="0 0 140 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-foreground">
        <path d="M20.3333 1.66663C21.2538 1.66663 22.1359 2.01781 22.7932 2.67512C23.4505 3.33242 23.8017 4.21448 23.8017 5.13495C23.8017 6.05542 23.4505 6.93748 22.7932 7.59479C22.1359 8.25209 21.2538 8.60327 20.3333 8.60327H12.2683V1.66663H20.3333Z" fill="currentColor"/>
        <path d="M20.3333 15.2041H12.2683V22.1407H20.3333C21.2538 22.1407 22.1359 21.7895 22.7932 21.1322C23.4505 20.4749 23.8017 19.5928 23.8017 18.6724C23.8017 17.7519 23.4505 16.8698 22.7932 16.2125C22.1359 15.5552 21.2538 15.2041 20.3333 15.2041Z" fill="currentColor"/>
        <path d="M20.3333 28.7417H12.2683V35.6783H20.3333C21.2538 35.6783 22.1359 35.3271 22.7932 34.6698C23.4505 34.0125 23.8017 33.1304 23.8017 32.21C23.8017 31.2895 23.4505 30.4074 22.7932 29.7501C22.1359 29.0928 21.2538 28.7417 20.3333 28.7417Z" fill="currentColor"/>
        <path d="M9.42163 1.66663H2.5V35.6783H9.42163V1.66663Z" fill="currentColor"/>
        <path d="M47.78 35.6783V1.66663H54.7016V35.6783H47.78Z" fill="currentColor"/>
        <path d="M72.9366 22.1407L65.5016 1.66663H76.3816L80.1266 12.3355L83.8716 1.66663H94.7516L87.3166 22.1407V35.6783H80.395V22.1407H79.8483L76.1033 32.7467H74.1566L70.4116 22.1407H69.865V35.6783H65.9983L72.9366 22.1407Z" fill="currentColor"/>
        <path d="M107.03 36.3333C105.112 36.3333 103.272 35.5782 101.905 34.2114C100.539 32.8446 99.7833 31.0049 99.7833 29.0866V1.66663H106.705V29.0866C106.705 29.6163 106.918 30.1242 107.29 30.496C107.662 30.8677 108.17 31.0808 108.7 31.0808C109.23 31.0808 109.738 30.8677 110.11 30.496C110.482 30.1242 110.695 29.6163 110.695 29.0866V1.66663H117.617V29.0866C117.617 31.0049 116.861 32.8446 115.495 34.2114C114.128 35.5782 112.288 36.3333 110.37 36.3333H107.03Z" fill="currentColor"/>
        <path d="M123.018 35.6783V1.66663H138.802V8.60327H130.088V15.2041H138.118V22.1407H130.088V28.7417H138.802V35.6783H123.018Z" fill="currentColor"/>
    </svg>
)

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
