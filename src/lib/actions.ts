
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
        if (values.email.toLowerCase() !== "eglifetoken@gmail.com") {
            return { success: false, message: "This email is not authorized for admin access." };
        }
        
        await signInWithEmailAndPassword(auth, values.email, values.password);
        
        return { success: true };

    } catch (error: any) {
        console.error("Login error:", error.code, error.message);
        
        let message = "An error occurred during login. Please try again.";
        if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
            message = 'Invalid email or password. Please check your credentials.';
        }
        
        return { success: false, message: message };
    }
}

