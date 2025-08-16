
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Users, Eye, CheckCircle, DollarSign, LineChart, PieChart, TrendingUp, TrendingDown, Twitter, Linkedin, GitCommit, Lightbulb, Rocket, Target, Leaf, ArrowRight, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { getTokenData, TokenData } from "@/ai/flows/getTokenData";

const EGLIFE_CONTRACT_ADDRESS = "0xca326a5e15b9451efC1A6BddaD6fB098a4D09113";
const PANCAKESWAP_BUY_URL = `https://pancakeswap.finance/swap?outputCurrency=${EGLIFE_CONTRACT_ADDRESS}`;
const PANCAKESWAP_SELL_URL = `https://pancakeswap.finance/swap?inputCurrency=${EGLIFE_CONTRACT_ADDRESS}`;

const teamMembers = [
  {
    name: "Alex Johnson",
    role: "Founder & CEO",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400",
    bio: "Visionary leader with a passion for sustainable technology and community empowerment.",
    social: {
      twitter: "#",
      linkedin: "#",
    },
    aiHint: "man portrait"
  },
  {
    name: "Samantha Carter",
    role: "Lead Developer",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400",
    bio: "Expert blockchain developer driving the technical innovation behind the Eglife ecosystem.",
    social: {
      twitter: "#",
      linkedin: "#",
    },
    aiHint: "woman portrait"
  },
  {
    name: "Ben Richards",
    role: "Community Manager",
    avatar: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?q=80&w=400",
    bio: "Dedicated to building a vibrant and inclusive community around the Eglife mission.",
    social: {
      twitter: "#",
      linkedin: "#",
    },
    aiHint: "man smiling"
  },
];

const roadmapData = [
   {
    date: "Q2 2025",
    title: "Foundation & Pre-Launch",
    description: "Finalization and deployment of the BEP-20 smart contract, launch of our official website, and publication of the whitepaper.",
    icon: Rocket,
    status: "completed",
  },
  {
    date: "Q3 2025",
    title: "Security & Market Prep",
    description: "Commissioning a full smart contract audit and pursuing listings on major crypto data aggregators.",
    icon: CheckCircle,
    status: "in_progress",
  },
  {
    date: "Q4 2025",
    title: "Community Growth",
    description: "Creation of the initial liquidity pool on PancakeSwap and launch of the on-chain staking platform.",
    icon: Users,
    status: "upcoming",
  },
  {
    date: "Q1 2026",
    title: "EGLIFE App Beta",
    description: "Release of the beta version of the EGLIFE App with wallet and payment functionalities.",
    icon: Target,
    status: "upcoming",
  },
];

const statusStyles: { [key: string]: string } = {
    completed: "border-primary bg-primary/10 text-primary",
    in_progress: "border-accent bg-accent/10 text-accent",
    upcoming: "border-muted-foreground bg-muted-foreground/10 text-muted-foreground",
}


