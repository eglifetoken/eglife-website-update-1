
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { registerUser } from "@/lib/actions"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { CalendarIcon, UploadCloud } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"


const formSchema = z.object({
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
})

// A simplified list of countries for the example.
// In a real application, you might want a more comprehensive list.
const countries = [
    { code: "IN", name: "India" },
    { code: "US", name: "United States" },
    { code: "CA", name: "Canada" },
    { code: "GB", name: "United Kingdom" },
    { code: "AU", name: "Australia" },
    { code: "NG", name: "Nigeria" },
];


export function RegisterForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            mobile: "",
            password: "",
            referralCode: "",
            kycConsent: false,
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);
        // In a real app, you would handle the file uploads here, likely by
        // sending them to a secure storage service and passing the URL/ID
        // to the registerUser action.
        console.log("Form values (excluding files):", {
            ...values,
            aadharFrontUpload: undefined,
            aadharBackUpload: undefined,
            panUpload: undefined
        });

        try {
            const result = await registerUser(values);
            if (result.success) {
                toast({
                    title: "Registration Submitted!",
                    description: result.message,
                });
                form.reset();
                // Here you would typically redirect the user e.g. router.push('/pending-verification')
            } else {
                 toast({
                    variant: "destructive",
                    title: "Registration Failed",
                    description: result.message,
                })
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Registration Failed",
                description: "An error occurred. Please check your details and try again.",
            })
        } finally {
            setIsSubmitting(false);
        }
    }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Personal & Account Info */}
        <div className="space-y-4">
             <h3 className="text-lg font-medium font-headline border-b pb-2">Personal & Account Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                        <Input type="text" placeholder="As per your government ID" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                    control={form.control}
                    name="dob"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                        <FormLabel>Date of Birth</FormLabel>
                        <Popover>
                            <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                variant={"outline"}
                                className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                )}
                                >
                                {field.value ? (
                                    format(field.value, "PPP")
                                ) : (
                                    <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                            </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                date > new Date() || date < new Date("1900-01-01")
                                }
                                initialFocus
                                captionLayout="dropdown-buttons"
                                fromYear={1950}
                                toYear={new Date().getFullYear() - 18}
                            />
                            </PopoverContent>
                        </Popover>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Mobile Number</FormLabel>
                    <FormControl>
                        <Input type="tel" placeholder="9876543210" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                        <Input type="email" placeholder="m@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                    <FormItem className="md:col-span-2">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
        </div>

        {/* Address Information */}
         <div className="space-y-4">
             <h3 className="text-lg font-medium font-headline border-b pb-2">Address Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Country of Residence</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select your country" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                            {countries.map(country => (
                                <SelectItem key={country.code} value={country.name}>
                                {country.name}
                                </SelectItem>
                            ))}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Street Address</FormLabel>
                        <FormControl>
                            <Input type="text" placeholder="123 Main Street" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:col-span-2">
                    <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="Mumbai" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>State / Province</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="Maharashtra" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    <FormField
                        control={form.control}
                        name="postalCode"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Postal Code</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="400001" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </div>
        </div>

        {/* KYC & Referral */}
        <div className="space-y-4">
            <h3 className="text-lg font-medium font-headline border-b pb-2">Identity Verification (India) & Referral</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <FormField
                    control={form.control}
                    name="aadhar"
                    render={({ field }) => (
                        <FormItem className="md:col-span-2">
                        <FormLabel>Aadhar Number</FormLabel>
                        <FormControl>
                            <Input placeholder="XXXX XXXX XXXX" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="aadharFrontUpload"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Upload Aadhar Card (Front)</FormLabel>
                        <FormControl>
                             <Input id="aadhar-front-upload" type="file" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="aadharBackUpload"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Upload Aadhar Card (Back)</FormLabel>
                        <FormControl>
                             <Input id="aadhar-back-upload" type="file" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="pan"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>PAN Number</FormLabel>
                        <FormControl>
                            <Input placeholder="ABCDE1234F" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="panUpload"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Upload PAN Card</FormLabel>
                        <FormControl>
                            <Input id="pan-upload" type="file" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="referralCode"
                    render={({ field }) => (
                        <FormItem className="md:col-span-2">
                        <FormLabel>Referral Code (Optional)</FormLabel>
                        <FormControl>
                            <Input type="text" placeholder="Enter referral code" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </div>

        <FormField
        control={form.control}
        name="kycConsent"
        render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
            <FormControl>
                <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                />
            </FormControl>
            <div className="space-y-1 leading-none">
                <FormLabel>
                I confirm my identity and agree to the terms.
                </FormLabel>
                <FormDescription>
                By checking this box, you certify that the information provided is true and agree to our identity verification and terms of service.
                </FormDescription>
                <FormMessage />
            </div>
            </FormItem>
        )}
        />
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Submitting for Verification..." : "Create Account"}
        </Button>
      </form>
    </Form>
  )
}
