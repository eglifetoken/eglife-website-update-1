
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Users, PiggyBank, Settings, LogOut, BarChart } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";

const adminNavLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/staking", label: "Staking", icon: PiggyBank },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

const Logo = () => (
    <div className="flex items-center gap-2">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            width="24"
            height="24"
            className="text-primary"
            fill="currentColor"
            >
            <path d="M16 0 A16 16 0 0 0 0 16 A16 16 0 0 0 16 32 A16 16 0 0 0 32 16 A16 16 0 0 0 16 0 M16 4 A12 12 0 0 1 28 16 A12 12 0 0 1 16 28 A12 12 0 0 1 4 16 A12 12 0 0 1 16 4" />
            <path d="M22 8 L12 8 L12 12 L18 12 L18 14 L12 14 L12 18 L18 18 L18 20 L12 20 L12 24 L22 24" />
        </svg>
        <span className="text-lg font-headline font-bold">EGLIFE Admin</span>
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
