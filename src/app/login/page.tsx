import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { LoginForm } from "@/components/login-form"
  import Link from "next/link"
  
  export default function LoginPage() {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] py-12">
        <Card className="mx-auto max-w-sm w-full">
          <CardHeader>
            <CardTitle className="text-2xl font-headline">Admin Login</CardTitle>
            <CardDescription>
              Enter your admin credentials below to login to the dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
             <div className="mt-4 text-center text-sm">
                New user?{" "}
                <Link href="/register" className="underline text-accent">
                    Create an account
                </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }
  