
"use client";

import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, CheckCircle, ShieldCheck, Printer } from "lucide-react";
import Link from 'next/link';
import { Suspense } from 'react';

const CertificateContent = () => {
    const searchParams = useSearchParams();
    const address = searchParams.get('address') || 'N/A';
    const stakedAmount = searchParams.get('staked') || '0';
    const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const certificateId = `EGL-STK-${address.slice(2, 10).toUpperCase()}`;

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] bg-muted/20 p-4 sm:p-6 md:p-8">
            <Card className="w-full max-w-4xl shadow-2xl border-primary/50 overflow-hidden">
                <CardHeader className="bg-primary/10 p-8 text-center space-y-4">
                    <Award className="h-16 w-16 mx-auto text-primary" />
                    <CardTitle className="text-4xl font-headline text-primary">Certificate of Achievement</CardTitle>
                    <CardDescription className="text-lg">This certificate is proudly presented to</CardDescription>
                </CardHeader>
                <CardContent className="p-8 md:p-12 space-y-8 text-center">
                    <div className="space-y-2">
                        <p className="text-2xl md:text-3xl font-bold font-mono break-all">{address}</p>
                        <p className="text-muted-foreground">for their active participation and contribution to the EGLIFE Ecosystem.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left bg-muted/50 p-6 rounded-lg">
                        <div className="flex items-center gap-4">
                            <CheckCircle className="h-8 w-8 text-green-500" />
                            <div>
                                <p className="font-semibold">Staked Amount</p>
                                <p className="text-xl font-bold">{parseFloat(stakedAmount).toLocaleString()} EGLIFE</p>
                            </div>
                        </div>
                         <div className="flex items-center gap-4">
                            <ShieldCheck className="h-8 w-8 text-primary" />
                            <div>
                                <p className="font-semibold">Issuance Date</p>
                                <p className="text-xl font-bold">{date}</p>
                            </div>
                        </div>
                    </div>

                    <div className="border-t pt-6 space-y-4">
                         <p className="text-muted-foreground">This certificate verifies that the wallet holder is a valued member of the EGLIFE staking community.</p>
                         <div className="font-mono text-sm bg-background p-3 rounded-md">
                            <p>Certificate ID: {certificateId}</p>
                         </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                         <Button onClick={() => window.print()}><Printer className="mr-2 h-4 w-4" /> Print Certificate</Button>
                         <Button asChild variant="outline">
                            <Link href="/staking">Back to Staking</Link>
                         </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};


export default function CertificatePage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading Certificate...</div>}>
            <CertificateContent />
        </Suspense>
    );
}