export default function Home() {
    const [tokenData, setTokenData] = useState<TokenData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getTokenData();
                setTokenData(data);
            } catch (error) {
                console.error("Failed to fetch token data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    
    const PriceChangeIndicator = tokenData && tokenData.priceChangePercentage24h >= 0 ? TrendingUp : TrendingDown;

  return (
    <div className="flex flex-col items-center">
      <section className="w-full py-16 md:py-20 bg-background/80">
          <div className="container mx-auto px-4 md:px-6">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div className="text-center md:text-left">
                      <h2 className="text-2xl md:text-4xl font-semibold text-primary mb-2">Welcome to EGLIFE TOKEN</h2>
                      <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tighter mb-4">
                          Empowering Your Financial Future
                      </h1>
                      <p className="max-w-xl mx-auto md:mx-0 text-lg md:text-xl text-foreground/80 mb-8">
                          EGLIFE provides the tools for a new generation of financial independence through a decentralized, utility-driven ecosystem on the BNB Smart Chain.
                      </p>
                      <div className="flex justify-center md:justify-start gap-4">
                          <Button asChild size="lg">
                              <Link href="/whitepaper">Read Whitepaper</Link>
                          </Button>
                          <Button asChild size="lg" variant="outline">
                              <Link href="/dapp">Explore Ecosystem</Link>
                          </Button>
                      </div>
                  </div>
                   <div className="hidden md:block">
                      <Image 
                          src="https://images.unsplash.com/photo-1642155533899-56e66565112?q=80&w=600"
                          alt="Blockchain Technology"
                          width={600}
                          height={400}
                          className="rounded-xl shadow-2xl w-full"
                          data-ai-hint="blockchain finance"
                      />
                  </div>
              </div>
          </div>
      </section>
      
       <section className="w-full py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-stretch">
            <Card className="flex flex-col">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="inline-block bg-primary/10 text-primary p-3 rounded-full">
                    <Eye className="w-8 h-8" />
                  </div>
                  <h2 className="text-3xl font-headline font-bold">Our Vision</h2>
                </div>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col">
                 <ul className="space-y-4 text-lg text-foreground/80">
                      <li className="flex items-start">
                          <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 flex-shrink-0" />
                          <span><strong>Financial Empowerment:</strong> To provide user-friendly decentralized financial tools that empower every generation, removing reliance on traditional banking systems.</span>
                      </li>
                      <li className="flex items-start">
                          <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 flex-shrink-0" />
                          <span><strong>Simplified Accessibility:</strong> To break down barriers by creating intuitive platforms that make the complexities of cryptocurrency easy to understand and accessible for everyone.</span>
                      </li>
                      <li className="flex items-start">
                          <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 flex-shrink-0" />
                          <span><strong>Bridging Digital & Reality:</strong> To build an inclusive financial future by seamlessly connecting digital assets with everyday life, making crypto practical for daily use.</span>
                      </li>
                      <li className="flex items-start">
                          <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 flex-shrink-0" />
                          <span><strong>Education and Trust:</strong> To foster widespread financial literacy through clear educational resources and promote user-centric design that prioritizes simplicity and security.</span>
                      </li>
                  </ul>
              </CardContent>
            </Card>
            <Card className="flex flex-col">
               <CardHeader>
                 <div className="flex items-center gap-4">
                    <div className="inline-block bg-primary/10 text-primary p-3 rounded-full">
                      <Users className="w-8 h-8" />
                    </div>
                    <h2 className="text-3xl font-headline font-bold">Our Mission</h2>
                 </div>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col">
                  <ul className="space-y-4 text-lg text-foreground/80">
                      <li className="flex items-start">
                          <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 flex-shrink-0" />
                          <span><strong>Provide Real Utility:</strong> To move beyond speculation by enabling EGLIFE for daily transactions like utility payments and merchant services, making crypto a practical tool for everyone.</span>
                      </li>
                      <li className="flex items-start">
                          <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 flex-shrink-0" />
                          <span><strong>Encourage Mass Adoption:</strong> To design intuitive, user-friendly applications and educational resources that remove barriers to entry, making it easy for anyone to join the digital economy.</span>
                      </li>
                      <li className="flex items-start">
                          <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 flex-shrink-0" />
                          <span><strong>Deliver Transparency:</strong> To build trust through verifiable on-chain operations and open-source smart contracts, ensuring every transaction and process is clear and auditable by our community.</span>
                      </li>
                      <li className="flex items-start">
                          <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 flex-shrink-0" />
                          <span><strong>Create a Self-Sustaining Ecosystem:</strong> To build a circular economy where users can earn rewards through staking and then spend those rewards on real-world services, all within a single, integrated platform.</span>
                      </li>
                  </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="w-full py-16 md:py-20 container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-headline font-bold mb-8 text-center">Live Market Data</h2>
      
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium font-headline">Live Price</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : tokenData ? (
                    <>
                        <div className="text-2xl font-bold">${tokenData.priceUsd.toFixed(4)}</div>
                        <div className={`text-xs flex items-center ${tokenData.priceChangePercentage24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            <PriceChangeIndicator className="h-3 w-3 mr-1" />
                            <span>{tokenData.priceChangePercentage24h.toFixed(2)}% (24h)</span>
                        </div>
                    </>
                ) : (
                    <div className="text-2xl font-bold text-muted-foreground">N/A</div>
                )}
            </CardContent>
            </Card>
            <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium font-headline">Market Cap</CardTitle>
                <LineChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : tokenData ? (
                    <>
                        <div className="text-2xl font-bold">${(tokenData.marketCapUsd / 1_000_000).toFixed(2)}M</div>
                        <p className="text-xs text-muted-foreground">Based on current price</p>
                    </>
                ) : (
                    <div className="text-2xl font-bold text-muted-foreground">N/A</div>
                )}
            </CardContent>
            </Card>
            <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium font-headline">Volume (24h)</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : tokenData ? (
                     <>
                        <div className="text-2xl font-bold">${(tokenData.volume24hUsd / 1_000).toFixed(2)}K</div>
                        <p className="text-xs text-muted-foreground">Last 24 hours</p>
                    </>
                ) : (
                    <div className="text-2xl font-bold text-muted-foreground">N/A</div>
                )}
            </CardContent>
            </Card>
            <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium font-headline">Circulating Supply</CardTitle>
                <PieChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : tokenData ? (
                     <>
                        <div className="text-2xl font-bold">{(tokenData.circulatingSupply / 1_000_000).toFixed(2)}M EGLIFE</div>
                        <p className="text-xs text-muted-foreground">out of 1B total supply</p>
                    </>
                ) : (
                     <div className="text-2xl font-bold text-muted-foreground">N/A</div>
                )}
            </CardContent>
            </Card>
        </div>

        <Card>
            <CardHeader>
            <CardTitle className="font-headline">EGLIFE Price Chart</CardTitle>
            <CardDescription>Live data from GeckoTerminal.</CardDescription>
            </CardHeader>
            <CardContent className="h-[500px] p-0">
            <iframe
                height="100%"
                width="100%"
                id="geckoterminal-embed"
                title="GeckoTerminal Embed"
                src="https://www.geckoterminal.com/bsc/pools/0xca326a5e15b9451efc1a6bddad6fb098a4d09113?embed=1&info=0&swaps=0"
                frameBorder="0"
                allow="clipboard-write"
                allowFullScreen
            ></iframe>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-2 pt-6">
                <Button asChild className="w-full">
                    <Link href={PANCAKESWAP_BUY_URL} target="_blank" rel="noopener noreferrer">Buy EGLIFE</Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                    <Link href={PANCAKESWAP_SELL_URL} target="_blank" rel="noopener noreferrer">Sell EGLIFE</Link>
                </Button>
            </CardFooter>
        </Card>
      </section>

      <section className="w-full py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold">Our Roadmap</h2>
            <p className="text-lg text-foreground/80 mt-2 max-w-3xl mx-auto">
              A glimpse into our journey. Follow our progress as we build the future of decentralized finance.
            </p>
          </div>
          <div className="relative">
            {/* Horizontal Line */}
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2 hidden md:block"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-0 relative">
              {roadmapData.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="flex md:flex-col items-start md:items-center gap-6 md:gap-4 text-center">
                    <div className={cn(
                      "relative z-10 flex items-center justify-center p-3 rounded-full border-2",
                      statusStyles[item.status as keyof typeof statusStyles]
                    )}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <div className="text-left md:text-center">
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-sm text-muted-foreground mb-1">{item.date}</p>
                      <p className="text-sm text-foreground/80 hidden md:block">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

       <section className="w-full py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold">Meet the Team</h2>
            <p className="text-lg text-foreground/80 mt-2">The passionate individuals driving the Eglife vision forward.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
                <Card key={member.name} className="text-center p-6">
                    <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarImage src={member.avatar} alt={member.name} data-ai-hint={member.aiHint} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-headline font-semibold">{member.name}</h3>
                    <p className="text-primary font-medium mb-2">{member.role}</p>
                    <CardContent>
                        <p className="text-foreground/80 mb-4">{member.bio}</p>
                        <div className="flex justify-center gap-4">
                        <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                            <Twitter className="w-5 h-5" />
                        </a>
                        <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                            <Linkedin className="w-5 h-5" />
                        </a>
                        </div>
                    </CardContent>
                </Card>
            ))}
            </div>
        </div>
      </section>
    </div>
  );
}

    
