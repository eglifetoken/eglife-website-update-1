
"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ContactForm } from "@/components/contact-form";
import { Mail } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-headline font-bold">Feedback & Support</h1>
        <p className="text-lg text-foreground/80 mt-2 max-w-3xl mx-auto">We'd love to hear from you. Whether it's a suggestion, a complaint, or a question, please reach out.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div className="md:mt-16">
          <h2 className="text-2xl font-headline font-semibold mb-6">Contact Information</h2>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-md">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Email</h3>
                <a href="mailto:eglifetoken@gmail.com" className="text-accent hover:underline">eglifetoken@gmail.com</a>
                <p className="text-sm text-muted-foreground">The best way to reach us for any inquiry.</p>
              </div>
            </div>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Send us a Message</CardTitle>
            <CardDescription>Use the form below to submit your feedback, complaint, or suggestion.</CardDescription>
          </CardHeader>
          <CardContent>
            <ContactForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
