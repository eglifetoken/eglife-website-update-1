import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Smartphone, Globe, Lightbulb, Droplets, Flame, Wifi, Tv } from "lucide-react";

const services = [
  {
    icon: Smartphone,
    title: "Mobile Recharge",
    description: "Instantly top-up your prepaid mobile plan or pay your postpaid bill.",
    aiHint: "mobile phone"
  },
  {
    icon: Lightbulb,
    title: "Electricity Bill",
    description: "Pay your electricity bills from various providers across the country.",
    aiHint: "lightbulb idea"
  },
  {
    icon: Droplets,
    title: "Water Bill",
    description: "Settle your water bills quickly and securely with EGLIFE tokens.",
    aiHint: "water droplets"
  },
  {
    icon: Flame,
    title: "Piped Gas",
    description: "Pay for your piped gas connection without any hassle.",
    aiHint: "gas flame"
  },
   {
    icon: Wifi,
    title: "Broadband/Landline",
    description: "Clear your internet and landline dues in a few simple steps.",
    aiHint: "wifi symbol"
  },
   {
    icon: Tv,
    title: "DTH Recharge",
    description: "Recharge your DTH service to enjoy uninterrupted entertainment.",
    aiHint: "television screen"
  },
];

export default function ServicesPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-headline font-bold">EGPAY: Powered by EGLIFE</h1>
        <p className="text-lg text-foreground/80 mt-4 max-w-3xl mx-auto">
          Leveraging the power of the EGLIFE token to create a fast, secure, and low-cost payment ecosystem for your daily needs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => {
            const Icon = service.icon;
            return (
          <Card key={service.title} className="flex flex-col hover:shadow-lg transition-shadow">
            <CardHeader>
                <div className="p-3 bg-primary/10 rounded-md w-fit mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="font-headline text-xl mb-1">{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex items-end">
                 <Button asChild variant="link" className="p-0 h-auto text-sm text-accent">
                    <Link href="#">
                        Pay Now <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </CardContent>
          </Card>
        )})}
      </div>

       <div className="text-center mt-20">
          <h2 className="text-3xl font-headline font-bold">And Much More...</h2>
          <p className="text-lg text-foreground/80 mt-2 max-w-2xl mx-auto">
              Our vision is to create a seamless financial experience by integrating EGPAY with the services you use every day, making transactions effortless and universal.
          </p>
           <div className="flex justify-center items-center gap-8 mt-8">
                <div className="p-4 bg-muted rounded-full">
                    <Smartphone className="h-8 w-8 text-muted-foreground" />
                </div>
                 <div className="p-4 bg-muted rounded-full">
                    <Globe className="h-8 w-8 text-muted-foreground" />
                </div>
                 <div className="p-4 bg-muted rounded-full">
                    <Lightbulb className="h-8 w-8 text-muted-foreground" />
                </div>
           </div>
      </div>
    </div>
  );
}
