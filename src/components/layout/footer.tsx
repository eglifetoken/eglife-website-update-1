
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

const TwitterIcon = () => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current">
        <title>X</title>
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
    </svg>
);

const footerLinks = {
    "About Us": [
        { href: "/whitepaper", label: "Whitepaper" },
        { href: "/roadmap", label: "Roadmap" },
        { href: "/contact", label: "Contact" },
        { href: "/business-plan", label: "Business Plan" },
    ],
    "Services": [
        { href: "/staking", label: "Staking" },
        { href: "/trade", label: "Trade" },
        { href: "/services", label: "Utility Payments" },
        { href: "/referral", label: "Referral Program" },
    ],
    "Learn": [
        { href: "/crypto-education", label: "Crypto Education" },
    ],
    "Support": [
        { href: "/contact", label: "Feedback & Support" },
        { href: "/admin", label: "Admin Dashboard" },
    ]
}


export default function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div className="col-span-2 md:col-span-1 mb-8 md:mb-0">
                 <Link href="/" className="mb-4 inline-block">
                    <span className="font-headline text-xl font-bold text-white">EGLIFE TOKEN</span>
                </Link>
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

            {Object.entries(footerLinks).map(([title, links]) => (
                <div key={title}>
                    <h4 className="font-semibold text-foreground mb-4">{title}</h4>
                    <ul className="space-y-3">
                        {links.map((link) => (
                            <li key={link.href}>
                                <Link href={link.href} className="text-sm text-foreground/70 hover:text-primary transition-colors">
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>

         <div className="mt-12 pt-8 border-t text-center">
            <p className="text-sm text-foreground/60">&copy; {new Date().getFullYear()} EGLIFE TOKEN. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
