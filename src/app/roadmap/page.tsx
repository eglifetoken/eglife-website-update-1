import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GitCommit, Lightbulb, Rocket, Target, Users, Leaf, CheckCircle, Smartphone, Globe } from "lucide-react";

const roadmapData = [
  {
    date: "Q2 2025",
    title: "Foundation & Pre-Launch",
    description: "Finalization and deployment of the BEP-20 smart contract, rigorous internal testing, launch of our official website, and publication of the whitepaper.",
    icon: Rocket,
    status: "completed",
  },
  {
    date: "Q3 2025",
    title: "Security & Market Preparation",
    description: "Commissioning a full, independent smart contract audit from a reputable security firm and pursuing listings on major crypto data aggregators like CoinGecko and CoinMarketCap.",
    icon: CheckCircle,
    status: "completed",
  },
  {
    date: "Q4 2025",
    title: "Community Growth & Market Entry",
    description: "Creation of the initial liquidity pool on PancakeSwap, initiation of our first Airdrop and Referral Campaigns, and launch of our on-chain staking platform.",
    icon: Users,
    status: "in_progress",
  },
  {
    date: "Q1 2026",
    title: "Platform Development & Beta Launch",
    description: "Release of the beta version of the EGLIFE App, giving the community a first look at the wallet and payment functionalities, while working on integrating with third-party utility API providers.",
    icon: Lightbulb,
    status: "upcoming",
  },
  {
    date: "Q2 2026",
    title: "Full Ecosystem Launch",
    description: "Public launch of EGPAY v1, our fully-featured utility payment application, enabling seamless bill payments and mobile recharges using EGLIFE tokens.",
    icon: Smartphone,
    status: "upcoming",
  },
  {
    date: "Q3 2026",
    title: "Merchant Integration & POS Support",
    description: "Development of the necessary infrastructure to support Point-of-Sale (POS) systems and merchant gateways, allowing EGLIFE to be used for everyday purchases.",
    icon: Target,
    status: "upcoming",
  },
  {
    date: "Q4 2026",
    title: "Global Expansion & New Utilities",
    description: "Broadening our focus to include international markets and integrating additional utility services such as travel bookings and event ticketing.",
    icon: Globe,
    status: "upcoming",
  },
  {
    date: "2027 & Beyond",
    title: "Decentralized Governance & DAO",
    description: "Transitioning towards a fully decentralized autonomous organization (DAO) to empower EGLIFE token holders with governance rights over the project's future.",
    icon: GitCommit,
    status: "upcoming",
  },
];

const statusStyles = {
    completed: "border-primary bg-primary/10 text-primary",
    in_progress: "border-accent bg-accent/10 text-accent",
    upcoming: "border-muted-foreground bg-muted-foreground/10 text-muted-foreground",
}

export default function RoadmapPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-headline font-bold">Our Roadmap</h1>
        <p className="text-lg text-foreground/80 mt-2">Follow our journey as we build the future of the Eglife ecosystem.</p>
      </div>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-border hidden md:block"></div>

        <div className="space-y-12">
          {roadmapData.map((item, index) => {
            const Icon = item.icon;
            const isEven = index % 2 === 0;
            return (
              <div key={index} className="relative md:flex items-center" style={{ justifyContent: isEven ? 'flex-start' : 'flex-end' }}>
                <div className={`md:w-5/12 ${isEven ? 'md:pr-8' : 'md:pl-8 md:order-2'}`}>
                  <Card className={`w-full ${statusStyles[item.status as keyof typeof statusStyles]}`}>
                    <CardHeader>
                      <CardTitle className="font-headline flex items-center justify-between">
                        <span>{item.title}</span>
                        <span className="text-sm font-normal text-foreground/70">{item.date}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{item.description}</p>
                    </CardContent>
                  </Card>
                </div>
                <div className={`absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background border-2 ${statusStyles[item.status as keyof typeof statusStyles]} hidden md:block`}>
                  <Icon className="w-6 h-6" />
                </div>
                 <div className="md:w-5/12"></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
