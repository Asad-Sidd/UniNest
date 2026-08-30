'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'student' | 'owner'>('student');
  const [phone, setPhone] = useState('');
  
  const { register, loading, error } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await register({ name, email, password, role, phone });
    if (success) {
      router.push('/dashboard');
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-warm-white dark:bg-dark-void transition-colors duration-300">
      <Card className="w-full max-w-md shadow-sm border border-mist/40 dark:border-dark-border rounded-2xl bg-white dark:bg-dark-surface">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-heading font-extrabold text-charcoal dark:text-dark-text tracking-tight">Create an account</CardTitle>
          <CardDescription className="text-charcoal/60 dark:text-dark-muted">
            Join UniNest to find or list properties
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
              <Label htmlFor="role" className="text-mocha dark:text-dark-text font-semibold">I am a...</Label>
              <Select value={role} onValueChange={(value: 'student' | 'owner') => setRole(value)}>
                <SelectTrigger className="border-mist/50 dark:border-dark-border bg-cream dark:bg-dark-void text-charcoal dark:text-dark-text focus:ring-coral/20">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-dark-surface border-mist/50 dark:border-dark-border">
                  <SelectItem value="student" className="hover:bg-coral/5 dark:text-dark-text focus:bg-coral/5 cursor-pointer">Student looking for a place</SelectItem>
                  <SelectItem value="owner" className="hover:bg-coral/5 dark:text-dark-text focus:bg-coral/5 cursor-pointer">Property Owner / Manager</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name" className="text-mocha font-semibold">Full Name</Label>
              <Input 
                id="name" 
                type="text" 
                placeholder="John Doe" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

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
              <Label htmlFor="phone" className="text-mocha font-semibold">Phone Number (Optional)</Label>
              <Input 
                id="phone" 
                type="tel" 
                placeholder="+91 9876543210" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-mocha font-semibold">Password</Label>
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
              {loading ? 'Creating account...' : 'Create account'}
            </Button>
            <div className="text-sm text-center text-charcoal/60">
              Already have an account?{' '}
              <Link href="/login" className="text-coral font-bold hover:underline transition-all">
                Sign in here
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
