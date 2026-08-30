'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      router.push('/dashboard');
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-warm-white dark:bg-dark-void transition-colors duration-300">
      <Card className="w-full max-w-md shadow-sm border border-mist/40 dark:border-dark-border rounded-2xl bg-white dark:bg-dark-surface">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-heading font-extrabold text-charcoal dark:text-dark-text tracking-tight">Welcome back</CardTitle>
          <CardDescription className="text-charcoal/60 dark:text-dark-muted">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <div className="bg-coral/10 text-coral p-3 rounded-lg text-sm font-semibold border border-coral/20">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-mocha font-semibold">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="name@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-mocha font-semibold">Password</Label>
                <Link href="#" className="text-sm font-semibold text-coral hover:text-coral-soft transition-colors">
                  Forgot password?
                </Link>
              </div>
              <Input 
                id="password" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full h-12 rounded-xl text-base shadow-sm" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign in'}
            </Button>
            <div className="text-sm text-center text-charcoal/60">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="text-coral font-bold hover:underline transition-all">
                Register here
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
