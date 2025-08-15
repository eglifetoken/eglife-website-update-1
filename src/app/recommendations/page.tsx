import { RecommendationForm } from "@/components/recommendation-form";
import { Lightbulb } from "lucide-react";

export default function RecommendationsPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
            <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4">
                <Lightbulb className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-headline font-bold">Personalized Content</h1>
            <p className="text-lg text-foreground/80 mt-2">
                Tell us your interests, and our AI will recommend relevant content from the Egli ecosystem, just for you.
            </p>
        </div>
        <RecommendationForm />
      </div>
    </div>
  );
}
