
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import AdminSidebarWrapper from "@/components/layout/admin-sidebar-wrapper";
import { Loader2 } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // Check if there is a user and if their email is the admin email
      if (currentUser && currentUser.email === "eglifetoken@gmail.com") {
        setUser(currentUser);
      } else {
        // If not an admin or no user, redirect to login
        router.push("/login");
      }
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    // This will be briefly shown before the redirect kicks in
    return null;
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebarWrapper />
      <main className="flex-1 p-4 md:p-8 bg-muted/40">{children}</main>
    </div>
  );
}
