
"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Smartphone, Globe, Lightbulb, Droplets, Flame, Wifi, Tv, School, Building, HandCoins, QrCode, Wallet, Banknote, IndianRupee } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

const futureServices = [
    { icon: School, title: "Tuition Fees" },
    { icon: Building, title: "Rent Payments" },
    { icon: HandCoins, title: "Loan EMIs" },
];


export default function ServicesPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold">EGPAY: Powered by EGLIFE</h1>
        <p className="text-lg text-foreground/80 mt-4 max-w-3xl mx-auto">
          Leveraging the power of the EGLIFE token to create a fast, secure, and low-cost payment ecosystem for your daily needs.
        </p>
      </div>
      
      <Card className="mb-12">
        <CardHeader>
            <CardTitle className="font-headline text-2xl">UPI Payment Services</CardTitle>
            <CardDescription>Send money, scan QR codes, and manage your finances with ease.</CardDescription>
        </CardHeader>
        <CardContent>
             <Tabs defaultValue="send" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="send">Send Money</TabsTrigger>
                    <TabsTrigger value="scan">Scan QR</TabsTrigger>
                    <TabsTrigger value="balance">Check Balance</TabsTrigger>
                </TabsList>

                <TabsContent value="send" className="mt-6">
                     <Tabs defaultValue="mobile" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="mobile">To Mobile Number</TabsTrigger>
                            <TabsTrigger value="bank">To Bank Account</TabsTrigger>
                        </TabsList>
                         <TabsContent value="mobile" className="pt-4">
                             <Card>
                                <CardContent className="pt-6 space-y-4">
                                     <div className="space-y-2">
                                        <Label htmlFor="mobile-number">Enter Mobile Number</Label>
                                        <Input id="mobile-number" type="tel" placeholder="10-digit mobile number" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="mobile-amount">Enter Amount</Label>
                                        <Input id="mobile-amount" type="number" placeholder="₹0.00" />
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button className="w-full">Proceed to Pay</Button>
                                </CardFooter>
                             </Card>
                        </TabsContent>
                         <TabsContent value="bank" className="pt-4">
                            <Card>
                                <CardContent className="pt-6 space-y-4">
                                     <div className="space-y-2">
                                        <Label htmlFor="account-number">Enter Account Number</Label>
                                        <Input id="account-number" type="text" placeholder="Recipient's account number" />
                                    </div>
                                      <div className="space-y-2">
                                        <Label htmlFor="ifsc-code">Enter IFSC Code</Label>
                                        <Input id="ifsc-code" type="text" placeholder="Bank's IFSC code" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="bank-amount">Enter Amount</Label>
                                        <Input id="bank-amount" type="number" placeholder="₹0.00" />
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button className="w-full">Proceed to Pay</Button>
                                </CardFooter>
                             </Card>
                        </TabsContent>
                     </Tabs>
                </TabsContent>

                <TabsContent value="scan">
                    <Card className="text-center flex flex-col items-center justify-center p-8 min-h-[250px]">
                        <QrCode className="w-24 h-24 text-muted-foreground mb-4"/>
                        <p className="text-muted-foreground">Position the QR code within the frame</p>
                        <Button variant="outline" className="mt-4">Open Camera</Button>
                    </Card>
                </TabsContent>

                <TabsContent value="balance">
                    <Card className="text-center p-8 min-h-[250px] flex flex-col justify-center">
                         <Wallet className="w-16 h-16 text-primary mx-auto mb-4"/>
                        <h3 className="text-xl font-semibold mb-2">Check Your EGLIFE Balance</h3>
                        <p className="text-muted-foreground mb-6">Click the button below to see your current balance.</p>
                        <Button size="lg">Check Balance</Button>
                    </Card>
                </TabsContent>
            </Tabs>
        </CardContent>
      </Card>


      <h2 className="text-3xl font-headline font-bold mb-8 text-center">Utility Bill Payments</h2>
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
           <div className="mt-12 flex flex-wrap justify-center items-center gap-8">
              {futureServices.map((service, index) => {
                const Icon = service.icon;
                return (
                  <div key={index} className="flex flex-col items-center gap-3 text-center">
                    <div className="p-4 bg-muted rounded-full">
                      <Icon className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <span className="font-semibold text-foreground/80">{service.title}</span>
                  </div>
                )
              })}
            </div>
      </div>
    </div>
  );
}

