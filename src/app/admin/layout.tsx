
"use client";

import AdminSidebarWrapper from "@/components/layout/admin-sidebar-wrapper";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // The authentication logic has been moved to the individual pages
  // to prevent layout-level redirect loops and ensure content is
  // only rendered for authenticated admins.
  return (
    <div className="flex min-h-screen">
      <AdminSidebarWrapper />
      <main className="flex-1 p-4 md:p-8 bg-muted/40">{children}</main>
    </div>
  );
}
