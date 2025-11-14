
"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Cpu, History, Globe, TrendingUp, IndianRupee, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CryptoEducationPage() {
    const router = useRouter();
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
      setIsClient(true)
    }, [])

    return (
        <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-headline font-bold">Crypto Education Hub</h1>
                <p className="text-lg text-foreground/80 mt-4 max-w-3xl mx-auto">
                    Your comprehensive guide to understanding the world of cryptocurrency, from the basics to the future.
                </p>
            </div>

            <div className="space-y-12">
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-primary/10 rounded-md w-fit">
                                <DollarSign className="h-8 w-8 text-primary" />
                            </div>
                            <div>
                                <CardTitle className="font-headline text-3xl">What is Cryptocurrency?</CardTitle>
                                <CardDescription>The fundamentals of digital money.</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="prose prose-lg dark:prose-invert max-w-none">
                        <p>
                            A cryptocurrency is a digital or virtual currency that is secured by cryptography, which makes it nearly impossible to counterfeit or double-spend. Many cryptocurrencies are decentralized networks based on blockchain technology—a distributed ledger enforced by a disparate network of computers.
                        </p>
                        <p>
                            A defining feature of cryptocurrencies is that they are generally not issued by any central authority, rendering them theoretically immune to government interference or manipulation. They allow for secure online payments to be sent directly between two parties without the need for a financial institution like a bank.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                         <div className="flex items-center gap-4">
                            <div className="p-3 bg-primary/10 rounded-md w-fit">
                                <Cpu className="h-8 w-8 text-primary" />
                            </div>
                            <div>
                                <CardTitle className="font-headline text-3xl">How Does It Work?</CardTitle>
                                <CardDescription>Understanding blockchain and decentralization.</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="prose prose-lg dark:prose-invert max-w-none">
                        <p>
                            Cryptocurrencies run on a distributed public ledger called a <strong>blockchain</strong>, which is a record of all transactions updated and held by currency holders. Transactions are sent between peers using software called cryptocurrency wallets.
                        </p>
                        <p>
                            Each transaction is a block, which is then added to a chain of previous transactions. To ensure all copies of the blockchain are the same, the network uses consensus mechanisms (like Proof-of-Work or Proof-of-Stake). This process, known as mining or staking, is also how new coins are created. This decentralized structure is what gives crypto its autonomy and security.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                         <div className="flex items-center gap-4">
                            <div className="p-3 bg-primary/10 rounded-md w-fit">
                                <History className="h-8 w-8 text-primary" />
                            </div>
                            <div>
                                <CardTitle className="font-headline text-3xl">A Brief History of Crypto</CardTitle>
                                <CardDescription>From Cypherpunks to global finance.</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="prose prose-lg dark:prose-invert max-w-none">
                        <p>
                            The idea of digital cash has been around since the 1980s, but it wasn't until 2009 that the first decentralized cryptocurrency, <strong>Bitcoin</strong>, was created by an anonymous entity known as Satoshi Nakamoto. Bitcoin introduced the concept of the blockchain as a public ledger.
                        </p>
                        <p>
                            Following Bitcoin's success, many other cryptocurrencies, known as "altcoins," were created. In 2015, <strong>Ethereum</strong> launched, which introduced smart contracts—self-executing contracts with the terms of the agreement directly written into code. This innovation paved the way for decentralized finance (DeFi) and non-fungible tokens (NFTs), dramatically expanding the possibilities of blockchain technology.
                        </p>
                    </CardContent>
                </Card>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-4">
                                <Globe className="h-7 w-7 text-primary" />
                                <CardTitle className="font-headline text-2xl">Global Status</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="prose dark:prose-invert max-w-none">
                           <p>The global adoption of cryptocurrency is growing rapidly. Countries like El Salvador have made Bitcoin legal tender, while major financial institutions are beginning to offer crypto investment products. The regulatory landscape varies widely, from crypto-friendly hubs like Switzerland and Singapore to nations with stricter controls. Overall, there is a clear trend towards greater acceptance and integration into the global financial system.</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-4">
                                <IndianRupee className="h-7 w-7 text-primary" />
                                <CardTitle className="font-headline text-2xl">Status in India</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="prose dark:prose-invert max-w-none">
                            <p>India is one of the largest and fastest-growing crypto markets in the world. While the government's stance has evolved over time, recent regulations have focused on taxation rather than an outright ban. The introduction of a 30% tax on crypto gains and a 1% TDS on transactions indicates a move towards legitimizing and regulating the industry. Indian innovators and developers are at the forefront of the Web3 movement, building new projects and driving adoption.</p>
                        </CardContent>
                    </Card>
                 </div>

                <Card className="border-accent">
                    <CardHeader>
                         <div className="flex items-center gap-4">
                            <div className="p-3 bg-accent/10 rounded-md w-fit">
                                <TrendingUp className="h-8 w-8 text-accent" />
                            </div>
                            <div>
                                <CardTitle className="font-headline text-3xl">The Future of Cryptocurrency</CardTitle>
                                <CardDescription>What lies ahead for digital assets?</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="prose prose-lg dark:prose-invert max-w-none">
                        <p>
                            The future of cryptocurrency points towards wider mainstream adoption and deeper integration with traditional finance. We can expect to see more "real-world use cases" like EGLIFE, where tokens are used for payments, contracts, and services rather than just speculation.
                        </p>
                        <p>
                           Key trends to watch include the growth of Central Bank Digital Currencies (CBDCs), increased regulatory clarity, the expansion of the metaverse and Web3, and the continued innovation in blockchain technology to improve scalability and energy efficiency. Crypto is poised to become a fundamental layer of the new digital economy.
                        </p>
                    </CardContent>
                </Card>
            </div>
            {isClient &&
              <section className="w-full mt-16 pt-8 border-t">
                  <div className="container mx-auto px-4 md:px-6 flex justify-between">
                      <Button asChild variant="outline" onClick={() => router.back()}>
                          <Link href="#">
                              <ArrowLeft className="mr-2 h-4 w-4" /> Previous Page
                          </Link>
                      </Button>
                      <Button asChild>
                          <Link href="/contact">
                              Next Page <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                      </Button>
                  </div>
              </section>
            }
        </div>
    );
}
