import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Landmark, Receipt, Store, ArrowRight, Smartphone, Globe } from "lucide-react";

const services = [
  {
    icon: Smartphone,
    title: "Seamless Money Transfer",
    description: "Instantly send and receive EGLIFE tokens with anyone, anywhere in the world, right from your digital wallet.",
    aiHint: "person using phone"
  },
  {
    icon: Receipt,
    title: "Utility Bill Payments",
    description: "Pay for your electricity, water, internet, and other essential services using EGLIFE tokens, simplifying your monthly bills.",
    aiHint: "online payment"
  },
  {
    icon: Store,
    title: "Business & Merchant Payments",
    description: "Accept EGLIFE at your business. Our platform provides easy integration for merchants to tap into a growing crypto economy.",
    aiHint: "modern storefront"
  },
  {
    icon: Globe,
    title: "Global Remittance",
    description: "A fast, secure, and low-cost way to send funds across borders, bypassing traditional banking fees and delays.",
    aiHint: "global network"
  }
];

export default function ServicesPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-headline font-bold">Eglife Digital Payments</h1>
        <p className="text-lg text-foreground/80 mt-4 max-w-3xl mx-auto">
          Leveraging the power of the EGLIFE token to create a fast, secure, and low-cost payment ecosystem for your daily needs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {services.map((service) => {
            const Icon = service.icon;
            return (
          <Card key={service.title} className="flex flex-col">
            <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-4">
                <div className="p-3 bg-primary/10 rounded-md">
                    <Icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                    <CardTitle className="font-headline text-2xl mb-1">{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                </div>
            </CardHeader>
            <CardContent className="flex-grow flex items-end">
                 <Button asChild variant="link" className="p-0 h-auto">
                    <Link href="/dapp">
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </CardContent>
          </Card>
        )})}
      </div>

       <div className="text-center mt-20">
          <h2 className="text-3xl font-headline font-bold">Building a Unified Payment Ecosystem</h2>
          <p className="text-lg text-foreground/80 mt-2 max-w-2xl mx-auto">
              Our vision is to create a seamless financial experience by integrating Eglife payments with the digital wallets and platforms you use every day, making transactions effortless and universal.
          </p>
           <div className="flex justify-center items-center gap-8 mt-8">
                <div className="p-4 bg-muted rounded-full">
                    <Landmark className="h-8 w-8 text-muted-foreground" />
                </div>
                 <div className="p-4 bg-muted rounded-full">
                    <Store className="h-8 w-8 text-muted-foreground" />
                </div>
                 <div className="p-4 bg-muted rounded-full">
                    <Smartphone className="h-8 w-8 text-muted-foreground" />
                </div>
           </div>
      </div>
    </div>
  );
}
