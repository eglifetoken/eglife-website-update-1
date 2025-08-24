
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, UserPlus } from "lucide-react";
import Link from "next/link";

export default function AdminRegisterPage() {
    const [email, setEmail] = useState("eglifetoken@gmail.com");
    const [password, setPassword] = useState("");
    const [isRegistering, setIsRegistering] = useState(false);
    const { toast } = useToast();
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (email !== "eglifetoken@gmail.com") {
            toast({
                variant: "destructive",
                title: "Registration Failed",
                description: "Only the designated admin email can be registered.",
            });
            return;
        }
        if (password.length < 6) {
            toast({
                variant: "destructive",
                title: "Weak Password",
                description: "Password must be at least 6 characters long.",
            });
            return;
        }

        setIsRegistering(true);
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            toast({
                title: "Registration Successful!",
                description: "You can now log in with your new credentials.",
            });
            router.push("/login");
        } catch (error: any) {
             toast({
                variant: "destructive",
                title: "Registration Failed",
                description: error.message || "An unknown error occurred. The admin user may already exist.",
            });
        } finally {
            setIsRegistering(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] py-12">
            <Card className="mx-auto max-w-sm w-full">
                <CardHeader className="text-center">
                    <div className="mx-auto bg-primary/10 rounded-full p-3 w-fit mb-4">
                        <UserPlus className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-2xl font-headline">Admin Registration</CardTitle>
                    <CardDescription>
                        Set the password for the primary administrator account. This can only be done once.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleRegister} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Admin Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                readOnly
                                className="text-center"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Set Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Choose a secure password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={isRegistering}
                            />
                        </div>
                        <Button type="submit" className="w-full" disabled={isRegistering}>
                            {isRegistering ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Registering...
                                </>
                            ) : (
                                "Create Admin Account"
                            )}
                        </Button>
                    </form>
                     <div className="mt-4 text-center text-sm">
                        Already have an account?{" "}
                        <Link href="/login" className="underline text-accent">
                           Login
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
