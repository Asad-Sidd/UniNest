'use client';

import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, Star, Users, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading font-extrabold text-3xl text-charcoal dark:text-dark-text tracking-tight mb-2">Owner Dashboard</h1>
        <p className="text-charcoal/60 dark:text-dark-muted font-medium">Welcome back, {user?.name}. Here's what's happening today.</p>
      </div>

      {user?.role === 'owner' ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-mist/30 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-col pb-2">
                <h3 className="text-sm font-semibold text-charcoal/60 dark:text-dark-muted uppercase tracking-wider mb-1">Active Tenants</h3>
                <p className="text-3xl font-heading font-extrabold text-charcoal dark:text-dark-text">45</p>
                <p className="text-xs text-sage flex items-center mt-2 font-bold">
                  <TrendingUp className="w-3.5 h-3.5 mr-1" /> +1 from last month
                </p>
              </CardHeader>
            </Card>
            
            <Card className="border-mist/30 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-semibold text-charcoal/60 uppercase tracking-wider">Active Listings</CardTitle>
                <Home className="w-5 h-5 text-mocha/70" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-charcoal">2</div>
                <p className="text-xs text-charcoal/50 mt-2 font-medium">All properties available</p>
              </CardContent>
            </Card>
            
            <Card className="border-mist/30 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-col pb-2">
                <h3 className="text-sm font-semibold text-charcoal/60 dark:text-dark-muted uppercase tracking-wider mb-1">Total Properties</h3>
                <p className="text-3xl font-heading font-extrabold text-charcoal dark:text-dark-text">12</p>
                <p className="text-xs text-sage flex items-center mt-2 font-bold">
                  <TrendingUp className="w-3.5 h-3.5 mr-1" /> +3 this week
                </p>
              </CardHeader>
            </Card>

            <Card className="border-mist/30 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-semibold text-charcoal/60 uppercase tracking-wider">Avg Rating</CardTitle>
                <Star className="w-5 h-5 text-coral fill-coral" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-charcoal">4.8</div>
                <p className="text-xs text-charcoal/50 mt-2 font-medium">Across all properties</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            <Card className="col-span-1 border-mist/30 shadow-sm">
              <CardHeader>
                <h2 className="text-xl font-heading font-bold text-charcoal dark:text-dark-text mb-6">Recent Activity</h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-start gap-4 p-4 border border-mist/30 dark:border-dark-border rounded-xl hover:border-coral/30 dark:hover:border-coral/30 hover:shadow-sm transition-all">
                      <div className="w-12 h-12 rounded-xl bg-coral/10 flex items-center justify-center text-coral border border-coral/20 shadow-sm">
                        <Star className="w-5 h-5 fill-coral/50" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-charcoal dark:text-dark-text text-sm">New Review Received</h4>
                        <p className="text-xs text-charcoal/60 dark:text-dark-muted mt-1">John Doe left a 5-star review for Sunshine Hostel.</p>
                        <span className="text-[10px] font-bold text-charcoal/40 dark:text-dark-muted/60 uppercase tracking-wider mt-2 block">2 hours ago</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-1 border border-mist/50 dark:border-dark-border shadow-sm dark:shadow-none bg-white dark:bg-dark-surface rounded-2xl">
              <CardHeader className="p-6 pb-2">
                <CardTitle className="text-xl font-heading font-bold text-charcoal dark:text-dark-text">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                <Link href="/dashboard/properties/new" className="w-full text-center px-4 py-3 bg-coral text-white rounded-xl hover:bg-coral-soft transition-colors font-bold shadow-sm">
                  Add New Property
                </Link>
                <Link href="/dashboard/properties" className="w-full text-center px-4 py-3 bg-white dark:bg-dark-elevated border border-mist/50 dark:border-dark-border text-charcoal dark:text-dark-text rounded-xl hover:border-coral/40 dark:hover:border-coral/40 hover:shadow-sm dark:hover:shadow-none transition-all font-semibold">
                  Manage Properties
                </Link>
                <Link href="/dashboard/reviews" className="w-full text-center px-4 py-3 bg-white dark:bg-dark-elevated border border-mist/50 dark:border-dark-border text-charcoal dark:text-dark-text rounded-xl hover:border-coral/40 dark:hover:border-coral/40 hover:shadow-sm dark:hover:shadow-none transition-all font-semibold">
                  View Reviews
                </Link>
              </CardContent>
            </Card>
          </div>
        </>
      ) : (
        <div className="bg-white dark:bg-dark-surface p-10 rounded-2xl border border-mist/30 dark:border-dark-border text-center shadow-sm dark:shadow-none max-w-2xl mx-auto mt-10">
          <div className="w-20 h-20 bg-coral/10 dark:bg-coral/20 text-coral rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm dark:shadow-none border border-coral/20 dark:border-coral/30">
            <User className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-heading font-extrabold text-charcoal dark:text-dark-text mb-3 tracking-tight">Student Dashboard</h2>
          <p className="text-charcoal/60 dark:text-dark-muted mb-8 text-lg">Your personalized dashboard is currently being crafted.</p>
          <Link href="/listings" className="inline-block px-8 py-3 bg-coral text-white rounded-xl hover:bg-coral-soft transition-colors font-bold shadow-sm">
            Browse Properties
          </Link>
        </div>
      )}
    </div>
  );
}
