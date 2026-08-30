'use client';

import Link from 'next/link';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../ui/button';
import { useEffect, useState } from 'react';
import { ThemeToggle } from '../theme/ThemeToggle';

export const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="border-b border-mist/30 dark:border-dark-border bg-warm-white/90 dark:bg-dark-void/90 backdrop-blur-md sticky top-0 z-50 transition-colors duration-300">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-1">
          <span className="text-xl font-heading text-charcoal dark:text-dark-text font-extrabold tracking-tight">
            Uni<span className="text-coral">Nest</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link href="/listings" className="text-sm font-medium text-charcoal/70 dark:text-dark-muted hover:text-coral dark:hover:text-coral border-b-2 border-transparent hover:border-coral dark:hover:border-coral transition-colors py-1">
            Listings
          </Link>
          <Link href="/map" className="text-sm font-medium text-charcoal/70 dark:text-dark-muted hover:text-coral dark:hover:text-coral border-b-2 border-transparent hover:border-coral dark:hover:border-coral transition-colors py-1">
            Map
          </Link>
          <Link href="/ai-search" className="text-sm font-medium text-charcoal/70 dark:text-dark-muted hover:text-coral dark:hover:text-coral border-b-2 border-transparent hover:border-coral dark:hover:border-coral transition-colors py-1">
            AI Search
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          {mounted && isAuthenticated ? (
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="text-sm font-medium text-charcoal/70 dark:text-dark-muted hover:text-coral dark:hover:text-coral transition-colors">
                Dashboard
              </Link>
              <Button variant="outline" size="sm" onClick={logout} className="dark:border-dark-border dark:text-dark-text dark:hover:bg-dark-elevated">Logout</Button>
            </div>
          ) : (
            mounted && (
              <div className="flex items-center gap-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="dark:text-dark-text dark:hover:bg-dark-elevated">Login</Button>
                </Link>
                <Link href="/register">
                  <Button size="sm">Register</Button>
                </Link>
              </div>
            )
          )}
        </div>
      </div>
    </nav>
  );
};
