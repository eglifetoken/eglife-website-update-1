import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { Linkedin, Twitter } from "lucide-react";
import { CheckCircle } from "lucide-react";

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

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-headline font-bold">About Eglife Hub</h1>
        <p className="text-lg text-foreground/80 mt-4 max-w-3xl mx-auto">
          EGLIFE Token is a decentralized BEP-20 cryptocurrency deployed on the BNB Smart Chain, designed to build a real-world utility-based token economy.
        </p>
      </div>

      <section className="mb-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-headline font-bold mb-4">Our Mission</h2>
             <ul className="space-y-4 text-lg text-foreground/80">
                <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                    <span>Provide real utility and day-to-day usage with EGLIFE Token.</span>
                </li>
                <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                    <span>Encourage mass adoption with zero-barrier participation.</span>
                </li>
                <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                    <span>Deliver transparency and decentralization via smart contract.</span>
                </li>
                <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                    <span>Enable earning, saving, and spending within the same ecosystem.</span>
                </li>
             </ul>
          </div>
          <div className="order-1 md:order-2">
            <Image
              src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=600"
              alt="Team working together"
              width={600}
              height={400}
              className="rounded-lg shadow-xl"
              data-ai-hint="diverse team"
            />
          </div>
        </div>
      </section>

      <section className="mb-24">
         <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
             <Image
              src="https://images.unsplash.com/photo-1534447677768-be436a0976f2?q=80&w=600"
              alt="Futuristic city with nature"
              width={600}
              height={400}
              className="rounded-lg shadow-xl"
              data-ai-hint="futuristic city"
            />
          </div>
          <div>
            <h2 className="text-3xl font-headline font-bold mb-4">Our Vision</h2>
            <p className="text-foreground/80 text-xl mb-4 leading-relaxed">
             To empower every generation with easy-to-use decentralized financial solutions backed by blockchain.
            </p>
          </div>
        </div>
      </section>

      <section>
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
      </section>
    </div>
  );
}
