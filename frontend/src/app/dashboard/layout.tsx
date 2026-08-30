'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import { Home, List, Star, Settings } from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading, user } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [loading, isAuthenticated, router]);

  if (!mounted || loading || !isAuthenticated) {
    return <div className="flex-1 flex justify-center items-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-coral"></div></div>;
  }

  const navItems = [
    { name: 'Overview', href: '/dashboard', icon: Home },
    { name: 'My Properties', href: '/dashboard/properties', icon: List },
    { name: 'Reviews', href: '/dashboard/reviews', icon: Star },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];

  return (
    <div className="flex-1 flex flex-col md:flex-row bg-warm-white dark:bg-dark-void transition-colors duration-300">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white dark:bg-dark-surface border-r border-mist/30 dark:border-dark-border h-full md:min-h-[calc(100vh-64px)] shadow-sm dark:shadow-none z-10">
        <div className="p-6">
          <div className="w-12 h-12 bg-coral/10 dark:bg-coral/20 text-coral rounded-xl flex items-center justify-center text-xl font-heading font-extrabold mb-4 border border-coral/20 dark:border-coral/30 shadow-sm dark:shadow-none">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <h2 className="font-heading font-bold text-xl text-charcoal dark:text-dark-text tracking-tight">{user?.name || 'User'}</h2>
          <p className="text-sm text-charcoal/50 dark:text-dark-muted font-medium capitalize mb-8">{user?.role || 'Student'}</p>
        </div>
        
        <nav className="px-4 pb-6 space-y-1">
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 text-charcoal/70 dark:text-dark-muted hover:bg-coral/5 dark:hover:bg-coral/10 hover:text-coral dark:hover:text-coral rounded-lg transition-colors font-medium border border-transparent hover:border-coral/10 dark:hover:border-coral/20"
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto bg-warm-white dark:bg-dark-void">
        {children}
      </main>
    </div>
  );
}
