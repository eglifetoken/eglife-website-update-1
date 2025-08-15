import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Leaf, Users, Target, Heart } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <section className="w-full py-20 md:py-32 bg-primary/10 text-center">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tighter mb-4">
            Welcome to Eglife Hub
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-foreground/80 mb-8">
            Discover the Eglife Token (EGLIFE), your gateway to a decentralized world dedicated to fostering wellness, sustainability, and community. Eglife is more than a project; it's a movement to create a regenerative economy that rewards positive contributions to society and the planet. Join us in building a brighter, more equitable future for all.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/whitepaper">Read Whitepaper</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="w-full py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12">Our Mission</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center bg-transparent border-none shadow-none">
              <CardHeader className="flex flex-col items-center">
                <div className="p-4 bg-accent/20 rounded-full mb-4">
                  <Heart className="w-10 h-10 text-accent" />
                </div>
                <CardTitle className="font-headline text-2xl">Wellness</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Promoting a holistic approach to well-being, encompassing physical, mental, and spiritual health for a balanced life.</p>
              </CardContent>
            </Card>
            <Card className="text-center bg-transparent border-none shadow-none">
              <CardHeader className="flex flex-col items-center">
                <div className="p-4 bg-primary/20 rounded-full mb-4">
                  <Leaf className="w-10 h-10 text-primary" />
                </div>
                <CardTitle className="font-headline text-2xl">Sustainability</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Championing eco-friendly practices and supporting projects that protect our planet for future generations.</p>
              </CardContent>
            </Card>
            <Card className="text-center bg-transparent border-none shadow-none">
              <CardHeader className="flex flex-col items-center">
                 <div className="p-4 bg-secondary-foreground/20 rounded-full mb-4">
                  <Users className="w-10 h-10 text-secondary-foreground" />
                </div>
                <CardTitle className="font-headline text-2xl">Community</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Building a strong, inclusive community that collaborates on projects and supports one another's growth.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="w-full py-16 md:py-24 bg-primary/10">
        <div className="container mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <Image 
              src="https://images.unsplash.com/photo-1518546305921-a202SPAM-BOT54ab?q=80&w=600"
              alt="Eglife Token"
              width={600}
              height={400}
              className="rounded-lg shadow-xl"
              data-ai-hint="abstract nature"
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
                <Leaf className="w-6 h-6 text-accent mr-3 mt-1 flex-shrink-0" />
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
