"use server"

import { z } from "zod"

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

export async function loginUser(values: z.infer<typeof loginFormSchema>) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("Login attempt:", values.email);
    // In a real app, you would authenticate the user here.
    return { success: true, message: "Logged in successfully!" };
}


// Register Action
const registerFormSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
});

export async function registerUser(values: z.infer<typeof registerFormSchema>) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("Registration attempt:", values.email);
    // In a real app, you would create a new user here.
    return { success: true, message: "Registration successful!" };
}
