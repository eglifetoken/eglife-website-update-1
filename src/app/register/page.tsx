import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { RegisterForm } from "@/components/register-form"
  import Link from "next/link"
  
  export default function RegisterPage() {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] py-12">
        <Card className="mx-auto max-w-2xl w-full">
          <CardHeader>
            <CardTitle className="text-2xl font-headline">Create your EGLIFE Account</CardTitle>
            <CardDescription>
              Please provide your details for identity verification.
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
  