import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet } from "lucide-react";

export default function DappPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12 flex items-center justify-center min-h-[calc(100vh-10rem)]">
      <Card className="max-w-md w-full text-center">
        <CardHeader>
          <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4">
            <Wallet className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-3xl font-headline">Egli DApp</CardTitle>
          <CardDescription>The gateway to the Egli Life Token ecosystem.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-6 text-foreground/80">
            Connect your wallet to interact with our staking platform, participate in governance, and access exclusive features.
          </p>
          <Button size="lg" className="w-full">
            Connect Wallet
          </Button>
          <p className="text-xs text-muted-foreground mt-4">
            The full DApp is under development. This button is a placeholder for wallet integration.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
