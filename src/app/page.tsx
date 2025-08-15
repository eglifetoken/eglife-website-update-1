
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Leaf, Users, Target, Eye, CheckCircle, GitCommit } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <section className="w-full py-20 md:py-32 bg-primary/10 text-center">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tighter mb-4">
            Welcome to Eglife Hub
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-foreground/80 mb-8">
            Discover the Eglife Token (EGLIFE), a decentralized BEP-20 cryptocurrency on the BNB Smart Chain. EGLIFE is designed to bridge the gap between cryptocurrency and real-world utility, creating a stable token economy for long-term value. Through our EGPAY ecosystem, you can use EGLIFE for utility payments, staking, and more. Join us in building the future of decentralized finance.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/whitepaper">Read Whitepaper</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/dapp">Explore Ecosystem</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="w-full py-16 md:py-24">
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
              <CardContent className="flex-grow">
                <p className="text-xl text-foreground/80 leading-relaxed">
                  To empower every generation with easy-to-use decentralized financial solutions backed by blockchain.
                </p>
              </CardContent>
            </Card>
            <Card className="flex flex-col">
              <CardHeader>
                 <h2 className="text-3xl font-headline font-bold">Our Mission</h2>
              </CardHeader>
              <CardContent className="flex-grow">
                  <ul className="space-y-4 text-lg text-foreground/80">
                      <li className="flex items-start">
                          <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 flex-shrink-0" />
                          <span>Provide real utility and day-to-day usage with EGLIFE Token.</span>
                      </li>
                      <li className="flex items-start">
                          <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 flex-shrink-0" />
                          <span>Encourage mass adoption with zero-barrier participation.</span>
                      </li>
                      <li className="flex items-start">
                          <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 flex-shrink-0" />
                          <span>Deliver transparency and decentralization via smart contract.</span>
                      </li>
                      <li className="flex items-start">
                          <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 flex-shrink-0" />
                          <span>Enable earning, saving, and spending within the same ecosystem.</span>
                      </li>
                  </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="w-full py-16 md:py-24 bg-primary/10">
        <div className="container mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <Image
              src="/logo.png"
              alt="Eglife Token"
              width={600}
              height={400}
              className="rounded-lg shadow-xl"
              data-ai-hint="abstract blockchain"
            />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-headline font-bold mb-6">About the Eglife Token</h2>
            <p className="text-lg text-foreground/80 mb-4">
              The Eglife Token (EGLIFE) is more than just a cryptocurrency. It's the key to a new ecosystem designed to reward positive actions and fund projects that align with our core values.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Target className="w-6 h-6 text-accent mr-3 mt-1 flex-shrink-0" />
                <span><strong className="font-headline">Purpose:</strong> To create a self-sustaining economy that supports wellness, sustainability, and community initiatives.</span>
              </li>
              <li className="flex items-start">
                <Users className="w-6 h-6 text-accent mr-3 mt-1 flex-shrink-0" />
                <span><strong className="font-headline">Initiatives:</strong> Funding for green projects, wellness workshops, and local community-building events.</span>
              </li>
              <li className="flex items-start">
                <GitCommit className="w-6 h-6 text-accent mr-3 mt-1 flex-shrink-0" />
                <span><strong className="font-headline">Future Goals:</strong> Expanding our DApp ecosystem, forging new partnerships, and launching a global community grant program.</span>
              </li>
            </ul>
             <Button asChild size="lg" className="mt-8">
              <Link href="/roadmap">View Our Roadmap</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
