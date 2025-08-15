import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ContactForm } from "@/components/contact-form";
import { Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-headline font-bold">Get In Touch</h1>
        <p className="text-lg text-foreground/80 mt-2">We'd love to hear from you. Reach out with any questions or inquiries.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-headline font-semibold mb-6">Contact Information</h2>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-md">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Email</h3>
                <a href="mailto:info@eglifetoken.xyz" className="text-accent hover:underline">info@eglifetoken.xyz</a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-md">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Phone</h3>
                <p className="text-foreground/80">(123) 456-7890</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-md">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Office</h3>
                <p className="text-foreground/80">123 Wellness Way, Sustania, Earth</p>
              </div>
            </div>
          </div>
          <div className="mt-8 rounded-lg overflow-hidden shadow-lg">
             <Image 
                src="https://placehold.co/600x400.png"
                alt="Map to Eglife Hub office"
                width={600}
                height={400}
                className="w-full"
                data-ai-hint="world map"
            />
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Send us a Message</CardTitle>
            <CardDescription>Fill out the form below and we'll get back to you as soon as possible.</CardDescription>
          </CardHeader>
          <CardContent>
            <ContactForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
