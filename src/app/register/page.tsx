
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
        <Card className="mx-auto max-w-sm w-full">
          <CardHeader>
            <CardTitle className="text-2xl font-headline">Create an Account</CardTitle>
            <CardDescription>
              Enter your details below to get started.
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
