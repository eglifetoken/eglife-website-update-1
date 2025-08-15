
"use server"

import { z } from "zod"
import { randomUUID } from "crypto"

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
    name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  mobile: z.string().regex(/^\d{10}$/, { message: "Please enter a valid 10-digit mobile number."}),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
  country: z.string({
    required_error: "Please select a country.",
  }),
  address: z.string().min(10, { message: "Please enter a full address."}),
  city: z.string().min(2, { message: "Please enter a city."}),
  state: z.string().min(2, { message: "Please enter a state or province."}),
  postalCode: z.string().min(4, { message: "Please enter a postal code."}),
  aadhar: z.string().regex(/^\d{12}$/, { message: "Please enter a valid 12-digit Aadhar number."}),
  pan: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, { message: "Please enter a valid PAN number."}),
  referralCode: z.string().optional(),
  // Note: File handling in React Hook Form with server actions is complex.
  // We're adding the fields to the schema for structure, but not validating the file itself here.
  // The actual file upload would need to be handled via a separate process or endpoint.
  aadharFrontUpload: z.any().optional(),
  aadharBackUpload: z.any().optional(),
  panUpload: z.any().optional(),
  kycConsent: z.boolean().default(false).refine(value => value === true, {
    message: "You must agree to the identity verification.",
  }),
});

export async function registerUser(values: z.infer<typeof registerFormSchema>) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real app, you would create a new user and trigger a KYC verification flow here.
    console.log("Registration attempt:", values);

    // Generate a unique ID for the new user.
    const userId = randomUUID();
    const referralCode = `EGLIFE-${userId.slice(0, 8).toUpperCase()}`;

    console.log(`New user registered. Their unique Referral Code is: ${referralCode}`);
    
    // In a real application, you would save the user to the database along with their generated referralCode.
    
    return { success: true, message: "Registration successful!" };
}

    
