"use client"

import { Boxes, BarChart3, Users, Package, Cloud, Mail, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const sidebarItems = [
  { icon: Boxes, href: '/' },
  { icon: BarChart3, href: '/analytics' },
  { icon: Users, href: '/customers' },
  { icon: Package, href: '/products' },
  { icon: Cloud, href: '/cloud' },
  { icon: Mail, href: '/mail' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-16 bg-white border-r flex flex-col items-center py-4">
      <div className="mb-8">
        <Boxes className="h-8 w-8 text-indigo-600" />
      </div>
      {sidebarItems.map(({ icon: Icon, href }, index) => (
        <Link key={index} href={href} className={`mb-4 p-2 rounded-md ${pathname === href ? 'bg-gray-100' : ''}`}>
          <Icon className={`h-6 w-6 ${pathname === href ? 'text-indigo-600' : 'text-gray-400'}`} />
        </Link>
      ))}
      <div className="mt-auto">
        <Link href="/settings" className={`p-2 rounded-md ${pathname === '/settings' ? 'bg-gray-100' : ''}`}>
          <Settings className={`h-6 w-6 ${pathname === '/settings' ? 'text-indigo-600' : 'text-gray-400'}`} />
        </Link>
      </div>
    </div>
  );
}