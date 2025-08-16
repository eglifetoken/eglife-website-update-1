
"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import Link from "next/link"
  import dynamic from "next/dynamic";

  const RegisterForm = dynamic(() => import('@/components/register-form').then(mod => mod.RegisterForm), {
    ssr: false,
    loading: () => <p>Loading form...</p>
  })
  
  export default function RegisterPage() {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] py-12">
        <Card className="mx-auto max-w-4xl w-full">
          <CardHeader>
            <CardTitle className="text-2xl font-headline">Create your EGLIFE Account</CardTitle>
            <CardDescription>
              Please provide your details for identity verification. This information is required to comply with financial regulations.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RegisterForm />
            <div className="mt-6 text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="underline text-accent">
                Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }
  

    
