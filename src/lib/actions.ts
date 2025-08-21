
"use server"

import { z } from "zod"
import { auth, db } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

// Contact Form Action
const contactFormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  message: z.string(),
});

export async function submitContactForm(values: z.infer<typeof contactFormSchema>) {
  // Simulate a delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // In a real app, you would process the form data here, e.g., send an email or save to a database.
  console.log("Contact form submitted:", values);
  
  // Simulate success
  return { success: true, message: "Message sent successfully!" };
}

// Login Action
const loginFormSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

export async function loginUser(values: z.infer<typeof loginFormSchema>): Promise<{ success: boolean; message?: string }> {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
        if (userCredential.user) {
            return { success: true };
        }
        return { success: false, message: "An unknown error occurred." };
    } catch (error: any) {
        console.error("Login error:", error.code, error.message);
        // Provide a more user-friendly error message
        const message = error.code === 'auth/invalid-credential' 
            ? 'Invalid email or password. Please try again.'
            : 'An error occurred during login.';
        return { success: false, message: message };
    }
}
