
"use server"

import { z } from "zod"
import { auth, db } from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp, Timestamp } from "firebase/firestore";

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
    try {
        await signInWithEmailAndPassword(auth, values.email, values.password);
        return { success: true, message: "Logged in successfully!" };
    } catch (error: any) {
        console.error("Login error:", error.code, error.message);
        return { success: false, message: error.message };
    }
}


// Register Action
const registerFormSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
});

export async function registerUser(values: z.infer<typeof registerFormSchema>) {
    try {
        // Step 1: Create user in Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
        const user = userCredential.user;

        // A unique referral code is generated server-side for reliability
        const uniqueReferralCode = `EGLIFE-${user.uid.slice(0, 8).toUpperCase()}`;

        // Step 2: Save user data to Firestore
        await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            name: values.name,
            email: values.email,
            mobile: null,
            dob: null,
            country: null,
            address: null,
            city: null,
            state: null,
            postalCode: null,
            aadhar: null,
            pan: null,
            referredBy: null,
            referralCode: uniqueReferralCode,
            kycStatus: "Pending",
            stakingStatus: "Inactive",
            registrationDate: serverTimestamp(),
        });
        
        return { success: true, message: "Registration successful! Welcome to EGLIFE." };

    } catch (error: any) {
        console.error("Registration error:", error);
        // Handle specific Firebase errors
        if (error.code === 'auth/email-already-in-use') {
            return { success: false, message: "This email address is already in use." };
        }
        return { success: false, message: "An unexpected error occurred. Please try again." };
    }
}
