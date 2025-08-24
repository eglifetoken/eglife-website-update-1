
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Users, PiggyBank, Settings, LogOut, BarChart } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

const adminNavLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/staking", label: "Staking", icon: PiggyBank },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

const Logo = () => (
    <div className="flex items-center gap-2">
         <Image src="/logo.png" alt="EGLIFE Logo" width={32} height={32} />
        <span className="text-xl font-headline font-bold">Admin</span>
    </div>
);

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
      router.push("/login");
    } catch (error) {
      console.error("Error signing out: ", error);
      toast({
        variant: "destructive",
        title: "Logout Failed",
        description: "There was an error while trying to log out. Please try again.",
      });
    }
  };

  return (
    <aside className="w-64 flex-shrink-0 bg-background border-r p-4 hidden md:flex flex-col">
      <div className="p-4 mb-4">
        <Link href="/admin">
            <Logo />
        </Link>
      </div>
      <nav className="flex-grow space-y-2">
        {adminNavLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
              isActive && "bg-muted text-primary"
            )}
          >
            <Icon className="h-5 w-5" />
            {link.label}
          </Link>
        )})}
      </nav>
      <div className="mt-auto p-4">
         <Button variant="outline" className="w-full justify-center gap-3" onClick={handleLogout}>
            <LogOut className="h-5 w-5" />
            Logout
         </Button>
      </div>
    </aside>
  );
}
