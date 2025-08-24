
"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
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
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser && currentUser.email === "eglifetoken@gmail.com") {
        setUser(currentUser);
      } else {
        setUser(null);
        // Do not redirect from the register page
        if (pathname !== '/admin/register') {
            router.push("/login");
        }
      }
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [router, pathname]);

  // Allow access to register page without auth
  if (pathname === '/admin/register') {
      return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-4">Authenticating...</p>
      </div>
    );
  }
  
  if (!user) {
     // If not loading and no user, we redirect from useEffect.
     // To prevent a flash of content, we show the loader until redirect happens.
     return (
        <div className="flex h-screen w-full items-center justify-center bg-background">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="ml-4">Redirecting to login...</p>
      </div>
     );
  }

  // If loading is false and user exists, show the admin panel
  return (
    <div className="flex min-h-screen">
      <AdminSidebarWrapper />
      <main className="flex-1 p-4 md:p-8 bg-muted/40">{children}</main>
    </div>
  );
}
