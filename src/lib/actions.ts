
"use server"

import { z } from "zod"
import { randomUUID } from "crypto"
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
  // Note: File handling is not implemented in this action.
  aadharFrontUpload: z.any().optional(),
  aadharBackUpload: z.any().optional(),
  panUpload: z.any().optional(),
  kycConsent: z.boolean().default(false).refine(value => value === true, {
    message: "You must agree to the identity verification.",
  }),
});

export async function registerUser(values: z.infer<typeof registerFormSchema>) {
    try {
        // Step 1: Create user in Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
        const user = userCredential.user;

        // Step 2: Generate a unique referral code
        const referralCode = `EGLIFE-${randomUUID().slice(0, 8).toUpperCase()}`;

        // Step 3: Save user data to Firestore
        await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            name: values.name,
            email: values.email,
            mobile: values.mobile,
            dob: Timestamp.fromDate(values.dob),
            country: values.country,
            address: values.address,
            city: values.city,
            state: values.state,
            postalCode: values.postalCode,
            aadhar: values.aadhar,
            pan: values.pan,
            referredBy: values.referralCode || null,
            referralCode: referralCode,
            kycStatus: "Pending",
            stakingStatus: "Inactive",
            registrationDate: serverTimestamp(),
        });
        
        return { success: true, message: "Registration successful! Your account is pending verification." };

    } catch (error: any) {
        console.error("Registration error:", error);
        // Handle specific Firebase errors
        if (error.code === 'auth/email-already-in-use') {
            return { success: false, message: "This email address is already in use." };
        }
        return { success: false, message: "An unexpected error occurred. Please try again." };
    }
}
