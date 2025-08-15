import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GitCommit, Lightbulb, Rocket, Target, Users, Leaf } from "lucide-react";

const roadmapData = [
  {
    date: "Q2 2023",
    title: "Project Inception",
    description: "Initial idea and concept development for the Eglife Token. Core team formation and initial whitepaper draft.",
    icon: Lightbulb,
    status: "completed",
  },
  {
    date: "Q3 2023",
    title: "Token Launch (IDO)",
    description: "Successful Initial DEX Offering. EGLIFE token becomes publicly available for trading.",
    icon: Rocket,
    status: "completed",
  },
  {
    date: "Q4 2023",
    title: "First Community Project Funded",
    description: "Funded a local reforestation project, planting over 1000 trees.",
    icon: Leaf,
    status: "completed",
  },
  {
    date: "Q1 2024",
    title: "Staking Platform Launch",
    description: "Launch of the official EGLIFE staking platform, allowing holders to earn passive rewards.",
    icon: GitCommit,
    status: "completed",
  },
  {
    date: "Q2 2024",
    title: "DApp V1 Release",
    description: "Release of the first version of our decentralized application, including wallet and basic features.",
    icon: Target,
    status: "in_progress",
  },
  {
    date: "Q3 2024",
    title: "Global Ambassador Program",
    description: "Establishment of a global ambassador program to expand community reach and engagement.",
    icon: Users,
    status: "upcoming",
  },
  {
    date: "Q4 2024",
    title: "Wellness Platform Integration",
    description: "Partnering with wellness apps to integrate EGLIFE as a rewards token for healthy activities.",
    icon: Lightbulb,
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
