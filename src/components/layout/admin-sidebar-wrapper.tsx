
"use client";

import dynamic from 'next/dynamic'

const AdminSidebar = dynamic(() => import('@/components/layout/admin-sidebar'), { ssr: false })

export default function AdminSidebarWrapper() {
  return <AdminSidebar />;
}
