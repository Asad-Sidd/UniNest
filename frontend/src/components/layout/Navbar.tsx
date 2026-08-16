'use client';

import Link from 'next/link';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../ui/button';
import { useEffect, useState } from 'react';

export const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="border-b border-sand-shadow/20 bg-night-blue/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-heading text-sand-tan uppercase tracking-widest">
            UniNest
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link href="/listings" className="text-sm font-medium text-papyrus/80 hover:text-sand-tan border-b-2 border-transparent hover:border-sand-tan transition-colors py-1">
            Listings
          </Link>
          <Link href="/map" className="text-sm font-medium text-papyrus/80 hover:text-sand-tan border-b-2 border-transparent hover:border-sand-tan transition-colors py-1">
            Map
          </Link>
          <Link href="/ai-search" className="text-sm font-medium text-papyrus/80 hover:text-sand-tan border-b-2 border-transparent hover:border-sand-tan transition-colors py-1">
            AI Search
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {mounted && isAuthenticated ? (
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="text-sm font-medium text-papyrus/80 hover:text-sand-tan transition-colors">
                Dashboard
              </Link>
              <Button variant="outline" onClick={logout}>Logout</Button>
            </div>
          ) : (
            mounted && (
              <div className="flex items-center gap-2">
                <Link href="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link href="/register">
                  <Button>Register</Button>
                </Link>
              </div>
            )
          )}
        </div>
      </div>
    </nav>
  );
};
