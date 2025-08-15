"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { recommendContent } from "@/ai/flows/content-recommendation";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  interests: z.string().min(3, "Please list at least one interest."),
});

type FormData = z.infer<typeof formSchema>;

export function RecommendationForm() {
  const [recommendations, setRecommendations] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      interests: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setRecommendations(null);
    try {
      const result = await recommendContent(data);
      setRecommendations(result.recommendations);
    } catch (error) {
      console.error("Failed to get recommendations:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate recommendations. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Discover Content</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="interests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Interests</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., wellness, sustainability, community projects"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter a few interests, separated by commas.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? "Generating..." : "Get Recommendations"}
            </Button>
          </form>
        </Form>

        {recommendations && (
          <div className="mt-8 pt-6 border-t">
            <h3 className="text-2xl font-headline font-semibold mb-4">
              Here are your recommendations:
            </h3>
            <div className="prose dark:prose-invert max-w-none">
                <p>{recommendations}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
